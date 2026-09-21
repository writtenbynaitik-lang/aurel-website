(() => {
'use strict';
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const mediaQuery=matchMedia('(prefers-reduced-motion: reduce)');
let savedMotion=null;
try { savedMotion=localStorage.getItem('aurel-motion'); } catch {}
let motion=savedMotion===null?!mediaQuery.matches:savedMotion==='on';
let context=null, rotationTrigger=null, activeDish=0, plateScene=null;
const dishes=[
 {name:'Ember squash',heading:'EMBER<br><em>SQUASH</em>',file:'squash',description:'Brown butter. Toasted seeds. Crisp sage.',detail:'A charred crescent of squash, brown butter cream, pumpkin seeds and sage. An imagined balance of soft flesh and crisp edges.',ingredients:'Squash, butter, cream, pumpkin seeds, sage.',color:'#d9d0bd',accent:'#b4ae89'},
 {name:'Wild maitake',heading:'WILD<br><em>MAITAKE</em>',file:'maitake',description:'Roasted mushrooms. Herb oil. Savoury jus.',detail:'Maitake mushrooms, roasted until their ruffled edges turn crisp. Finished with herb oil and an imagined vegetable jus.',ingredients:'Maitake mushrooms, herbs, olive oil, vegetable jus.',color:'#d8d8c6',accent:'#a7ae90'},
 {name:'Golden raviolo',heading:'GOLDEN<br><em>RAVIOLO</em>',file:'raviolo',description:'Silky pasta. Rich yolk. Sage butter.',detail:'A single generous raviolo imagined with a rich yolk centre, sage and a glossy brown butter sauce.',ingredients:'Wheat pasta, egg yolk, butter, sage.',color:'#e4d1b4',accent:'#cbad78'},
 {name:'Slow-poached pear',heading:'POACHED<br><em>PEAR</em>',file:'pear',description:'Tender pear. Vanilla cream. Caramel.',detail:'A softly poached pear with vanilla cream and a little caramel. A restrained finish to the imagined evening.',ingredients:'Pear, vanilla, cream, sugar, butter.',color:'#e3d0c7',accent:'#c7a99b'}
];
const gallery=[
 ['interior-1600','The imagined dining room — warm stone, walnut and linen.'],
 ['squash-1200','Ember squash — brown butter, seeds and sage.'],
 ['chef-1600','A quiet moment of finishing in the imagined kitchen.'],
 ['maitake-1200','Wild maitake — crisp edges and earthy depth.'],
 ['ingredients-1600','The beginning — squash, sage and seeds.'],
 ['raviolo-1200','Golden raviolo — one generous parcel.'],
 ['pear-1200','Slow-poached pear — a comforting finish.'],
 ['exterior-1000','An imagined entrance, just as the evening begins.']
];
let galleryIndex=0;
const info=$('#info-dialog'),galleryDialog=$('#gallery-dialog');
const nav=$('#mobile-nav'),menuToggle=$('.menu-toggle');
function closeNav(){nav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');menuToggle.textContent='☰';}
menuToggle.addEventListener('click',()=>{const open=nav.hidden;nav.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.textContent=open?'×':'☰';});
$$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeNav();});
function showDialog(title,content,eyebrow='AUREL · THE CONCEPT'){
 closeNav();$('#dialog-title').innerHTML=title;$('#dialog-content').innerHTML=content;$('#dialog-eyebrow').textContent=eyebrow;info.showModal();document.body.classList.add('modal-open');
}
function reserve(){showDialog('A table in<br><em>our imagination.</em>','<p>AUREL is a fictional portfolio concept. It is not an operating restaurant, and no reservations or payments are accepted here.</p><p>Explore the imagined dishes, rooms and atmosphere. A real restaurant would connect this invitation to its verified booking service.</p>');}
$$('[data-reserve]').forEach(b=>b.addEventListener('click',reserve));
$$('dialog').forEach(d=>{
 $('.dialog-close',d).addEventListener('click',()=>d.close());
 d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
 d.addEventListener('close',()=>document.body.classList.remove('modal-open'));
});
$('.dialog-done').addEventListener('click',()=>info.close());
$$('[data-about]').forEach(b=>b.addEventListener('click',()=>showDialog('An original idea.<br><em>An imagined place.</em>','<p>AUREL explores an open-fire restaurant concept through original art direction, illustrative dishes and AI-generated imagery.</p><p>Pune is the inspiration, not a business address. The name, rooms and menu describe this fictional project only. No real restaurant, chef, award or guest endorsement is represented.</p>')));
$$('[data-policy]').forEach(b=>b.addEventListener('click',()=>{
 if(b.dataset.policy==='privacy')showDialog('A small note<br><em>on privacy.</em>','<p>This website has no contact, payment or reservation form. It does not ask you to submit personal information.</p><p>Your motion preference is saved in this browser only. This site adds no advertising or analytics scripts. The hosting platform may separately process access and technical information.</p>','PRIVACY');
 else showDialog('Made to<br><em>be explored.</em>','<p>AUREL is a fictional design portfolio. Its menu, imagery and spaces are illustrative. Nothing on this website is an offer to provide meals, reservations or other restaurant services.</p><p>Concept ingredients are not an allergen statement. No prices, opening hours, physical address or business endorsements are implied.</p>','TERMS OF THIS CONCEPT');
}));
$$('[data-menu-dish]').forEach(b=>b.addEventListener('click',()=>{const d=dishes[+b.dataset.menuDish];showDialog(d.name,`<img src="assets/${d.file}-640.webp" width="640" height="640" alt="${d.name}"><p>${d.detail}</p><p><strong>Concept ingredients</strong><br>${d.ingredients}</p><p class="detail">Illustrative dish only. Not available to order. Ingredients are a creative recipe idea, not a verified allergen or dietary statement.</p>`,'THE IMAGINED MENU');}));
function updateGallery(){const item=gallery[galleryIndex];$('#gallery-image').src=`assets/${item[0]}.webp`;$('#gallery-image').alt=item[1];$('#gallery-caption').textContent=item[1]+' AI-generated concept imagery.';$('#gallery-count').textContent=`${String(galleryIndex+1).padStart(2,'0')} / 08`;}
function nextGallery(dir){galleryIndex=(galleryIndex+dir+gallery.length)%gallery.length;updateGallery();}
$$('[data-gallery]').forEach(b=>b.addEventListener('click',()=>{closeNav();updateGallery();galleryDialog.showModal();document.body.classList.add('modal-open');}));
$('#gallery-next').addEventListener('click',()=>nextGallery(1));$('#gallery-prev').addEventListener('click',()=>nextGallery(-1));
galleryDialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();nextGallery(1);}if(e.key==='ArrowLeft'){e.preventDefault();nextGallery(-1);}});
$$('.experience-option').forEach((b,i)=>b.addEventListener('click',()=>{
 $$('.experience-option').forEach(x=>{const yes=x===b;x.classList.toggle('active',yes);x.setAttribute('aria-expanded',String(yes));$('b',x).textContent=yes?'−':'＋';});
 const img=$('#experience-image');img.style.objectPosition=['25% 50%','70% 50%','50% 70%'][i];img.style.transform=motion?['scale(1)','scale(1.12)','scale(1.2)'][i]:'none';
 img.alt=['Warm, intimate tables in the imagined Aurel dining room','A closer view of the shared tables in the imagined dining room','Soft lights and table settings in the imagined dining room'][i];
}));
// The cutaway is always local to the lens. The original composition remains visible outside it.
const peek=$('#peek-visual'),peekToggle=$('.peek-toggle');let px=54,py=59,dragging=false;
function setPeek(open){peek.classList.toggle('active',open);peekToggle.setAttribute('aria-expanded',String(open));$('.peek-toggle span').textContent=open?'−':'＋';}
function positionPeek(x,y){px=Math.max(9,Math.min(91,x));py=Math.max(9,Math.min(91,y));peek.style.setProperty('--peek-x',px+'%');peek.style.setProperty('--peek-y',py+'%');}
function pointerPeek(e){const r=peek.getBoundingClientRect();positionPeek((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100);}
peekToggle.addEventListener('click',()=>{const opening=!peek.classList.contains('active');setPeek(opening);if(opening){positionPeek(54,59);peek.focus({preventScroll:true});}});
peek.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){setPeek(true);pointerPeek(e);}});
peek.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||dragging){setPeek(true);pointerPeek(e);}});
peek.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&!dragging)setPeek(false);});
peek.addEventListener('pointerdown',e=>{if(peek.classList.contains('active')||e.pointerType==='mouse'){dragging=true;peek.setPointerCapture(e.pointerId);pointerPeek(e);}});
peek.addEventListener('pointerup',()=>{dragging=false;});peek.addEventListener('pointercancel',()=>{dragging=false;setPeek(false);});
peek.addEventListener('keydown',e=>{const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];if(keys.includes(e.key)){e.preventDefault();setPeek(true);positionPeek(px+(e.key==='ArrowRight'?4:e.key==='ArrowLeft'?-4:0),py+(e.key==='ArrowDown'?4:e.key==='ArrowUp'?-4:0));}if(e.key==='Escape'){setPeek(false);peekToggle.focus({preventScroll:true});}});
function selectDish(i){
 if(i<0||i>3)return;activeDish=i;const d=dishes[i];$('#rotation-name').innerHTML=d.heading;$('#dish-counter').textContent=`0${i+1} / 04`;$('#rotation-description').textContent=d.description;
 const fallback=$('#rotation-fallback');fallback.src=`assets/${d.file}-1200.webp`;fallback.alt=d.name+', an illustrative signature dish';
 $('.rotation-stage').style.background=d.color;$('.rotation-backdrop').style.background=d.accent;
 $$('.dish-dots button').forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));
 plateScene?.setDish(d.file);
}
$$('[data-dish]').forEach(b=>b.addEventListener('click',()=>{
 const i=+b.dataset.dish;
 if(motion&&rotationTrigger){const pos=rotationTrigger.start+(rotationTrigger.end-rotationTrigger.start)*((i+.12)/4);window.scrollTo({top:pos,behavior:'smooth'});}else selectDish(i);
}));
function onScroll(){const y=window.scrollY;$('#header').classList.toggle('scrolled',y>100);$('.mobile-reserve').classList.toggle('visible',y>500&&!document.body.classList.contains('modal-open'));}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
function configureMotion(){
 if(context){context.revert();context=null;}rotationTrigger=null;
 document.documentElement.classList.toggle('no-motion',!motion);$('#motion-toggle').textContent=motion?'Motion on':'Motion off';$('#motion-toggle').setAttribute('aria-pressed',String(motion));
 plateScene?.setMotion(motion);
 if(!motion||!window.gsap||!window.ScrollTrigger)return;
 gsap.registerPlugin(ScrollTrigger);
 context=gsap.context(()=>{
 const mm=gsap.matchMedia();
 mm.add('(min-width: 801px)',()=>{
 const hero=gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'+=150%',pin:true,scrub:1,anticipatePin:1}});
 hero.to('.hero-copy',{y:-95,opacity:0,duration:.55},0).to('.hero-art',{xPercent:12,yPercent:8,rotation:18,scale:.86,duration:1},0).to('.hero-bottom',{opacity:0,duration:.2},0).to('.hero-second',{opacity:1,y:-30,duration:.4},.55);
 gsap.fromTo('.film-window',{width:'55%'},{width:'100%',ease:'none',scrollTrigger:{trigger:'.craft',start:'top 20%',end:'bottom 65%',scrub:1}});
 gsap.to('.craft h2',{y:-35,scrollTrigger:{trigger:'.craft',start:'top bottom',end:'bottom top',scrub:1}});
 gsap.to('.philosophy img',{y:-30,scale:1.08,scrollTrigger:{trigger:'.philosophy',start:'top bottom',end:'bottom top',scrub:1}});
 rotationTrigger=ScrollTrigger.create({trigger:'#rotation',start:'top top',end:'+=230%',pin:'.rotation-stage',scrub:true,anticipatePin:1,onUpdate:self=>{const next=Math.min(3,Math.floor(self.progress*4));if(next!==activeDish)selectDish(next);plateScene?.setProgress(self.progress);}});
 return ()=>{rotationTrigger=null;};
 });
 $$('.story>h2,.menu-intro,.experience>h2').forEach(el=>gsap.from(el,{y:28,opacity:.4,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
 });
 ScrollTrigger.refresh();
}
$('#motion-toggle').addEventListener('click',()=>{motion=!motion;try{localStorage.setItem('aurel-motion',motion?'on':'off');}catch{}configureMotion();});
mediaQuery.addEventListener('change',e=>{try{if(localStorage.getItem('aurel-motion')!==null)return;}catch{}motion=!e.matches;configureMotion();});
configureMotion();
window.addEventListener('load',()=>window.ScrollTrigger?.refresh());
// Load WebGL only as the signature display approaches; still images always work independently.
let sceneStarted=false;
const sceneObserver=new IntersectionObserver(entries=>{
 if(entries.some(e=>e.isIntersecting)&&!sceneStarted){sceneStarted=true;sceneObserver.disconnect();
 if(navigator.connection?.saveData)return;
 import('./plate-scene.js').then(m=>m.createPlateScene($('#plate-canvas'),motion)).then(scene=>{plateScene=scene;if(scene){scene.setDish(dishes[activeDish].file);scene.setProgress(rotationTrigger?.progress||0);}}).catch(()=>{});
 }
},{rootMargin:'450px'});sceneObserver.observe($('#rotation'));
$('#year').textContent=new Date().getFullYear();
})();
