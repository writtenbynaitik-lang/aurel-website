from pathlib import Path
from html.parser import HTMLParser
import re,json,gzip
base=Path(__file__).parent/'dist'
class Check(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.assets=[];self.links=[];self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag in ('script','img') and a.get('src'):self.assets.append(a['src'])
  if tag=='link' and a.get('rel') in ('stylesheet','preload'):self.assets.append(a['href'])
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='img':self.images.append(a)
  if a.get('srcset'):self.assets.extend(x.strip().split()[0] for x in a['srcset'].split(','))
p=Check();p.feed((base/'index.html').read_text())
assert len(p.ids)==len(set(p.ids)),'Duplicate IDs'
for src in p.assets:
 if src.startswith(('data:','https:')):continue
 assert (base/src.split('?')[0]).is_file(),f'Missing asset: {src}'
for href in p.links:
 assert href,'Empty link'
 if href.startswith('#') and len(href)>1:assert href[1:] in p.ids,f'Broken anchor: {href}'
for img in p.images:assert 'alt' in img and 'width' in img and 'height' in img,'Missing image accessibility or dimensions'
for url in re.findall(r"url\(['\"]?([^)'\"]+)",(base/'styles.css').read_text()):assert (base/url).is_file(),url
for name in ['squash','maitake','raviolo','pear']:
 for width in [640,1200]:assert (base/f'assets/{name}-{width}.webp').is_file()
assert (base/'assets/cutaway-1200.webp').is_file()
meta=json.loads((base.parent/'.openai/hosting.json').read_text());assert meta['project_id']=='appgprj_6ab0e98f741c8191b0164bd47e581121'
def luminance(s):
 rgb=[int(s[i:i+2],16)/255 for i in (0,2,4)];return sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*c for v,c in zip(rgb,[.2126,.7152,.0722]))
def contrast(a,b):
 x,y=sorted([luminance(a),luminance(b)]);return round((y+.05)/(x+.05),2)
print(json.dumps({'html_references_checked':len(p.assets),'internal_links_checked':len(p.links),'images_checked':len(p.images),'total_site_bytes':sum(x.stat().st_size for x in base.rglob('*') if x.is_file()),'initial_js_gzip_bytes':sum(len(gzip.compress((base/x).read_bytes())) for x in ['app.js','vendor/gsap.min.js','vendor/ScrollTrigger.min.js']),'contrast':{'body_on_paper':contrast('292721','eee9de'),'muted_on_paper':contrast('665e53','eee9de'),'button':contrast('eee9de','70272b')}},indent=2))
