import{J as d,r}from"./entry.8274f21e.js";import{F as m}from"./FirestoreService.ba9c0b5d.js";const y=d("client",()=>{const s=r([]),l=r([]),n=r(!1),a=new m,o="clients",i=()=>s.value.length,e=async()=>{n.value=!0,await a.getListFromCollection(o).then(t=>{s.value=t,n.value=!1})},u=async t=>{const c=await a.create(o,t);return await e(),c},w=async(t,c)=>{const g=await a.update(o,c,t);return await e(),g},f=async t=>{console.log("===============id====================="),console.log(t),console.log("===================================="),await a.delete(o,t),await e()};return e(),{clients:s,loading:n,errors:l,clientsCount:i,getData:e,postData:u,updateData:w,deleteData:f}});export{y as u};
