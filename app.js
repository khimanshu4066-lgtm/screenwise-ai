const items = [
 {id:1,title:"Tiny Wonders",category:"Feel-good",duration:10,desc:"A bright little journey into everyday moments worth noticing.",why:"A light, uplifting pick for a quick reset.",symbol:"✳",color:"#1c4d55",glow:"#55f2dc"},
 {id:2,title:"The Curious Cosmos",category:"Curious",duration:20,desc:"Explore the big questions behind our universe.",why:"A compact discovery session for curious minds.",symbol:"✦",color:"#30275c",glow:"#a58bff"},
 {id:3,title:"Beyond the Map",category:"Adventurous",duration:60,desc:"A sample expedition through remote landscapes and bold ideas.",why:"A longer escape when you have time to explore.",symbol:"↗",color:"#5a3825",glow:"#ffb56b"},
 {id:4,title:"Slow Sunday",category:"Relaxed",duration:10,desc:"Gentle scenery and calm ideas to help you unwind.",why:"An easy, low-pressure watch before your next task.",symbol:"☾",color:"#233b57",glow:"#80b7ff"},
 {id:5,title:"Small Acts, Big Change",category:"Feel-good",duration:20,desc:"Stories about people making a difference close to home.",why:"Positive stories with a little inspiration to take away.",symbol:"♡",color:"#4a2b48",glow:"#ff8fc7"},
 {id:6,title:"Designing Tomorrow",category:"Curious",duration:60,desc:"A look at ideas shaping the world we may live in next.",why:"A thoughtful deep dive for a longer viewing session.",symbol:"⌘",color:"#25483d",glow:"#75f0ad"}
];
let mood="Any mood", time="Any", view="discover";
let watchlist=JSON.parse(localStorage.getItem("screenwise-watchlist")||"[]");
let focusedIndex=0;
const grid=document.querySelector("#content-grid");
const count=document.querySelector("#results-count");
const toast=document.querySelector("#toast");
function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.classList.remove("show"),2100)}
function save(){localStorage.setItem("screenwise-watchlist",JSON.stringify(watchlist));document.querySelector("#watch-count").textContent=watchlist.length}
function filtered(){
 let list=items.filter(x=>(mood==="Any mood"||x.category===mood)&&(time==="Any"||(time==="10"&&x.duration<=10)||(time==="20"&&x.duration<=20)||(time==="60"&&x.duration>=60)));
 if(view==="watchlist")list=list.filter(x=>watchlist.includes(x.id));
 return list;
}
function render(){
 const list=filtered();grid.innerHTML="";count.textContent=`${list.length} ${list.length===1?"pick":"picks"}`;
 document.querySelector("#list-title").textContent=view==="watchlist"?"Your watchlist":"Your smart shortlist";
 document.querySelector("#discover-panel").classList.toggle("hidden",view==="watchlist");
 document.querySelector("#empty-state").classList.toggle("hidden",list.length>0);
 grid.classList.toggle("hidden",list.length===0);
 list.forEach((item,index)=>{
  const card=document.createElement("article");card.className="content-card";card.tabIndex=0;card.dataset.symbol=item.symbol;card.style.setProperty("--card-color",item.color);card.style.setProperty("--glow",item.glow);
  card.innerHTML=`<div class="card-top"><span class="category-tag">${item.category}</span><span class="duration">◷ ${item.duration} min</span></div><h3>${item.title}</h3><p>${item.desc}</p><div class="card-bottom"><span>✦ ${item.why}</span><button class="save-btn ${watchlist.includes(item.id)?"saved":""}" aria-label="${watchlist.includes(item.id)?"Remove from":"Add to"} watchlist">${watchlist.includes(item.id)?"✓ Saved":"+ Save"}</button></div>`;
  card.querySelector(".save-btn").addEventListener("click",e=>{e.stopPropagation();toggleSave(item.id)});
  card.addEventListener("click",()=>notify(`${item.title}: ${item.why}`));
  card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();notify(`${item.title}: ${item.why}`)}});
  grid.appendChild(card);
 });
}
function toggleSave(id){watchlist=watchlist.includes(id)?watchlist.filter(x=>x!==id):[...watchlist,id];save();render();notify(watchlist.includes(id)?"Added to your watchlist":"Removed from your watchlist")}
document.querySelectorAll("[data-mood]").forEach(b=>b.addEventListener("click",()=>{mood=b.dataset.mood;document.querySelectorAll("[data-mood]").forEach(x=>x.classList.toggle("active",x===b));render()}));
document.querySelectorAll("[data-time]").forEach(b=>b.addEventListener("click",()=>{time=b.dataset.time;document.querySelectorAll("[data-time]").forEach(x=>x.classList.toggle("active",x===b));render()}));
document.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>{view=b.dataset.nav;document.querySelectorAll("[data-nav]").forEach(x=>x.classList.toggle("selected",x===b));render()}));
document.querySelector("#surprise-btn").addEventListener("click",()=>{view="discover";mood="Any mood";time="Any";document.querySelectorAll("[data-nav]").forEach(x=>x.classList.toggle("selected",x.dataset.nav==="discover"));document.querySelectorAll("[data-mood]").forEach(x=>x.classList.toggle("active",x.dataset.mood==="Any mood"));document.querySelectorAll("[data-time]").forEach(x=>x.classList.toggle("active",x.dataset.time==="Any"));render();const list=filtered();const pick=list[Math.floor(Math.random()*list.length)];if(pick)notify(`Surprise pick: ${pick.title} — ${pick.why}`)});
document.querySelector("#how-btn").addEventListener("click",()=>{document.querySelector("#info-panel").classList.remove("hidden");document.querySelector("#info-panel").scrollIntoView({behavior:"smooth",block:"center"})});
document.querySelector("#close-info").addEventListener("click",()=>document.querySelector("#info-panel").classList.add("hidden"));
document.querySelector("#reset-btn").addEventListener("click",()=>{mood="Any mood";time="Any";view="discover";document.querySelectorAll("[data-nav]").forEach(x=>x.classList.toggle("selected",x.dataset.nav==="discover"));document.querySelectorAll("[data-mood]").forEach(x=>x.classList.toggle("active",x.dataset.mood==="Any mood"));document.querySelectorAll("[data-time]").forEach(x=>x.classList.toggle("active",x.dataset.time==="Any"));render()});
document.addEventListener("keydown",e=>{
 if(["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(e.key)){
  const els=[...document.querySelectorAll("button:not(:disabled),.content-card")].filter(el=>el.offsetParent!==null);
  const active=document.activeElement;let i=els.indexOf(active);if(i<0)i=0;
  let next=i;
  if(e.key==="ArrowRight")next=Math.min(els.length-1,i+1);
  if(e.key==="ArrowLeft")next=Math.max(0,i-1);
  if(e.key==="ArrowDown")next=Math.min(els.length-1,i+3);
  if(e.key==="ArrowUp")next=Math.max(0,i-3);
  if(els[next]){e.preventDefault();els[next].focus()}
 }
 if(e.key==="Escape"){document.querySelector("#info-panel").classList.add("hidden")}
});
save();render();
