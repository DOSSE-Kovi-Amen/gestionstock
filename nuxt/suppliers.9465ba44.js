import{_ as O,a as M}from"./Modal.b73f5a06.js";import{_ as E}from"./Datatable.vue.ca3ea79b.js";import{_ as F}from"./Spinner.d3bd0c23.js";import{J as T,r as h,n as C,o as v,c as g,b as x,w as k,a as e,u as s,q as z,y as _,z as f,d as u,t as y,B as V,g as N,A as q,F as B,s as P}from"./entry.8274f21e.js";import{F as L}from"./FirestoreService.ba9c0b5d.js";const U=T("supplier",()=>{const $=h([]),i=h([]),c=h(!1),m=new L,o="suppliers",n=()=>$.value.length,r=async()=>{c.value=!0,await m.getListFromCollection(o).then(a=>{$.value=a,c.value=!1})},l=async a=>{const t=await m.create(o,a);return await r(),t},d=async(a,t)=>{const w=await m.update(o,t,a);return await r(),w},b=async a=>{console.log("===============id====================="),console.log(a),console.log("===================================="),await m.delete(o,a),await r()};return r(),{suppliers:$,loading:c,errors:i,suppliersCount:n,getData:r,postData:l,updateData:d,deleteData:b}}),I={class:"modal-content text-left"},J={class:"flex p-4 bg-blue-400 text-white justify-between pb-3"},R=e("h3",{class:"text-xl"},[e("i",{class:"fa-solid fa-circle-plus"}),u(" Ajouter un fournisseur ")],-1),G=e("i",{class:"fa-solid fa-xmark"},null,-1),H=[G],K={key:0,class:"flex bg-white h-64 w-full justify-center items-center"},Q={key:1},W=["onSubmit"],X={style:{height:"85vh"},class:"modal-body pb-16 p-5 overflow-y-auto"},Y={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},Z={class:"mb-4"},ee=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"name"},"Nom (*) : ",-1),se={class:"mb-4"},te=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"codeSupplier"},"Code Fournisseur :",-1),oe={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},le={class:"mb-4"},ne=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"email"},"Email :",-1),ae={class:"mb-4"},de=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"telephone"},"Telephone (*) : ",-1),ie={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},re={class:"mb-4"},ce=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"zipCode"},"Code postal :",-1),ue={class:"mb-4"},pe=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"address"},"Adresse :",-1),me={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},_e={class:"mb-4"},fe=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"country"},"Pays :",-1),be={class:"mb-4"},ye=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"city"},"Ville :",-1),he={class:"mb-4"},ve=e("label",{for:"description",class:"block text-gray-700 font-bold mb-2"},"Description",-1),ge={class:"absolute bg-gray-100 w-full flex justify-end bottom-0 p-4"},xe=e("i",{class:"fa-solid fa-close"},null,-1),$e=e("button",{type:"submit",class:"btn-primary text-white py-2 px-4 rounded-sm"},[e("i",{class:"fa-solid fa-save"}),u(" Enregistrer ")],-1),we=C({__name:"AddSupplierModal",props:{isOpen:{type:Boolean,required:!0,default:!1}},emits:["onClose","onSuccess"],setup($,{emit:i}){const c=U(),m=h(!1),o=h({codeSupplier:"",name:"",email:"",telephone:"",zipCode:"",address:"",description:"",country:"",city:""}),n=async()=>{m.value=!0,await c.postData(o.value).then(r=>{r&&(i("onClose"),i("onSuccess","Client ajouté avec succès"),o.value.name="",o.value.address="",o.value.city="",o.value.codeSupplier="",o.value.country="",o.value.zipCode="",o.value.email="",o.value.description,o.value.telephone=""),m.value=!1}),setTimeout(()=>{m.value=!1},15e3)};return(r,l)=>{const d=F,b=O;return v(),g("div",null,[x(b,{"is-open":$.isOpen},{default:k(()=>[e("div",I,[e("div",J,[R,e("button",{onClick:l[0]||(l[0]=a=>r.$emit("onClose")),class:"modal-close"},H)]),s(m)?(v(),g("div",K,[x(d,{class:"h-12"})])):(v(),g("div",Q,[e("form",{onSubmit:z(n,["prevent"])},[e("div",X,[e("div",Y,[e("div",Z,[ee,_(e("input",{"onUpdate:modelValue":l[1]||(l[1]=a=>s(o).name=a),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"name",name:"name",placeholder:"Nom",required:""},null,512),[[f,s(o).name]])]),e("div",se,[te,_(e("input",{"onUpdate:modelValue":l[2]||(l[2]=a=>s(o).codeSupplier=a),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"codeSupplier",name:"codeSupplier",placeholder:"Code Fournisseur",required:""},null,512),[[f,s(o).codeSupplier]])])]),e("div",oe,[e("div",le,[ne,_(e("input",{"onUpdate:modelValue":l[3]||(l[3]=a=>s(o).email=a),class:"border rounded-md py-2 px-3 w-full",type:"email",id:"email",name:"email",placeholder:"Email"},null,512),[[f,s(o).email]])]),e("div",ae,[de,_(e("input",{"onUpdate:modelValue":l[4]||(l[4]=a=>s(o).telephone=a),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"telephone",name:"telephone",placeholder:"Téléphone",required:""},null,512),[[f,s(o).telephone]])])]),e("div",ie,[e("div",re,[ce,_(e("input",{"onUpdate:modelValue":l[5]||(l[5]=a=>s(o).zipCode=a),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"zipCode",name:"zipCode",placeholder:"Code postal"},null,512),[[f,s(o).zipCode]])]),e("div",ue,[pe,_(e("input",{"onUpdate:modelValue":l[6]||(l[6]=a=>s(o).address=a),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"address",name:"address",placeholder:"Adresse"},null,512),[[f,s(o).address]])])]),e("div",me,[e("div",_e,[fe,_(e("input",{"onUpdate:modelValue":l[7]||(l[7]=a=>s(o).country=a),class:"border rounded-md py-2 px-3 w-full",type:"country",id:"country",name:"country",placeholder:"Pays"},null,512),[[f,s(o).country]])]),e("div",be,[ye,_(e("input",{"onUpdate:modelValue":l[8]||(l[8]=a=>s(o).city=a),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"city",name:"city",placeholder:"Ville"},null,512),[[f,s(o).city]])])]),e("div",he,[ve,_(e("textarea",{"onUpdate:modelValue":l[9]||(l[9]=a=>s(o).description=a),id:"description",name:"description",class:"w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"},null,512),[[f,s(o).description]])])]),e("div",ge,[e("a",{class:"bg-gray-200 text-black py-2 px-4 rounded-sm mr-2",onClick:l[10]||(l[10]=a=>r.$emit("onClose"))},[xe,u(" Fermer ")]),$e])],40,W)]))])]),_:1},8,["is-open"])])}}}),Ce={class:"modal-content text-left"},ke={class:"flex p-4 bg-yellow-500 text-white justify-between pb-3"},De=e("h3",{class:"text-xl"},[e("i",{class:"fa-regular fa-eye"}),u(" Voir un client ")],-1),Se=e("i",{class:"fa-solid fa-xmark"},null,-1),Ve=[Se],Oe={style:{height:"80vh"},class:"modal-body pb-16 p-5 overflow-y-auto"},Fe=e("strong",null,"ID:",-1),Ue=e("strong",null,"Nom:",-1),je=e("strong",null,"Code Fournisseur:",-1),Ae=e("strong",null,"Adresse:",-1),ze=e("strong",null,"Email:",-1),Me=e("strong",null,"Telephone:",-1),Ee=e("strong",null,"Pays:",-1),Te=e("strong",null,"Ville:",-1),Ne=e("strong",null,"Code postal:",-1),qe=e("strong",null,"Description:",-1),Be=e("strong",null,"Date de création:",-1),Pe=e("strong",null,"Date de modification:",-1),Le={class:"absolute bg-gray-100 w-full flex justify-end bottom-0 p-4"},Ie=e("i",{class:"fa-solid fa-trash"},null,-1),Je=C({__name:"ViewSupplierModal",props:{isOpen:{type:Boolean},selectedData:{}},setup($){return(i,c)=>{const m=O;return v(),g("div",null,[x(m,{"is-open":i.isOpen},{default:k(()=>{var o,n,r,l,d,b,a,t,w,D,S,p;return[e("div",Ce,[e("div",ke,[De,e("button",{onClick:c[0]||(c[0]=j=>i.$emit("onClose")),class:"modal-close"},Ve)]),e("div",Oe,[e("li",null,[Fe,u(" "+y((o=i.selectedData)==null?void 0:o.id),1)]),e("li",null,[Ue,u(" "+y((n=i.selectedData)==null?void 0:n.name),1)]),e("li",null,[je,u(" "+y((r=i.selectedData)==null?void 0:r.codeSupplier),1)]),e("li",null,[Ae,u(" "+y((l=i.selectedData)==null?void 0:l.address),1)]),e("li",null,[ze,u(" "+y((d=i.selectedData)==null?void 0:d.email),1)]),e("li",null,[Me,u(" "+y((b=i.selectedData)==null?void 0:b.telephone),1)]),e("li",null,[Ee,u(" "+y((a=i.selectedData)==null?void 0:a.country),1)]),e("li",null,[Te,u(" "+y((t=i.selectedData)==null?void 0:t.city),1)]),e("li",null,[Ne,u(" "+y((w=i.selectedData)==null?void 0:w.zipCode),1)]),e("li",null,[qe,u(" "+y((D=i.selectedData)==null?void 0:D.description),1)]),e("li",null,[Be,u(" "+y(("formatDateFrench"in i?i.formatDateFrench:s(V))((S=i.selectedData)==null?void 0:S.createdAt)),1)]),e("li",null,[Pe,u(" "+y(("formatDateFrench"in i?i.formatDateFrench:s(V))((p=i.selectedData)==null?void 0:p.updatedAt)),1)])]),e("div",Le,[e("button",{class:"bg-gray-200 text-black py-1 px-4 rounded-sm mr-2",onClick:c[1]||(c[1]=j=>i.$emit("onClose"))},[Ie,u(" Fermer ")])])])]}),_:1},8,["is-open"])])}}}),Re={class:"modal-content text-left"},Ge={class:"flex p-4 bg-blue-400 text-white justify-between pb-3"},He=e("h3",{class:"text-xl"},[e("i",{class:"fa-solid fa-circle-plus"}),u(" Editer un fournisseur ")],-1),Ke=e("i",{class:"fa-solid fa-xmark"},null,-1),Qe=[Ke],We={key:0,class:"flex bg-white h-64 w-full justify-center items-center"},Xe={key:1},Ye=["onSubmit"],Ze={style:{height:"85vh"},class:"modal-body pb-16 p-5 overflow-y-auto"},es={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},ss={class:"mb-4"},ts=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"name"},"Nom (*) : ",-1),os={class:"mb-4"},ls=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"codeCli"},"Code Client :",-1),ns={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},as={class:"mb-4"},ds=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"email"},"Email :",-1),is={class:"mb-4"},rs=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"telephone"},"Telephone (*) : ",-1),cs={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},us={class:"mb-4"},ps=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"zipCode"},"Code postal :",-1),ms={class:"mb-4"},_s=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"address"},"Adresse :",-1),fs={class:"grid grid-cols-1 sm:grid-cols-2 gap-4"},bs={class:"mb-4"},ys=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"country"},"Pays :",-1),hs={class:"mb-4"},vs=e("label",{class:"block text-gray-700 text-sm font-bold mb-2",for:"city"},"Ville :",-1),gs={class:"mb-4"},xs=e("label",{for:"description",class:"block text-gray-700 font-bold mb-2"},"Description",-1),$s={class:"absolute bg-gray-100 w-full flex justify-end bottom-0 p-4"},ws=e("i",{class:"fa-solid fa-trash"},null,-1),Cs=e("button",{type:"submit",class:"btn-primary text-white py-2 px-4 rounded-sm"},[e("i",{class:"fa-solid fa-save"}),u(" Enregistrer ")],-1),ks=C({__name:"EditSupplierModal",props:{isOpen:{type:Boolean},selectedData:{}},emits:["onClose","onSuccess"],setup($,{emit:i}){const c=$,m=U(),o=h(!1),n=h({codeSupplier:"",name:"",email:"",telephone:"",zipCode:"",address:"",description:"",country:"",city:""});N(()=>c.isOpen,(l,d)=>{l&&c.selectedData&&(n.value={...c.selectedData})});const r=async()=>{o.value=!0,c.selectedData&&await m.updateData(n.value,c.selectedData.id).then(l=>{l&&(console.log("=============status======================="),console.log(l),console.log("===================================="),i("onClose"),i("onSuccess","Catégorie mise à jour avec succès")),o.value=!1}),setTimeout(()=>{o.value=!1},15e3)};return(l,d)=>{const b=F,a=O;return v(),g("div",null,[x(a,{"is-open":l.isOpen},{default:k(()=>[e("div",Re,[e("div",Ge,[He,e("button",{onClick:d[0]||(d[0]=t=>l.$emit("onClose")),class:"modal-close"},Qe)]),s(o)?(v(),g("div",We,[x(b,{class:"h-12"})])):(v(),g("div",Xe,[e("form",{onSubmit:z(r,["prevent"])},[e("div",Ze,[e("div",es,[e("div",ss,[ts,_(e("input",{"onUpdate:modelValue":d[1]||(d[1]=t=>s(n).name=t),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"name",name:"name",placeholder:"Nom",required:""},null,512),[[f,s(n).name]])]),e("div",os,[ls,_(e("input",{"onUpdate:modelValue":d[2]||(d[2]=t=>s(n).codeSupplier=t),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"codeCli",name:"codeCli",placeholder:"Code Client",required:""},null,512),[[f,s(n).codeSupplier]])])]),e("div",ns,[e("div",as,[ds,_(e("input",{"onUpdate:modelValue":d[3]||(d[3]=t=>s(n).email=t),class:"border rounded-md py-2 px-3 w-full",type:"email",id:"email",name:"email",placeholder:"Email"},null,512),[[f,s(n).email]])]),e("div",is,[rs,_(e("input",{"onUpdate:modelValue":d[4]||(d[4]=t=>s(n).telephone=t),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"telephone",name:"telephone",placeholder:"Téléphone",required:""},null,512),[[f,s(n).telephone]])])]),e("div",cs,[e("div",us,[ps,_(e("input",{"onUpdate:modelValue":d[5]||(d[5]=t=>s(n).zipCode=t),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"zipCode",name:"zipCode",placeholder:"Code postal"},null,512),[[f,s(n).zipCode]])]),e("div",ms,[_s,_(e("input",{"onUpdate:modelValue":d[6]||(d[6]=t=>s(n).address=t),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"address",name:"address",placeholder:"Adresse"},null,512),[[f,s(n).address]])])]),e("div",fs,[e("div",bs,[ys,_(e("input",{"onUpdate:modelValue":d[7]||(d[7]=t=>s(n).country=t),class:"border rounded-md py-2 px-3 w-full",type:"country",id:"country",name:"country",placeholder:"Pays"},null,512),[[f,s(n).country]])]),e("div",hs,[vs,_(e("input",{"onUpdate:modelValue":d[8]||(d[8]=t=>s(n).city=t),class:"border rounded-md py-2 px-3 w-full",type:"text",id:"city",name:"city",placeholder:"Ville"},null,512),[[f,s(n).city]])])]),e("div",gs,[xs,_(e("textarea",{"onUpdate:modelValue":d[9]||(d[9]=t=>s(n).description=t),id:"description",name:"description",class:"w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"},null,512),[[f,s(n).description]])])]),e("div",$s,[e("a",{class:"bg-gray-200 text-black py-2 px-4 rounded-sm mr-2",onClick:d[10]||(d[10]=t=>l.$emit("onClose"))},[ws,u(" Fermer ")]),Cs])],40,Ye)]))])]),_:1},8,["is-open"])])}}}),Ds={class:"modal-content text-left h-56"},Ss={class:"flex p-4 bg-red-500 text-white justify-between pb-3"},Vs=e("h3",{class:"text-xl"},"Confirmer la suppression",-1),Os=e("i",{class:"fa-solid fa-xmark"},null,-1),Fs=[Os],Us={key:0,class:"flex bg-white h-full w-full justify-center items-center"},js={key:1},As={class:"modal-body p-5"},zs={class:"absolute bg-gray-100 w-full flex justify-end bottom-0 p-4"},Ms=e("i",{class:"fa-solid fa-close"},null,-1),Es=e("i",{class:"fa-solid fa-trash"},null,-1),Ts=C({__name:"DeleteSupplierModal",props:{isOpen:{type:Boolean},selectedData:{}},emits:["onClose","onSuccess"],setup($,{emit:i}){const c=h(!1),m=U(),o=async n=>{c.value=!0,m.deleteData(n).then(()=>{c.value=!1,i("onClose"),i("onSuccess","Client supprimé avec succès")})};return(n,r)=>{const l=F,d=O;return v(),g("div",null,[x(d,{"is-open":n.isOpen},{default:k(()=>{var b;return[e("div",Ds,[e("div",Ss,[Vs,e("button",{onClick:r[0]||(r[0]=a=>n.$emit("onClose")),class:"modal-close"},Fs)]),s(c)?(v(),g("div",Us,[x(l,{class:"h-12"})])):(v(),g("div",js,[e("div",As,[e("p",null,y(`Supprimer ${(b=n.selectedData)==null?void 0:b.name} ?`),1)]),e("div",zs,[e("button",{class:"bg-gray-200 text-black py-1 px-4 rounded-sm mr-2",onClick:r[1]||(r[1]=a=>n.$emit("onClose"))},[Ms,u(" Fermer ")]),e("button",{onClick:r[2]||(r[2]=a=>{var t;return o(((t=n.selectedData)==null?void 0:t.id)??"")}),class:"btn-primary text-white py-1 px-4 rounded-sm"},[Es,u(" Supprimer ")])])]))])]}),_:1},8,["is-open"])])}}}),Ns=e("i",{class:"fa-solid fa-circle-plus"},null,-1),qs={class:"p-5 bg-white w-full h-full shadow-2xl rounded-lg bg-opacity-25"},Bs=e("thead",null,[e("tr",null,[e("th",{class:"px-6 py-3 text-left text-sm font-bold"},"Nom"),e("th",{class:"px-6 py-3 text-left text-sm font-bold"},"Téléphone"),e("th",{class:"px-6 py-3 text-left text-sm font-bold"},"Actions")])],-1),Ps={class:"bg-white text-gray-600 divide-y divide-gray-200"},Ls=["title"],Is={class:"px-6 py-4 whitespace-no-wrap"},Js={class:"px-6 py-4 whitespace-no-wrap"},Rs={class:"flex gap-2"},Gs=["onClick"],Hs=e("i",{class:"fa-regular fa-eye"},null,-1),Ks=[Hs],Qs=["onClick"],Ws=e("i",{class:"fa-regular fa-pen-to-square"},null,-1),Xs=[Ws],Ys=["onClick"],Zs=e("i",{class:"fa-regular fa-trash-can"},null,-1),et=[Zs],st={key:1,class:"flex flex-col justify-center items-center"},tt=e("p",{class:"m-2"},"Chargement en cours...",-1),it=C({__name:"suppliers",setup($){const i=U(),c=h(),m=h(!1),o=h(!1),n=h(!1),r=h(!1),l=h(!1),d=h(""),b=(a,t)=>{switch(c.value=a,t){case"read":o.value=!0;break;case"edit":r.value=!0;break;case"delete":n.value=!0;break}console.log("===================================="),console.log(o.value),console.log("====================================")};return(a,t)=>{const w=M,D=E,S=F;return v(),g("div",null,[x(w,{show:s(l),title:"alertTitle",message:s(d),onOnClose:t[0]||(t[0]=p=>l.value=!1)},null,8,["show","message"]),x(we,{onOnSuccess:t[1]||(t[1]=p=>{d.value=p,l.value=!0}),onOnClose:t[2]||(t[2]=p=>m.value=!1),"is-open":s(m)},null,8,["is-open"]),x(Je,{onOnClose:t[3]||(t[3]=p=>o.value=!1),"is-open":s(o),"selected-data":s(c)},null,8,["is-open","selected-data"]),x(ks,{onOnSuccess:t[4]||(t[4]=p=>{d.value=p,l.value=!0}),onOnClose:t[5]||(t[5]=p=>r.value=!1),"is-open":s(r),"selected-data":s(c)},null,8,["is-open","selected-data"]),x(Ts,{onOnSuccess:t[6]||(t[6]=p=>{d.value=p,l.value=!0}),onOnClose:t[7]||(t[7]=p=>n.value=!1),"is-open":s(n),"selected-data":s(c)},null,8,["is-open","selected-data"]),e("button",{onClick:t[8]||(t[8]=p=>m.value=!0),class:"py-2 p-4 shadow-xl btn-primary my-4 text-white"},[Ns,u(" Ajouter nouveau ")]),e("div",qs,[s(i).loading?(v(),g("div",st,[tt,x(S,{class:"h-12"})])):(v(),q(D,{key:0},{default:k(()=>[Bs,e("tbody",Ps,[(v(!0),g(B,null,P(s(i).suppliers,(p,j)=>(v(),g("tr",{key:j,title:`Créé le ${s(V)(p.createdAt)}
Modifié le ${s(V)(p.updatedAt)}}`},[e("td",Is,y(p.name),1),e("td",Js,y(p.telephone),1),e("td",Rs,[e("a",{class:"p-0.5 px-2 text-white bg-yellow-500 hover:bg-yellow-600 shadow-xl rounded-sm",onClick:A=>b(p,"read")},Ks,8,Gs),e("a",{class:"p-0.5 px-2 text-white bg-blue-500 hover:bg-blue-600 shadow-xl rounded-sm",onClick:A=>b(p,"edit")},Xs,8,Qs),e("a",{class:"p-0.5 px-2 text-white bg-red-500 hover:bg-red-600 shadow-xl rounded-sm",onClick:A=>b(p,"delete")},et,8,Ys)])],8,Ls))),128))])]),_:1}))])])}}});export{it as default};
