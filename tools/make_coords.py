#!/usr/bin/env python3
import json
from PIL import Image
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TEMPLATE = os.path.join(ROOT, 'template.png')
OUT = os.path.join(ROOT, 'tools', 'template_coords_1080.json')

# Replace these with the clicks you provided
picked = {
    'name_left': (311, 377),
    'name_right': (927, 370),
    'percentage': (545, 1176),
    'tagline': (575, 1459),
}

if not os.path.exists(TEMPLATE):
    raise SystemExit('template.png not found')

img = Image.open(TEMPLATE)
w, h = img.size
scale = 1080.0 / w

out = {}
for k, (x, y) in picked.items():
    out[k] = {'pos': [int(round(x * scale)), int(round(y * scale))], 'font': 60 if 'name' in k else (240 if k=='percentage' else 50)}

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2)

print('Wrote', OUT)
print('Template size:', w, h)
print('Scale factor:', scale)
print(json.dumps(out, indent=2))
