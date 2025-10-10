#!/usr/bin/env python3
"""
Interactive coordinate picker for the template.
Click the following points in order when the window appears:
    1) Name LEFT (left name position, to the left of the &)
    2) Name RIGHT (right name position, to the right of the &)
    3) Percentage NUMBER position (the numeric part; template already has the % glyph)
    4) Tagline center

The script saves coordinates and recommended font sizes to `tools/template_coords.json`.
"""
import json
import os
from PIL import Image
import matplotlib.pyplot as plt

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TEMPLATE = os.path.join(ROOT, 'template.png')
OUT = os.path.join(ROOT, 'tools', 'template_coords.json')

if not os.path.exists(TEMPLATE):
    print('Template not found at', TEMPLATE)
    raise SystemExit(1)

img = Image.open(TEMPLATE)
fig, ax = plt.subplots(figsize=(6,6))
ax.imshow(img)
ax.set_title('Click: Name LEFT, Name RIGHT, Percentage number, Tagline (4 clicks)')
pts = []

def onclick(event):
    if event.xdata is None:
        return
    x, y = int(event.xdata), int(event.ydata)
    pts.append((x,y))
    ax.plot(x, y, 'ro')
    fig.canvas.draw()
    print('Clicked:', x, y)
    if len(pts) >= 4:
        print('Got 5 points, closing...')
        plt.close(fig)

cid = fig.canvas.mpl_connect('button_press_event', onclick)
plt.show()

if len(pts) < 4:
    print('Less than 4 points clicked; aborting.')
    raise SystemExit(1)

data = {
    'name_left': {'pos': pts[0], 'font': 60},
    'name_right': {'pos': pts[1], 'font': 60},
    'percentage': {'pos': pts[2], 'font': 240},
    'tagline': {'pos': pts[3], 'font': 50}
}

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print('Saved coordinates to', OUT)
