import{a as L,S as O,i}from"./assets/vendor-CMPCLshm.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();L.defaults.baseURL="https://pixabay.com/api/";let y=1;async function w(a,t={}){const r={key:"49149625-6c85390ad8fbd016bc28c7d7b",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:y,...t};try{const o=await L.get("",{params:r});return y+=1,o.data}catch(o){throw console.error("Error fetching data from Pixabay API:",o),o}}function U(){y=1}let N=new O(".gallery a",{captions:!0,captionsData:"alt",captionType:"attr",captionDelay:250,animationSpeed:350,captionPosition:"bottom"});function S(){N.refresh()}function b(a){const t=document.querySelector(".gallery"),r=a.map(o=>{const{webformatURL:e,largeImageURL:s,likes:c,views:I,tags:P,comments:q,downloads:x}=o,u=document.createElement("li");u.classList.add("gallery-item");const m=document.createElement("a");m.classList.add("gallery-link"),m.href=s;const n=document.createElement("img");n.classList.add("gallery-image"),n.src=e,n.alt=P,n.width=360,n.height=200,u.appendChild(m),m.appendChild(n);const f=document.createElement("div");return f.classList.add("gallery-item-info"),f.innerHTML=`
  <div class="item-info-container">
    <span class="description-name">Likes</span>
    <span class="description-counts">${c}</span>
  </div>
  <div class="item-info-container">
    <span class="description-name">Views</span>
    <span class="description-counts">${I}</span>
  </div>
  <div class="item-info-container">
    <span class="description-name">Comments</span>
    <span class="description-counts">${q}</span>
  </div>
  <div class="item-info-container">
    <span class="description-name">Downloads</span>
    <span class="description-counts">${x}</span>
  </div>
`,u.appendChild(f),u});t.append(...r)}function R(){const a=document.querySelector(".gallery");a.innerHTML=""}const E="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEYSURBVHgBrZZRDoIwDIYrwfDqTeQo3ohxEr0BXsW77GXFOFdkYcC6DuFPCJB1/7fCWgBgZEzfIPY256BYzqfkzE8nUNbCE+DzgqSKK8W6OVBV5xYk+ZUbgw/IFMVKmfxtng3ZYy5CjjBnISlzrXUtGcZiZpDxolsGIWItvTi/OK0xAuk7GhsBRjEGioNMmffMXKNEAAeRzENACYJc8QxF5IuJNBZhS2PSfBGwhNB9rjmpgHxZ5jqprAyC3jT0mi29RwSE5v6xhO9EhAjblN0tqS38G59t02ShKeCzU2Kh+SDE9z0GAUGxGPKaLS4F2aqVudcRENb8CIhovgeSMl/VwdQWbOPOl5yPvivs25b2MWjKJOu3hTX+AgZ5PpvL0NSkAAAAAElFTkSuQmCC",C=document.querySelector(".form"),p=document.querySelector(".loader"),v=document.querySelector(".gallery"),l=document.querySelector(".load-more"),h={message:"Sorry, there are no images matching your search query.Please try again!",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",iconUrl:E},B={message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",iconUrl:E};C.addEventListener("submit",D);l.addEventListener("click",G);let A=0,d=0,g="";async function D(a){if(a.preventDefault(),g=a.currentTarget.elements.searchQuery.value.trim(),!!g){p.classList.remove("visually-hidden"),R(),C.reset(),U(),d=0;try{const t=await w(g),r=t.hits;if(A=t.totalHits,d=r.length,r.length===0){i.show(h),l.classList.add("visually-hidden");return}b(t.hits),S(),d>=A?(i.show(B),l.classList.add("visually-hidden")):l.classList.remove("visually-hidden")}catch{i.show(h)}finally{p.classList.add("visually-hidden")}}}async function G(){p.classList.remove("visually-hidden");const a=v.scrollHeight;try{const t=await w(g),r=t.hits;if(d+=r.length,r.length===0){i.show(h),l.classList.add("visually-hidden");return}b(t.hits),S();const o=v.scrollHeight;window.scrollBy({top:o-a,behavior:"smooth"}),d>=A&&(i.show(B),l.classList.add("visually-hidden"))}catch{i.show(h)}finally{p.classList.add("visually-hidden")}}
//# sourceMappingURL=index.js.map
