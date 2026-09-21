import * as THREE from './vendor/three.module.js';
// A tactile ceramic object with a photographic food surface. This is deliberately a shallow composition.
export async function createPlateScene(container,motion=true){
 let renderer;
 try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:window.innerWidth>800,powerPreference:'low-power'});}catch{return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,window.innerWidth<800?1.25:1.6));
 renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 container.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);
 camera.position.set(0,7.5,2.5);camera.lookAt(0,0,0);
 scene.add(new THREE.HemisphereLight(0xfff8e9,0x8b7760,3));
 const key=new THREE.DirectionalLight(0xfff1d7,2.2);key.position.set(-3,6,5);scene.add(key);
 const fill=new THREE.DirectionalLight(0xffffff,.75);fill.position.set(4,4,-2);scene.add(fill);
 const group=new THREE.Group();scene.add(group);
 const profile=[[0,-.07],[1.04,-.07],[1.15,-.12],[1.3,-.1],[1.51,.015],[1.58,.065],[1.59,.11],[1.55,.14],[1.45,.12],[1.2,.01],[0,0]].map(p=>new THREE.Vector2(...p));
 const ceramic=new THREE.Mesh(new THREE.LatheGeometry(profile,96),new THREE.MeshStandardMaterial({color:0xe0d5bc,roughness:.83,metalness:0}));group.add(ceramic);
 const textureLoader=new THREE.TextureLoader();const cache=new Map();let wanted='squash',visible=false,dirty=true,progress=0,frame=0,destroyed=false;
 const photo=new THREE.Mesh(new THREE.PlaneGeometry(3.75,3.75),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,side:THREE.FrontSide,alphaTest:.015,toneMapped:false}));
 photo.rotation.x=-Math.PI/2;photo.position.y=.17;group.add(photo);
 function render(){if(destroyed||!visible||document.hidden)return;group.rotation.y=motion?-.25+progress*.7:-.25;group.rotation.z=motion?Math.sin(progress*Math.PI*2)*.025:0;renderer.render(scene,camera);dirty=false;}
 function schedule(){dirty=true;cancelAnimationFrame(frame);frame=requestAnimationFrame(render);}
 function resize(){const r=container.getBoundingClientRect();if(r.width<1||r.height<1)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();schedule();}
 async function setDish(name){wanted=name;let texture=cache.get(name);if(!texture){try{texture=await textureLoader.loadAsync(`assets/${name}-1200.webp`);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());cache.set(name,texture);}catch{return;}}if(wanted!==name||destroyed)return;photo.material.map=texture;photo.material.needsUpdate=true;container.parentElement.classList.add('webgl-ready');schedule();}
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else cancelAnimationFrame(frame);},{threshold:.02});observer.observe(container);
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
 const onVisibility=()=>{if(!document.hidden&&visible&&dirty)schedule();else cancelAnimationFrame(frame);};document.addEventListener('visibilitychange',onVisibility);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();container.parentElement.classList.remove('webgl-ready');destroyed=true;cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();});
 resize();await setDish('squash');
 return {setDish,setProgress(p){progress=p;schedule();},setMotion(value){motion=value;schedule();}};
}
