if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/PSi_u3KgUJ7sDAMJRyaTI/_buildManifest.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/PSi_u3KgUJ7sDAMJRyaTI/_ssgManifest.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/main-811b9cbded0c74bb4bd4.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/pages/_app-c7ae6e788f5ffc992924.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/pages/_error-94ed2348718d59e1af9b.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/pages/decks-bc0c89f75dcb72b266f6.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/pages/home-ccbe5d795c724e238d00.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/pages/index-ca4c47f23010a73ffdcd.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/pages/play-0349dad16bac28162c9a.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/pages/players-a42ad0ea0a329a83f65b.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/chunks/webpack-61095c13c5984b221292.js",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/_next/static/css/99b368bbe99e1e929736.css",revision:"PSi_u3KgUJ7sDAMJRyaTI"},{url:"/css/style.css",revision:"91f6da53bc6df990847681f2826d472d"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/icon-192x192.png",revision:"ac45a209bfb7a8e9d98ee804bb6fc5fb"},{url:"/icon-256x256.png",revision:"4e64120703681e5c5c7a481785e32c4e"},{url:"/icon-384x384.png",revision:"7352f2c1f5cba14806f0b7d568e4bf1b"},{url:"/icon-512x512.png",revision:"513f3010b86dd25e8dcad780c5c4895f"},{url:"/manifest.json",revision:"3ba551d92d4738ceb6d1e342b30a1ab9"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));