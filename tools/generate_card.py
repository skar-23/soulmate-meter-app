#!/usr/bin/env python3
"""
Generate a shareable love card using a PNG template and Pillow.
Usage:
  python tools/generate_card.py --name1 "Elara" --name2 "Orion" --percentage 97 --output tools/sample_output.png

The script will open `template.png` at the repository root (path: template.png) and write text onto it.
If no TTF fonts are found, it falls back to a default font.
"""
import argparse
import os
from PIL import Image, ImageDraw, ImageFont, ImageStat, ImageFilter

# Config: paths
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TEMPLATE_PATH = os.path.join(ROOT, "template.png")

# Try common Windows fonts locations as fallbacks
COMMON_FONTS = [
    r"C:\\Windows\\Fonts\\segoeui.ttf",
    r"C:\\Windows\\Fonts\\calibri.ttf",
    r"C:\\Windows\\Fonts\\times.ttf",
    r"C:\\Windows\\Fonts\\arial.ttf",
    r"C:\\Windows\\Fonts\\verdana.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]

GOLD = (212, 175, 55)  # approximate gold color
WHITE = (255, 255, 255) # White fill for initials and tagline
SHADOW = (15, 15, 15)

# reference design width used for scaling coords/font sizes
CARD_WIDTH = 1080


def find_font(preferred_size, font_path=None):
    """Return (font, font_path_used_str). If font_path provided, try it first."""
    # font_path may be a single path or list of candidate paths
    candidates = []
    if font_path:
        if isinstance(font_path, (list, tuple)):
            candidates.extend(font_path)
        else:
            candidates.append(font_path)

    # local project fonts (Cinzel preferred)
    candidates.append(os.path.join(os.path.dirname(__file__), 'fonts', 'Cinzel-Bold.ttf'))
    # Adding a simpler font path for better fallback reliability if Cinzel isn't there
    candidates.append(os.path.join(os.path.dirname(__file__), 'fonts', 'arial.ttf'))

    # system fallbacks
    candidates.extend(COMMON_FONTS)

    for p in candidates:
        try:
            if p and os.path.exists(p):
                return ImageFont.truetype(p, preferred_size), p
        except Exception:
            continue

    # fallback to PIL default bitmap font
    try:
        return ImageFont.load_default(), "<pil-default>"
    except Exception:
        return None, None


def draw_centered(draw, text, font, x, y, fill, anchor="mm", stroke_width=0, stroke_fill=None):
    # anchor mm centers both
    try:
        if stroke_width and stroke_fill:
            draw.text((x, y), text, font=font, fill=fill, anchor=anchor, stroke_width=stroke_width, stroke_fill=stroke_fill)
        else:
            draw.text((x, y), text, font=font, fill=fill, anchor=anchor)
    except TypeError:
        # older Pillow or bitmap font fallback: ignore anchor and stroke
        # Using textbbox for accuracy when available
        try:
            bbox = draw.textbbox((0, 0), text, font=font)
            w = bbox[2] - bbox[0]
            h = bbox[3] - bbox[1]
        except Exception:
            w, h = draw.textsize(text, font=font)
        draw.text((x - w / 2, y - h / 2), text, font=font, fill=fill)


def generate_card(name1, name2, percentage, output_path, template_path=TEMPLATE_PATH, font_path=None, coords_json_path=None, erase=False):
    if not os.path.exists(template_path):
        raise FileNotFoundError(f"Template not found at {template_path}")

    img = Image.open(template_path).convert("RGBA")
    w, h = img.size
    draw = ImageDraw.Draw(img)

    # --- Coordinates and base font sizes based on 1080x1080 template (user-provided)
    CARD_WIDTH = 1080
    # Default coordinates (if no coords JSON supplied)
    COORDS = {
        'name_left': {'pos': (420, 250), 'font': 60, 'color': GOLD},
        'name_right': {'pos': (660, 250), 'font': 60, 'color': GOLD},
        'percentage': {'pos': (540, 750), 'font': 240, 'color': GOLD},
        'tagline': {'pos': (540, 870), 'font': 50, 'color': WHITE},
    }

    # compute uniform scale to adapt coordinates/font sizes to current template
    scale = w / float(CARD_WIDTH)

    def scaled_pos(name):
        x, y = COORDS[name]['pos']
        return (int(x * scale), int(y * scale))

    def scaled_font_size(name):
        return max(8, int(COORDS[name]['font'] * scale))

    # Prefer Cinzel if available in tools/fonts or system; fallback to provided font_path
    preferred_font_paths = []
    # user-supplied font path has priority
    if font_path:
        preferred_font_paths.append(font_path)
    # local fonts folder
    preferred_font_paths.append(os.path.join(os.path.dirname(__file__), 'fonts', 'Cinzel-Bold.ttf'))
    # Adding a simpler font path for better fallback reliability if Cinzel isn't there
    preferred_font_paths.append(os.path.join(os.path.dirname(__file__), 'fonts', 'arial.ttf'))


    # load fonts per-element
    font_name_left, fp_name_left = find_font(scaled_font_size('name_left'), font_path or preferred_font_paths[1])
    font_name_right, fp_name_right = find_font(scaled_font_size('name_right'), font_path or preferred_font_paths[1])
    font_percent, fp_percent = find_font(scaled_font_size('percentage'), font_path or preferred_font_paths[1])
    font_tag, fp_tag = find_font(scaled_font_size('tagline'), font_path or preferred_font_paths[1])

    # If a coords JSON path is provided, load it; otherwise look for tools/template_coords.json
    coords_to_load = coords_json_path or os.path.join(os.path.dirname(__file__), 'template_coords.json')
    if coords_to_load and os.path.exists(coords_to_load):
        try:
            import json
            with open(coords_to_load, 'r', encoding='utf-8') as f:
                j = json.load(f)
            # replace positions and font sizes for known keys
            for k in ('name_left','name_right','percentage','tagline'):
                if k in j:
                    COORDS[k]['pos'] = tuple(j[k]['pos'])
                    if 'font' in j[k]:
                        COORDS[k]['font'] = j[k]['font']
        except Exception:
            pass

    print(f"Fonts used: name_left={fp_name_left}, name_right={fp_name_right}, percent={fp_percent}, tag={fp_tag}")

    center_x = w // 2

    # --- TEXT DRAWING ---

    # Top title removed to preserve the template's existing artwork

    # 1. Names — draw left and right separately (template already has '&')
    nlx, nly = scaled_pos('name_left')
    nrx, nry = scaled_pos('name_right')
    draw_centered(draw, name1, font_name_left, nlx, nly, fill=COORDS['name_left']['color'], stroke_width=2, stroke_fill=SHADOW)
    draw_centered(draw, name2, font_name_right, nrx, nry, fill=COORDS['name_right']['color'], stroke_width=2, stroke_fill=SHADOW)

    # 3. Percentage big — only the numeric part; template already contains the % glyph
    percent_text = f"{int(percentage)}"
    px, py = scaled_pos('percentage')
    draw_centered(draw, percent_text, font_percent, px, py, fill=COORDS['percentage']['color'], stroke_width=8, stroke_fill=SHADOW)

    # 4. Tagline
    int_percentage = int(percentage)
    if int_percentage >= 90:
        subtitle_text = "A Celestial Connection! Soulmates."
    else:
        subtitle_text = "A Celestial Connection!" 
        # Add more logic here for other scores (e.g., 70-89: "Strong Cosmic Harmony")

    tx, ty = scaled_pos('tagline')
    draw_centered(draw, subtitle_text, font_tag, tx, ty, fill=COORDS['tagline']['color'], stroke_width=2, stroke_fill=SHADOW)

    # Optional: "Share Your Magic!" - Bottom
    # no button handling for this template

    # Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    # Save as PNG if extension implies it, otherwise JPG/PNG both okay
    out_ext = os.path.splitext(output_path)[1].lower()
    if out_ext in (".png", ".webp"):
        img.save(output_path)
    else:
        # PNG template converted to RGB for JPG compression
        img.convert("RGB").save(output_path, quality=95)
    print(f"Saved generated card to {output_path}")


def erase_regions(img, draw, coords, scale_fn, radius_ratio=0.08):
    """Erase template text in the regions specified by coords dict.

    Approach: for each coord entry, compute a box centered at pos with size based on font size scaled,
    sample the area just above the box to guess background color, then draw a rounded rectangle filled with that color.
    """
    w, h = img.size
    # Create a blurred copy to sample background if needed
    try:
        from PIL import ImageFilter
        blur = img.filter(ImageFilter.GaussianBlur(6))
    except Exception:
        blur = img

    for k in ('name_left','name_right','percentage','tagline'):
        entry = coords.get(k)
        if not entry:
            continue
        cx, cy = entry['pos']
        # compute scaled font height
        base_font = entry.get('font', 50)
        scaled_font_size = int(base_font * (w / CARD_WIDTH))
        box_w = int(scaled_font_size * 6)
        box_h = int(scaled_font_size * 1.6)

        left = int(cx - box_w/2)
        top = int(cy - box_h/2)
        right = int(cx + box_w/2)
        bottom = int(cy + box_h/2)

        # clamp
        left = max(0, left); top = max(0, top); right = min(w, right); bottom = min(h, bottom)

        # sample background color from a pixel just above the box, fallback to average of blur crop
        sample_y = max(0, top - 3)
        try:
            bg_color = img.getpixel((max(0, left+2), sample_y))
        except Exception:
            # average from blur crop
            crop = blur.crop((left, top, right, bottom))
            # getaverage
            stat = ImageStat.Stat(crop)
            bg_color = tuple(int(c) for c in stat.mean[:3])

        # draw filled rounded rectangle
        rr = int(min(box_w, box_h) * radius_ratio)
        try:
            # Pillow 8.2+ supports rounded_rectangle on ImageDraw
            draw.rounded_rectangle((left, top, right, bottom), radius=rr, fill=bg_color)
        except Exception:
            # fallback to normal rectangle
            draw.rectangle((left, top, right, bottom), fill=bg_color)






if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--name1", required=True)
    parser.add_argument("--name2", required=True)
    parser.add_argument("--percentage", required=True)
    parser.add_argument("--output", default="tools/generated_card.jpg")
    parser.add_argument("--template", default=TEMPLATE_PATH)
    parser.add_argument("--font", dest="font", default=None, help="Path to a .ttf font to use")
    parser.add_argument("--coords", dest="coords", default=None, help="Path to a coordinates JSON file (optional)")
    parser.add_argument("--erase", dest="erase", action="store_true", help="Erase template text regions before drawing")
    parser.add_argument("--debug", dest="debug", action="store_true", help="Add a small debug watermark to the output")
    args = parser.parse_args()

    generate_card(args.name1, args.name2, args.percentage, args.output, args.template, font_path=args.font, coords_json_path=args.coords, erase=args.erase)

    # If debug flag was passed, draw watermark onto the output file to make change obvious
    if args.debug:
        from datetime import datetime
        try:
            # Need to reload the image to draw on the final saved output
            im = Image.open(args.output).convert('RGBA') 
            draw = ImageDraw.Draw(im)
            ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            # Use a smaller font for the watermark
            fn_font, _ = find_font(18, args.font) 
            draw.text((10, 10), f'GEN {ts}', font=fn_font, fill=(255,0,0,255))
            
            # Save again with the watermark (as the same format)
            out_ext = os.path.splitext(args.output)[1].lower()
            if out_ext in (".png", ".webp"):
                im.save(args.output)
            else:
                im.convert("RGB").save(args.output, quality=95)
                
            print(f'Wrote debug watermark to {args.output}')
        except Exception as e:
            print('Failed to write debug watermark:', e)
