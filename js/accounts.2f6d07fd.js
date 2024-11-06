"use strict";(self["webpackChunkgestor_gastos"]=self["webpackChunkgestor_gastos"]||[]).push([[562],{3633:function(t,e,s){s.r(e),s.d(e,{default:function(){return h}});var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("title-general",{attrs:{title:"Presupuesto"}}),s("div",{staticClass:"l-content l-content--period"},[s("select-period"),s("expenses-per-account",{attrs:{account:t.account}})],1)],1)},a=[],i=s(5099),o=s(4665),r=s(6312),c=s(4559),u={name:"AccountsView",components:{TitleGeneral:i.Z,SelectPeriod:r.Z,ExpensesPerAccount:c.Z},computed:{totalDebit(){let t=0;return this.accounts.forEach((e=>{t+=e.getTotal(this.currentPeriod).total})),t},totalBalance(){let t=0;return this.accounts.forEach((e=>{t+=e.getTotal(this.currentPeriod).balance})),t},account(){return this.accounts.length>0?this.accounts[0]:null},...(0,o.rn)("accountsStore",["accounts"]),...(0,o.rn)("expensesStore",["currentPeriod"])},methods:{...(0,o.OI)("accountsStore",["setAccountSelected"])},created(){this.setAccountSelected(this.account)}},d=u,p=s(1001),l=(0,p.Z)(d,n,a,!1,null,null,null),h=l.exports},5099:function(t,e,s){s.d(e,{Z:function(){return u}});var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"l-title",class:t.addClass},[s("h2",{staticClass:"main-title"},[t._v(t._s(t.title))]),t.backRoute?s("button",{staticClass:"btn back-arrow",on:{click:function(e){return t.goToRoute(t.backRoute)}}},[s("b-icon",{attrs:{icon:"arrow-left"}})],1):t._e(),t.addButtonRoute?s("button",{staticClass:"btn btn-block button-rounded button-big button-outline-color-general",on:{click:function(e){return t.goToRoute(t.addButtonRoute)}}},[t._v("+")]):t._e(),t.addButtonFunction?s("button",{staticClass:"btn btn-block button-rounded button-big button-outline-color-general",on:{click:function(e){return t.addButtonFunction()}}},[t._v("+")]):t._e()])},a=[],i={name:"TitleGeneral",props:{title:{type:String,default:""},backRoute:{type:String,default:""},addButtonRoute:{type:String,default:""},addButtonFunction:{type:Function}},computed:{addClass(){return this.backRoute?"l-title-back":""}},methods:{goToRoute(t){this.$router.push(t)}}},o=i,r=s(1001),c=(0,r.Z)(o,n,a,!1,null,null,null),u=c.exports},6412:function(t,e,s){s.d(e,{Z:function(){return b}});var n=s(103),a=s(1669),i=s(198),o=s(3796);class r{constructor(t,e,s,n,a,i,r,c,u,d){(0,o.Z)(this,"id",""),(0,o.Z)(this,"amount",0),(0,o.Z)(this,"description",""),(0,o.Z)(this,"category",{}),(0,o.Z)(this,"date",""),(0,o.Z)(this,"paid",!1),(0,o.Z)(this,"fixed",!1),(0,o.Z)(this,"repeat",!1),(0,o.Z)(this,"repeatTimes",!1),(0,o.Z)(this,"payments",[]),(0,o.Z)(this,"type","credit"),(0,o.Z)(this,"editList",[]),(0,o.Z)(this,"product",null),this.amount=t.replace(".",""),this.description=e,this.category=s,this.date=n,this.paid=i,this.fixed=a,this.repeat=r,this.repeatTimes=c,this.type=u,this.product=d}static fromJSONResponse(t,e){const s=new r(t.amount,t.description,t.category,t.date,t.fixed,t.paid,t.repeat,t.repeatTimes,t.type,t.product);return e&&s.setId(e),s}getId(){return this.id}setId(t){return this.id=t,this}getAmount(){return this.amount}getDescription(){return this.description}getCategory(){return this.category}getDate(){return this.date}isCredit(){return"credit"===this.type}isPaid(){return this.paid}setpaid(t){return this.paid=t,this}isFixed(){return this.fixed}isRepeat(){return this.repeat}getRepeatTimes(){return this.repeatTimes}setUser(t){return this.user=t,this}getPayments(){return this.payments}setPayments(t){return this.payments=t,this}getObjectData(t){const e={amount:this.amount.toString().replace(".",""),description:this.description,category:this.category.getObjectData(!0),date:this.date,paid:this.paid,fixed:this.fixed,repeat:this.repeat,user:this.user,type:this.type,product:null};return this.product&&(e.product=this.product.getObjectData(!0)),this.repeat&&(e.repeatTimes=this.repeatTimes),(this.fixed||this.repeat)&&(e.payments=this.payments,e.editList=this.editList),t&&(e.id=this.id),e}}var c=s(9554),u=s(4511),d=s(1670),p=s(9767),l=s(7133),h=s.n(l),g=s(1803),m=new WeakMap,f=new WeakMap,y=new WeakMap,Z=new WeakMap;class b{constructor(){(0,n.Z)(this,m,{writable:!0,value:void 0}),(0,n.Z)(this,f,{writable:!0,value:void 0}),(0,n.Z)(this,y,{writable:!0,value:void 0}),(0,n.Z)(this,Z,{writable:!0,value:void 0});let t=JSON.parse(localStorage.getItem("currentUser"));t=t.email,(0,i.Z)(this,m,new d.Z(t)),(0,i.Z)(this,f,new p.Z(t)),(0,i.Z)(this,Z,new g.Z),(0,i.Z)(this,y,t)}async addExpense(t,e,s,n,i,o,d,p,l,h){const g=t.replaceAll(".",""),Z=c.Z.state.accountsStore.accountSelected,b=Z.expenses;o&&(o=u.P.getCurrentDate());const x=new r(g,e,s,n,i,o,d,p,l,h);x.setUser((0,a.Z)(this,y)),d&&x.setPayments(this.calculatePayments(g,o,n,p)).setpaid(!1),o&&i&&x.setpaid(!1).setPayments([{number:1,amount:g,date:n,paid:!0}]),x.setId(Date.now()),b.unshift(x.getObjectData(!0)),Z.setExpenses(b);try{return await(0,a.Z)(this,m).updateAccount(Z.getObjectData(),Z.getId()),(0,a.Z)(this,m).updateAccountToLocal(Z.getObjectData(),Z.getId()),(0,a.Z)(this,f).updateVersion(),"Agregado correctamente"}catch(w){console.error(w)}}async paidExpense(t,e,s,n){s&&(s=u.P.getCurrentDate());const i=c.Z.state.accountsStore.accountSelected,o=c.Z.state.expensesStore.currentPeriod,r=i.expenses;if(r.forEach(((n,a)=>{n.id===t.id&&(t.fixed?s?r[a].payments.push({date:o,paid:!0,amount:n.amount}):r[a].payments.splice(e,1):t.repeat?r[a].payments[e].paid=s:r[a].paid=s)})),t.product){const e=n.findIndex((e=>e.id===t.product.id));if(-1!==e){const i=n[e],r="credit"===t.type?"debit":"credit";if(s)(0,a.Z)(this,Z).addExpense(t.amount,t.description,t.category,o,r,i,t.id);else{const e=i.expenses.findIndex((e=>e.idAccount===t.id));-1!==e&&(0,a.Z)(this,Z).deleteExpense(i.expenses[e],i)}}}i.setExpenses(r);try{return await(0,a.Z)(this,m).updateAccount(i.getObjectData(),i.getId()),(0,a.Z)(this,m).updateAccountToLocal(i.getObjectData(),i.getId()),(0,a.Z)(this,f).updateVersion(),!0}catch(d){console.error(d)}}async editExpense(t,e,s,n,i,o,r,d,p,l,g,y){const Z=s.replaceAll(".",""),b=c.Z.state.accountsStore.accountSelected,x=c.Z.state.expensesStore.currentPeriod,w=b.expenses;w.forEach(((e,s)=>{if(e.id===t.id){if(t.description=n,t.category=i.getObjectData?i.getObjectData(!0):i,t.date=o,t.product=y&&y.getObjectData?y.getObjectData(!0):null,r||p){let e=t.editList,s=u.P.getFirstDay(x);g&&(s=u.P.getFirstDay(o));const n={date:s,amount:Z};if(g)e=[],e.push(n);else{const t=e.findIndex((t=>t.date===s));-1!==t?e[t]=n:e.push(n)}const a=[];e.forEach((t=>{h()(t.date).isSameOrBefore(s)&&a.push(t)})),t.editList=a}if(p&&l!==t.times){const e=t.payments;t.repeatTimes=l;const s=this.calculatePayments(Z,!1,o,l);s.forEach(((t,n)=>{const a=u.P.getFirstDay(t.date),i=u.P.getLastDay(t.date),o=e.findIndex((t=>h()(t.date).isBetween(a,i,void 0,"[]")));-1!==o&&(s[n].paid=e[o].paid)})),t.payments=s}p||r||(t.amount=Z),w[s]=t}})),b.setExpenses(w);try{await(0,a.Z)(this,m).updateAccount(b.getObjectData(),b.getId()),(0,a.Z)(this,m).updateAccountToLocal(b.getObjectData(),b.getId()),(0,a.Z)(this,f).updateVersion()}catch(D){console.error(D)}}async deleteExpense(t,e){const s=c.Z.state.accountsStore.accountSelected,n=c.Z.state.expensesStore.currentPeriod,i=s.expenses,o=i.findIndex((e=>e.id===t.id));e?i.splice(o,1):(t.paid=n,i[o]=t),s.setExpenses(i);try{return await(0,a.Z)(this,m).updateAccount(s.getObjectData(),s.getId()),(0,a.Z)(this,m).updateAccountToLocal(s.getObjectData(),s.getId()),(0,a.Z)(this,f).updateVersion(),!0}catch(r){console.error(r)}}calculatePayments(t,e,s,n){const a=[{number:0,amount:t,date:s,paid:e}];let i=s;for(let o=0;o<n;o++){const e=u.P.sumMonths(i,1);a.push({number:o+1,amount:t,date:e,paid:!1}),i=e}return a}}},1160:function(t,e,s){s.d(e,{Z:function(){return a}});var n=s(8935);class a{notify(t){return n["default"].swal(t)}confirm(t,e="Confirmación!"){return n["default"].swal({title:e,text:t,type:"warning",showCancelButton:!0,confirmButtonText:"Aceptar",reverseButtons:!0})}selectOption(t,e,s="Seleccione una opción",a="#d51212",i="#4caf50"){return n["default"].swal({title:s,type:"",showDenyButton:!0,showCancelButton:!0,confirmButtonColor:a,confirmButtonText:t,denyButtonText:e,denyButtonColor:i,cancelButtonText:"Cancelar"})}}}}]);
//# sourceMappingURL=accounts.2f6d07fd.js.map