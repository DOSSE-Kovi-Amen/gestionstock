import{J as d,r as c}from"./entry.8274f21e.js";import{F as m}from"./FirestoreService.ba9c0b5d.js";const y=d("category",()=>{const s=c([]),i=c([]),r=c(!1),a=new m,o="categories",l=()=>s.value.length,e=async()=>{r.value=!0,await a.getListFromCollection(o).then(t=>{s.value=t,r.value=!1})},u=async t=>{const n=await a.create(o,t);return await e(),n},g=async(t,n)=>{const f=await a.update(o,n,t);return await e(),f},w=async t=>{console.log("===============id====================="),console.log(t),console.log("===================================="),await a.delete(o,t),await e()};return e(),{categories:s,loading:r,errors:i,categoriesCount:l,getData:e,postData:u,updateData:g,deleteData:w}});export{y as u};
