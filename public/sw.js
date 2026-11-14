const CACHE='greenhand-v3';
const BASE=self.registration.scope;
const FILES=['./','./index.html','./styles.css','./app.js','./manifest.json','./icon.svg','./vendor/supabase.js','./data/food-catalog.json','./data/association-rules.json','./data/nutrition-intake-reference.json'].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES);await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('greenhand-')&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));return response}).catch(async()=>await caches.match(event.request)||await caches.match(new URL('./index.html',BASE).href)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));return response})));
});
