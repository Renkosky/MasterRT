"use strict";var precacheConfig=[["/static/assets/a.txt","68eca98266f51c178f530630d3bdf64e"],["/static/assets/b.txt","6319864ff51d838bef2edd7eb0402d89"],["/static/assets/baidu.xlsx","a02d16842f07ee141b2f532a6a54dfc1"],["/static/assets/bbs.svg","63b726beb926acea91fb5fdf26a40b2b"],["/static/assets/bht.pdf","4d53a572f72fb5c588eeea9c49e27877"],["/static/assets/line.json","4b3b0f770f785496d17bfae2882ab43f"],["/static/assets/olay.csv","164d687ba20dfab6a3ab1eee5653bf09"],["/static/assets/pie.json","984fda7d5e6f0ceb1cacf2b5007cac1a"],["/static/assets/wangdan.docx","dd64fa944a7ef8b6d6e3cbc080f6a6b1"],["/static/assets/林政.jpg","e8729328ee7881e9171a13373d5f1858"],["/static/common-umi.6e3645f0.async.js","d65007ce1a3b94d2278127309c4d4498"],["/static/src__pages__index__components__Count.6c298a9c.async.js","ce892b59f123aa2e5f7c722a70efb44b"],["/static/src__pages__index__index.c2915ffa.async.js","4eaa8991ad5b1913ae90a2f3b7091f52"],["/static/src__pages__index__models__count.ts.2d3496c2.async.js","5dcdcffd22898f1b4ab63ab746b390bb"],["/static/src__pages__masterrt__mr-If.283766f9.async.js","aec4b6cbb9de7e388611c864328deb8e"],["/static/src__pages__masterrt__mr-echarts-panel.b663043b.async.js","6b174f2971fcca66b464e82d6f7f7061"],["/static/src__pages__masterrt__mr-echarts.31932d54.async.js","cb12e7fed85a1ba4e9070b1c834bc8c2"],["/static/src__pages__masterrt__mr-fill.499d34d9.async.js","ac5aec3955fdc8547609809a8e12d015"],["/static/src__pages__masterrt__mr-icon.24d6d418.async.js","1ec3c0b071fb16f9dd5b61928d00acff"],["/static/src__pages__masterrt__mr-panel.eceecd78.async.js","994a5cb30c50c0ee349d6a83d4478fe5"],["/static/src__pages__masterrt__mr-req.0bb29917.async.js","01c492ac48470bd1b3d1c8d187fbcf33"],["/static/src__pages__masterrt__mr-request.344a370a.async.js","f17a8ffcc064fbfbca25cb1010077ffe"],["/static/src__pages__masterrt__mr-resource.1ef1e8c5.async.js","af994cd17490427b60e5f4e50e2b210a"],["/static/src__pages__masterrt__mr-rules.cc20d3af.async.js","e6de86fc5df1b2ec5ab32af6e25c13b9"],["/static/src__pages__masterrt__mr-services.32d0e58d.async.js","58bf29959d5d90ff52f68273c2938a12"],["/static/umi.2fddb2f2.css","2fddb2f2d941c735a7fa5b66fffeab4d"],["/static/umi.a4680c2c.js","c51a60bc3f456ae07072694999546061"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,s){var c=new URL(e);return s&&c.pathname.match(s)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],s=new URL(t,self.location),c=createCacheKey(s,hashParamName,a,!1);return[s.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var s=new Request(a,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});