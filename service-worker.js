const CACHE_NAME='shindanshi-booster-v3-20260721';
const CORE=['./','./index.html','./manifest.webmanifest'];
const FIREBASE=[
 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js',
 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js',
 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js'
];

self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE_NAME);
  await cache.addAll(CORE);
  await Promise.allSettled(FIREBASE.map(async url=>{
   const response=await fetch(url,{mode:'cors'});
   if(response.ok)await cache.put(url,response);
  }));
  await self.skipWaiting();
 })());
});

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(name=>name.startsWith('shindanshi-booster-')&&name!==CACHE_NAME).map(name=>caches.delete(name)));
  await self.clients.claim();
 })());
});

self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(request.mode==='navigate'){
  event.respondWith((async()=>{
   try{
    const fresh=await fetch(request);
    const cache=await caches.open(CACHE_NAME);
    await cache.put('./index.html',fresh.clone());
    return fresh;
   }catch(e){
    return (await caches.match(request))||(await caches.match('./index.html'));
   }
  })());
  return;
 }
 if(url.hostname==='www.gstatic.com'&&url.pathname.includes('/firebasejs/')){
  event.respondWith((async()=>{
   const cached=await caches.match(request);
   if(cached)return cached;
   try{
    const fresh=await fetch(request);
    const cache=await caches.open(CACHE_NAME);
    await cache.put(request,fresh.clone());
    return fresh;
   }catch(e){
    return new Response('',{headers:{'Content-Type':'application/javascript'}});
   }
  })());
  return;
 }
 if(url.origin===self.location.origin){
  event.respondWith((async()=>{
   try{
    const fresh=await fetch(request);
    const cache=await caches.open(CACHE_NAME);
    await cache.put(request,fresh.clone());
    return fresh;
   }catch(e){
    return caches.match(request);
   }
  })());
 }
});
