"use strict";(self["webpackChunkgestor_gastos"]=self["webpackChunkgestor_gastos"]||[]).push([[788],{1550:function(t,e,a){a.r(e),a.d(e,{default:function(){return F}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("title-general",{attrs:{title:t.title,backRoute:"/"}}),a("div",{staticClass:"l-content px-3"},[a("div",{staticClass:"l-list l-list--form"},[a("input-general",{attrs:{label:"Valor*",validate:t.validate,isNumber:!0,max:11,pattern:"/d*"},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}}),a("input-general",{attrs:{label:"Descripción*",validate:t.validate,max:25},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),a("select-category",{attrs:{validate:t.validate},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}}),a("select-date",{model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("select-product",{staticClass:"mb-4",model:{value:t.product,callback:function(e){t.product=e},expression:"product"}}),a("switch-checkbox",{staticClass:"mb-3",attrs:{label:"Realizado",disabled:!!t.id},model:{value:t.paid,callback:function(e){t.paid=e},expression:"paid"}}),a("switch-checkbox",{staticClass:"mb-3",attrs:{label:"Es fijo",disabled:t.repeat||!!t.id},model:{value:t.fixedExpense,callback:function(e){t.fixedExpense=e},expression:"fixedExpense"}}),a("switch-checkbox",{staticClass:"mb-1",attrs:{label:"Repetir",disabled:t.fixedExpense||!!t.id},model:{value:t.repeat,callback:function(e){t.repeat=e},expression:"repeat"}}),t.repeat&&t.date?a("repeat-expense",{attrs:{date:t.date,validate:t.validate},model:{value:t.times,callback:function(e){t.times=e},expression:"times"}}):t._e(),a("div",{staticClass:"button-container"},[a("button",{staticClass:"btn button-color-general mr-1 w-50",on:{click:function(e){return t.save()}}},[t._v("Guardar")]),a("button",{staticClass:"btn button-white ml-1 w-50",on:{click:function(e){return t.cancel()}}},[t._v("Cancelar")])])],1)])],1)},i=[],n=a(3727),o=a(9597),r=a(4216),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-items-center justify-content-between border-bottom pb-2"},[a("label",[t._v(t._s(t.label))]),a("b-form-checkbox",{attrs:{size:"lg",name:"check-button",switch:"",disabled:t.disabled},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}})],1)},l=[],d={name:"SwitchCheckbox",props:{label:{type:String,default:""},value:{type:[Boolean,String],default:!1},validate:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},data(){return{checked:this.value}},watch:{checked(t){this.$emit("input",t)},value(t){this.checked=t}}},u=d,p=a(1001),h=(0,p.Z)(u,c,l,!1,null,null,null),m=h.exports,v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ml-3"},[a("div",{staticClass:"d-flex align-items-center"},[a("p",{staticClass:"text-medium mr-2 mb-0"},[t._v("Durante")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.times,expression:"times"}],staticClass:"form-control input-sm",attrs:{type:"text",maxlength:"2"},domProps:{value:t.times},on:{input:function(e){e.target.composing||(t.times=e.target.value)}}}),a("p",{staticClass:"text-medium ml-2 mb-0"},[t._v("Meses")])]),a("p",{staticClass:"gray-sm-text pt-2"},[t._v("Se repite hasta: "+t._s(t.finishDate)+" ")]),a("valid-alert",{attrs:{dataValue:t.times,validate:t.validate}})],1)},f=[],g=a(4511),x=a(4256),y={components:{validAlert:x.Z},name:"RepeatExpense",props:{date:{type:String},validate:{type:Boolean,default:!1},value:{type:[String,Number],default:""}},data(){return{times:this.value,dateFisnish:""}},watch:{times(t){this.dateFisnish=g.P.sumMonths(this.date,t),this.$emit("input",t)},date(){this.dateFisnish=g.P.sumMonths(this.date,this.times)},value(t){this.times=t}},computed:{finishDate(){return g.P.formatDate(this.dateFisnish)}},created(){this.dateFisnish=g.P.sumMonths(this.date,this.times)}},b=y,C=(0,p.Z)(b,v,f,!1,null,null,null),w=C.exports,S=a(1160),Z=a(6412),_=a(1670),k=a(4665),D=a(7133),E=a.n(D),P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("label",[t._v("Cuenta")]),a("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeDiv,expression:"closeDiv"}],staticClass:"position-relative border-bottom mt-2"},[t.product?a("div",{staticClass:"d-flex align-items-center cursor-pointer",on:{click:function(e){return t.changeShow()}}},[a("div",{staticClass:"icon-category icon-category--small"},[a("b-icon",{style:{color:t.product.iconColor},attrs:{icon:t.product.icon}})],1),a("p",{staticClass:"ml-2 text-medium"},[t._v(t._s(t.product.name))])]):a("p",{staticClass:"cursor-pointer o-select__text text-medium",on:{click:function(e){return t.changeShow()}}},[t._v("¿Está asociado a una cuenta? Seleccionela aquí")]),t.show?a("div",{staticClass:"o-select"},[a("div",{staticClass:"o-select__item",attrs:{value:""},on:{click:function(e){return t.selectProduct("")}}},[a("p",{staticClass:"ml-2 text-medium"},[t._v("Ninguna")])]),t._l(t.products,(function(e){return a("div",{key:e.getId(),staticClass:"o-select__item",attrs:{value:e.getId()},on:{click:function(a){return t.selectProduct(e)}}},[a("div",{staticClass:"d-flex align-items-center"},[a("div",{staticClass:"icon-category icon-category--small"},[a("b-icon",{style:{color:e.iconColor},attrs:{icon:e.icon}})],1),a("p",{staticClass:"ml-2 text-medium"},[t._v(t._s(e.name))])])])}))],2):t._e()])])},B=[],I={name:"SelectProduct",props:{value:{type:[String,Number,Object],default:""}},data(){return{product:this.value,show:!1}},watch:{product(t){this.$emit("input",t)},value(t){this.product=t}},computed:{...(0,k.rn)("productsStore",["products"])},methods:{closeDiv(){this.show=!1},changeShow(){this.show=!this.show},selectProduct(t){this.product=t,this.closeDiv()}}},O=I,A=(0,p.Z)(O,P,B,!1,null,null,null),T=A.exports,j=a(5099);const $=new Z.Z(new _.Z);var L={name:"AddExpense",components:{InputGeneral:n.Z,SelectCategory:o.Z,SelectDate:r.Z,SwitchCheckbox:m,RepeatExpense:w,SelectProduct:T,TitleGeneral:j.Z},data(){return{amount:"",description:"",category:"",date:"",fixedExpense:!1,paid:!1,repeat:!1,times:1,validate:!1,id:"",product:""}},watch:{currentPeriod(t){this.date=t}},computed:{validData(){const t=!this.repeat||this.repeat&&this.times;return this.amount&&this.description&&this.category&&this.date&&t},title(){const t=this.id?"Editar":"Agregar";return"credit"===this.type?`${t} Gasto`:`${t} Ingreso`},...(0,k.rn)("expensesStore",["type","currentPeriod","expenseSelected","editExpense"])},methods:{async save(){this.validate=!0;let t="";if(this.validData){if(this.id)if(this.expenseSelected.fixed||this.expenseSelected.repeat){const e=await(new S.Z).selectOption("Todos","Los próximos","El cambio desea aplicarlos para: ");(e.isConfirmed||e.isDenied)&&(t=await this.updateExpense(e.isConfirmed))}else t=await this.updateExpense();else g.P.startLoading(),t=await $.addExpense(this.amount,this.description,this.category,this.date,this.fixedExpense,this.paid,this.repeat,this.times,this.type,this.product),this.clear();g.P.stopLoading(),t&&await(new S.Z).notify(t),this.$router.push("/")}},async updateExpense(t){g.P.startLoading();const e=this.expenseSelected;e.id=this.id;const a=await $.editExpense(e,this.indexPayment,this.amount,this.description,this.category,this.date,this.fixedExpense,this.paid,this.repeat,this.times,t,this.product);let s=this.editExpense;return s++,this.setEditExpense(s),a},clear(){this.amount="",this.description="",this.category="",this.currentDate(),this.fixedExpense=!1,this.paid=!1,this.repeat=!1,this.times=1,this.validate=!1,this.id="",this.product="",this.setExpenseSelected(null),this.setIndexPaymentSelected(-1)},cancel(){this.clear(),this.$router.push("/")},currentDate(){this.date=this.currentPeriod},fillData(){this.expenseSelected&&(this.id=this.expenseSelected.id,this.amount=this.setAmount(this.expenseSelected),this.description=this.expenseSelected.description,this.category=this.expenseSelected.category,this.date=this.expenseSelected.date,this.fixedExpense=this.expenseSelected.fixed,this.paid=this.expenseSelected.paid,this.repeat=this.expenseSelected.repeat,this.times=this.expenseSelected.repeatTimes,this.product=this.expenseSelected.product)},openModal(){this.currentDate(),this.fillData()},setAmount(t){const e=g.P.getFirstDay(this.currentPeriod),a=g.P.getLastDay(this.currentPeriod);let s=-1;(t.repeat||t.fixed)&&(s=t.payments.findIndex((t=>E()(t.date).isBetween(e,a,void 0,"[]"))));let i=t.amount;return t.repeat&&(-1!==s&&(i=t.payments[s].amount),t.editList.length>0&&t.editList.forEach((t=>{E()(g.P.getFirstDay(t.date)).isSameOrBefore(e)&&(i=t.amount)}))),t.fixed&&(-1!==s&&(i=t.payments[s].amount),t.editList.length>0&&t.editList.forEach((t=>{E()(g.P.getFirstDay(t.date)).isSameOrBefore(e)&&(i=t.amount)}))),i},...(0,k.OI)("expensesStore",["setExpenseSelected","setIndexPaymentSelected","setEditExpense"])},created(){this.openModal()},beforeDestroy(){this.cancel()}},N=L,R=(0,p.Z)(N,s,i,!1,null,null,null),F=R.exports},9597:function(t,e,a){a.d(e,{Z:function(){return u}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("label",[t._v("Categoría*")]),a("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeDiv,expression:"closeDiv"}],staticClass:"position-relative border-bottom mt-2"},[t.category?a("div",{staticClass:"d-flex align-items-center cursor-pointer",on:{click:function(e){return t.changeShow()}}},[a("div",{staticClass:"icon-category icon-category--small",style:{backgroundColor:t.category.backgroundColor}},[a("b-icon",{style:{color:t.category.iconColor},attrs:{icon:t.category.icon}})],1),a("p",{staticClass:"ml-2 text-medium"},[t._v(t._s(t.category.detail))])]):a("p",{staticClass:"cursor-pointer o-select__text text-medium",on:{click:function(e){return t.changeShow()}}},[t._v("Seleccione aqui una categoría...")]),t.show?a("div",{staticClass:"o-select"},t._l(t.categories,(function(e){return a("div",{key:e.getId(),staticClass:"o-select__item",attrs:{value:e.getId()},on:{click:function(a){return t.selectCategory(e)}}},[a("div",{staticClass:"d-flex align-items-center"},[a("div",{staticClass:"icon-category icon-category--small",style:{backgroundColor:e.backgroundColor}},[a("b-icon",{style:{color:e.iconColor},attrs:{icon:e.icon}})],1),a("p",{staticClass:"ml-2 text-medium"},[t._v(t._s(e.detail))])])])})),0):t._e()]),a("valid-alert",{attrs:{"data-value":t.category,validate:t.validate}})],1)},i=[],n=a(4256),o=a(4665),r={name:"SelectCategory",components:{validAlert:n.Z},props:{validate:{type:Boolean,default:!1},value:{type:[String,Number,Object],default:""}},data(){return{category:this.value,show:!1}},watch:{category(t){this.$emit("input",t)},value(t){this.category=t}},computed:{...(0,o.rn)("categoriesStore",["categories"])},methods:{closeDiv(){this.show=!1},changeShow(){this.show=!this.show},selectCategory(t){this.category=t,this.closeDiv()}}},c=r,l=a(1001),d=(0,l.Z)(c,s,i,!1,null,null,null),u=d.exports},3727:function(t,e,a){a.d(e,{Z:function(){return u}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mb-1"},[a("label",[t._v(t._s(t.label))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"form-control",class:t.customClass,attrs:{type:"text",maxlength:t.max,pattern:t.pattern},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),a("valid-alert",{attrs:{"data-value":t.text,validate:t.validate}})],1)},i=[],n=a(4511),o=a(4256),r={name:"InputGeneral",components:{validAlert:o.Z},props:{label:{type:String,default:""},value:{type:[String,Number],default:""},customClass:{type:String,default:""},max:{type:Number,default:100},isNumber:{type:Boolean,default:!1},pattern:{type:String,default:""},validate:{type:Boolean,default:!1}},data(){return{text:this.value}},watch:{text(t){this.isNumber&&(this.text=n.P.onlyNumber(t)),this.$emit("input",this.text)},value(t){this.text=t}}},c=r,l=a(1001),d=(0,l.Z)(c,s,i,!1,null,null,null),u=d.exports},4216:function(t,e,a){a.d(e,{Z:function(){return d}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("label",{attrs:{for:"datepicker"}},[t._v("Fecha*")]),a("div",{staticClass:"border-bottom"},[a("b-form-datepicker",{attrs:{id:"datepicker",locale:"es",placeholder:"Seleccione fecha","date-format-options":{year:"numeric",month:"short",day:"2-digit"}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),a("valid-alert",{attrs:{dataValue:t.date,validate:t.validate}})],1)},i=[],n=a(4256),o={name:"SelectDate",components:{validAlert:n.Z},props:{value:{type:[String,Number],default:""},validate:{type:Boolean,default:!1}},data(){return{date:this.value}},watch:{date(t){this.$emit("input",t)},value(t){this.date=t}}},r=o,c=a(1001),l=(0,c.Z)(r,s,i,!1,null,null,null),d=l.exports},5099:function(t,e,a){a.d(e,{Z:function(){return l}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"l-title",class:t.addClass},[a("h2",{staticClass:"main-title"},[t._v(t._s(t.title))]),t.backRoute?a("button",{staticClass:"btn back-arrow",on:{click:function(e){return t.goToRoute(t.backRoute)}}},[a("b-icon",{attrs:{icon:"arrow-left"}})],1):t._e(),t.addButtonRoute?a("button",{staticClass:"btn btn-block button-rounded button-big button-outline-color-general",on:{click:function(e){return t.goToRoute(t.addButtonRoute)}}},[t._v("+")]):t._e(),t.addButtonFunction?a("button",{staticClass:"btn btn-block button-rounded button-big button-outline-color-general",on:{click:function(e){return t.addButtonFunction()}}},[t._v("+")]):t._e()])},i=[],n={name:"TitleGeneral",props:{title:{type:String,default:""},backRoute:{type:String,default:""},addButtonRoute:{type:String,default:""},addButtonFunction:{type:Function}},computed:{addClass(){return this.backRoute?"l-title-back":""}},methods:{goToRoute(t){this.$router.push(t)}}},o=n,r=a(1001),c=(0,r.Z)(o,s,i,!1,null,null,null),l=c.exports},4256:function(t,e,a){a.d(e,{Z:function(){return l}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"valid-alert"},[!t.validate||t.dataValue.toString().trim()&&0!==t.dataValue?t._e():a("p",{staticClass:"text-danger"},[t._v(t._s(t.message))])])},i=[],n={name:"validAlert",props:{message:{type:String,default:"Campo obligatorio"},dataValue:{type:[String,Number,Object],default:""},validate:{type:Boolean,default:!1}}},o=n,r=a(1001),c=(0,r.Z)(o,s,i,!1,null,null,null),l=c.exports},6412:function(t,e,a){a.d(e,{Z:function(){return y}});var s=a(103),i=a(1669),n=a(198),o=a(3796);class r{constructor(t,e,a,s,i,n,r,c,l,d){(0,o.Z)(this,"id",""),(0,o.Z)(this,"amount",0),(0,o.Z)(this,"description",""),(0,o.Z)(this,"category",{}),(0,o.Z)(this,"date",""),(0,o.Z)(this,"paid",!1),(0,o.Z)(this,"fixed",!1),(0,o.Z)(this,"repeat",!1),(0,o.Z)(this,"repeatTimes",!1),(0,o.Z)(this,"payments",[]),(0,o.Z)(this,"type","credit"),(0,o.Z)(this,"editList",[]),(0,o.Z)(this,"product",null),this.amount=t.replace(".",""),this.description=e,this.category=a,this.date=s,this.paid=n,this.fixed=i,this.repeat=r,this.repeatTimes=c,this.type=l,this.product=d}static fromJSONResponse(t,e){const a=new r(t.amount,t.description,t.category,t.date,t.fixed,t.paid,t.repeat,t.repeatTimes,t.type,t.product);return e&&a.setId(e),a}getId(){return this.id}setId(t){return this.id=t,this}getAmount(){return this.amount}getDescription(){return this.description}getCategory(){return this.category}getDate(){return this.date}isCredit(){return"credit"===this.type}isPaid(){return this.paid}setpaid(t){return this.paid=t,this}isFixed(){return this.fixed}isRepeat(){return this.repeat}getRepeatTimes(){return this.repeatTimes}setUser(t){return this.user=t,this}getPayments(){return this.payments}setPayments(t){return this.payments=t,this}getObjectData(t){const e={amount:this.amount.toString().replace(".",""),description:this.description,category:this.category.getObjectData(!0),date:this.date,paid:this.paid,fixed:this.fixed,repeat:this.repeat,user:this.user,type:this.type,product:null};return this.product&&(e.product=this.product.getObjectData(!0)),this.repeat&&(e.repeatTimes=this.repeatTimes),(this.fixed||this.repeat)&&(e.payments=this.payments,e.editList=this.editList),t&&(e.id=this.id),e}}var c=a(9554),l=a(4511),d=a(1670),u=a(9767),p=a(7133),h=a.n(p),m=a(1803),v=new WeakMap,f=new WeakMap,g=new WeakMap,x=new WeakMap;class y{constructor(){(0,s.Z)(this,v,{writable:!0,value:void 0}),(0,s.Z)(this,f,{writable:!0,value:void 0}),(0,s.Z)(this,g,{writable:!0,value:void 0}),(0,s.Z)(this,x,{writable:!0,value:void 0});let t=JSON.parse(localStorage.getItem("currentUser"));t=t.email,(0,n.Z)(this,v,new d.Z(t)),(0,n.Z)(this,f,new u.Z(t)),(0,n.Z)(this,x,new m.Z),(0,n.Z)(this,g,t)}async addExpense(t,e,a,s,n,o,d,u,p,h){const m=t.replaceAll(".",""),x=c.Z.state.accountsStore.accountSelected,y=x.expenses;o&&(o=l.P.getCurrentDate());const b=new r(m,e,a,s,n,o,d,u,p,h);b.setUser((0,i.Z)(this,g)),d&&b.setPayments(this.calculatePayments(m,o,s,u)).setpaid(!1),o&&n&&b.setpaid(!1).setPayments([{number:1,amount:m,date:s,paid:!0}]),b.setId(Date.now()),y.unshift(b.getObjectData(!0)),x.setExpenses(y);try{return await(0,i.Z)(this,v).updateAccount(x.getObjectData(),x.getId()),(0,i.Z)(this,v).updateAccountToLocal(x.getObjectData(),x.getId()),(0,i.Z)(this,f).updateVersion(),"Agregado correctamente"}catch(C){console.error(C)}}async paidExpense(t,e,a,s){a&&(a=l.P.getCurrentDate());const n=c.Z.state.accountsStore.accountSelected,o=c.Z.state.expensesStore.currentPeriod,r=n.expenses;if(r.forEach(((s,i)=>{s.id===t.id&&(t.fixed?a?r[i].payments.push({date:o,paid:!0,amount:s.amount}):r[i].payments.splice(e,1):t.repeat?r[i].payments[e].paid=a:r[i].paid=a)})),t.product){const e=s.findIndex((e=>e.id===t.product.id));if(-1!==e){const n=s[e],r="credit"===t.type?"debit":"credit";if(a)(0,i.Z)(this,x).addExpense(t.amount,t.description,t.category,o,r,n,t.id);else{const e=n.expenses.findIndex((e=>e.idAccount===t.id));-1!==e&&(0,i.Z)(this,x).deleteExpense(n.expenses[e],n)}}}n.setExpenses(r);try{return await(0,i.Z)(this,v).updateAccount(n.getObjectData(),n.getId()),(0,i.Z)(this,v).updateAccountToLocal(n.getObjectData(),n.getId()),(0,i.Z)(this,f).updateVersion(),!0}catch(d){console.error(d)}}async editExpense(t,e,a,s,n,o,r,d,u,p,m,g){const x=a.replaceAll(".",""),y=c.Z.state.accountsStore.accountSelected,b=c.Z.state.expensesStore.currentPeriod,C=y.expenses;C.forEach(((e,a)=>{if(e.id===t.id){if(t.description=s,t.category=n.getObjectData?n.getObjectData(!0):n,t.date=o,t.product=g&&g.getObjectData?g.getObjectData(!0):null,r||u){let e=t.editList,a=l.P.getFirstDay(b);m&&(a=l.P.getFirstDay(o));const s={date:a,amount:x};if(m)e=[],e.push(s);else{const t=e.findIndex((t=>t.date===a));-1!==t?e[t]=s:e.push(s)}const i=[];e.forEach((t=>{h()(t.date).isSameOrBefore(a)&&i.push(t)})),t.editList=i}if(u&&p!==t.times){const e=t.payments;t.repeatTimes=p;const a=this.calculatePayments(x,!1,o,p);a.forEach(((t,s)=>{const i=l.P.getFirstDay(t.date),n=l.P.getLastDay(t.date),o=e.findIndex((t=>h()(t.date).isBetween(i,n,void 0,"[]")));-1!==o&&(a[s].paid=e[o].paid)})),t.payments=a}u||r||(t.amount=x),C[a]=t}})),y.setExpenses(C);try{await(0,i.Z)(this,v).updateAccount(y.getObjectData(),y.getId()),(0,i.Z)(this,v).updateAccountToLocal(y.getObjectData(),y.getId()),(0,i.Z)(this,f).updateVersion()}catch(w){console.error(w)}}async deleteExpense(t,e){const a=c.Z.state.accountsStore.accountSelected,s=c.Z.state.expensesStore.currentPeriod,n=a.expenses,o=n.findIndex((e=>e.id===t.id));e?n.splice(o,1):(t.paid=s,n[o]=t),a.setExpenses(n);try{return await(0,i.Z)(this,v).updateAccount(a.getObjectData(),a.getId()),(0,i.Z)(this,v).updateAccountToLocal(a.getObjectData(),a.getId()),(0,i.Z)(this,f).updateVersion(),!0}catch(r){console.error(r)}}calculatePayments(t,e,a,s){const i=[{number:0,amount:t,date:a,paid:e}];let n=a;for(let o=0;o<s;o++){const e=l.P.sumMonths(n,1);i.push({number:o+1,amount:t,date:e,paid:!1}),n=e}return i}}},1160:function(t,e,a){a.d(e,{Z:function(){return i}});var s=a(8935);class i{notify(t){return s["default"].swal(t)}confirm(t,e="Confirmación!"){return s["default"].swal({title:e,text:t,type:"warning",showCancelButton:!0,confirmButtonText:"Aceptar",reverseButtons:!0})}selectOption(t,e,a="Seleccione una opción",i="#d51212",n="#4caf50"){return s["default"].swal({title:a,type:"",showDenyButton:!0,showCancelButton:!0,confirmButtonColor:i,confirmButtonText:t,denyButtonText:e,denyButtonColor:n,cancelButtonText:"Cancelar"})}}}}]);
//# sourceMappingURL=add-expense.2cde29f0.js.map