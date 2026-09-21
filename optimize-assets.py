from PIL import Image
from pathlib import Path
source=Path(__file__).parent/'artwork'
out=Path(__file__).parent/'dist/assets'
assets={'01-signature-squash.png':('squash',[640,1200]),'02-maitake.png':('maitake',[640,1200]),'03-raviolo.png':('raviolo',[640,1200]),'04-pear.png':('pear',[640,1200]),'05-interior.png':('interior',[800,1600]),'06-chef.png':('chef',[800,1600]),'07-ingredients.png':('ingredients',[800,1600]),'08-exterior.png':('exterior',[1000]),'09-squash-cutaway.png':('cutaway',[1200])}
for file,(name,sizes) in assets.items():
 if not (source/file).exists(): continue
 im=Image.open(source/file)
 for size in sizes:
  d=out/f'{name}-{size}.webp'
  if d.exists() and d.stat().st_mtime > (source/file).stat().st_mtime: continue
  resized=im.resize((size,round(im.height*size/im.width)),Image.Resampling.LANCZOS)
  resized.save(d,'WEBP',quality=84,method=6)
  print(d.name, d.stat().st_size)
