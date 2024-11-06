"use strict";(self["webpackChunkgestor_gastos"]=self["webpackChunkgestor_gastos"]||[]).push([[179],{46412:function(t,e,n){n.d(e,{Z:function(){return p}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("label",[t._v("Categoría*")]),n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeDiv,expression:"closeDiv"}],staticClass:"position-relative border-bottom mt-2"},[t.category?n("div",{staticClass:"d-flex align-items-center cursor-pointer",on:{click:function(e){return t.changeShow()}}},[n("div",{staticClass:"icon-category icon-category--small",style:{backgroundColor:t.category.backgroundColor}},[n("b-icon",{style:{color:t.category.iconColor},attrs:{icon:t.category.icon}})],1),n("p",{staticClass:"ml-2 text-medium"},[t._v(t._s(t.category.detail))])]):n("p",{staticClass:"cursor-pointer o-select__text text-medium",on:{click:function(e){return t.changeShow()}}},[t._v("Seleccione aqui una categoría...")]),t.show?n("div",{staticClass:"o-select"},t._l(t.categories,(function(e){return n("div",{key:e.getId(),staticClass:"o-select__item",attrs:{value:e.getId()},on:{click:function(n){return t.selectCategory(e)}}},[n("div",{staticClass:"d-flex align-items-center"},[n("div",{staticClass:"icon-category icon-category--small",style:{backgroundColor:e.backgroundColor}},[n("b-icon",{style:{color:e.iconColor},attrs:{icon:e.icon}})],1),n("p",{staticClass:"ml-2 text-medium"},[t._v(t._s(e.detail))])])])})),0):t._e()]),n("valid-alert",{attrs:{"data-value":t.category,validate:t.validate}})],1)},s=[],o=n(4367),r=(n(9653),n(74256)),i=n(34665),c={name:"SelectCategory",components:{validAlert:r.Z},props:{validate:{type:Boolean,default:!1},value:{type:[String,Number,Object],default:""}},data:function(){return{category:this.value,show:!1}},watch:{category:function(t){this.$emit("input",t)},value:function(t){this.category=t}},computed:(0,o.Z)({},(0,i.rn)("categoriesStore",["categories"])),methods:{closeDiv:function(){this.show=!1},changeShow:function(){this.show=!this.show},selectCategory:function(t){this.category=t,this.closeDiv()}}},l=c,u=n(1001),d=(0,u.Z)(l,a,s,!1,null,null,null),p=d.exports},43560:function(t,e,n){n.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"summary d-flex align-items-center mb-2"},[n("div",{staticClass:"d-flex align-items-center w-50"},[n("b-icon",{staticClass:"text-success mx-2",attrs:{"font-scale":1.4,icon:"arrow-up-circle-fill"}}),n("div",[n("p",{staticClass:"gray-xs-text"},[t._v("Ingresos")]),n("p",{staticClass:"text-success text-book"},[t._v("$ "+t._s(t._f("formatNumber")(t.incomes)))])])],1),n("div",{staticClass:"d-flex align-items-center border-left w-50 pl-2"},[n("b-icon",{staticClass:"text-danger mx-2",attrs:{"font-scale":1.3,icon:"arrow-down-circle-fill"}}),n("div",[n("p",{staticClass:"gray-xs-text"},[t._v("Gastos")]),n("p",{staticClass:"text-danger text-book"},[t._v("$ "+t._s(t._f("formatNumber")(t.expenses)))])])],1)])},s=[],o=(n(9653),{name:"AccountsSummary",props:{expenses:{type:Number,default:0},incomes:{type:Number,default:0}}}),r=o,i=n(1001),c=(0,i.Z)(r,a,s,!1,null,null,null),l=c.exports},52434:function(t,e,n){n.r(e),n.d(e,{default:function(){return F}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("title-general",{attrs:{title:t.productSelected.getName(),backRoute:"/products",addButtonFunction:t.addExpense}}),n("div",{staticClass:"l-content"},[n("expenses-per-product",{attrs:{product:t.productSelected}}),n("add-product-expense")],1)],1)},s=[],o=n(67906),r=n(16198),i=n(4367),c=n(25099),l=n(34665),u=n(1160),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-modal",{attrs:{id:"add-expense-product-modal","hide-footer":"","hide-header":"",centered:"","no-close-on-backdrop":"","no-close-on-esc":""},on:{show:t.openModal,hide:t.clear}},[n("p",{staticClass:"text-center text-book"},[t._v(t._s(t.title)+" ")]),n("input-general",{attrs:{label:"Valor",validate:t.validate,isNumber:!0},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}}),n("input-general",{attrs:{label:"Descripción",validate:t.validate},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),n("select-category",{attrs:{validate:t.validate},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}}),n("select-date",{model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),n("div",{staticClass:"mt-3 d-flex align-items-center justify-content-between"},[n("button",{staticClass:"btn button-color-general mr-1 w-50",on:{click:function(e){return t.save()}}},[t._v("Guardar")]),n("button",{staticClass:"btn button-white ml-1 w-50",on:{click:function(e){return t.closeModal()}}},[t._v("Cancelar")])])],1)},p=[],f=(n(82526),n(41817),n(73727)),m=n(74216),v=n(14511),x=n(81803),g=n(46412),h={name:"AddProductExpense",components:{InputGeneral:f.Z,SelectCategory:g.Z,SelectDate:m.Z},data:function(){return{amount:"",description:"",category:"",date:v.P.getCurrentDate(),validate:!1,id:"",uc:new x.Z}},computed:(0,i.Z)({validData:function(){return this.amount&&this.description&&this.category&&this.date},title:function(){var t=this.id?"Editar":"Agregar";return"credit"===this.type?"".concat(t," Gasto"):"".concat(t," Ingreso")}},(0,l.rn)("productsStore",["type","productSelected","expenseProductSelected"])),methods:(0,i.Z)({save:function(){var t=this;return(0,r.Z)((0,o.Z)().mark((function e(){var n;return(0,o.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.validate=!0,n="",!t.validData){e.next=18;break}if(v.P.startLoading(),t.id){e.next=10;break}return e.next=7,t.uc.addExpense(t.amount,t.description,t.category,t.date,t.type);case 7:n=e.sent,e.next=13;break;case 10:return e.next=12,t.uc.editExpense(t.expenseProductSelected,t.amount,t.description,t.category,t.date);case 12:n=e.sent;case 13:if(v.P.stopLoading(),!n){e.next=17;break}return e.next=17,(new u.Z).notify(n);case 17:t.closeModal();case 18:case"end":return e.stop()}}),e)})))()},updateExpense:function(){var t=this;return(0,r.Z)((0,o.Z)().mark((function e(){var n,a;return(0,o.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return v.P.startLoading(),n=t.expenseProductSelected,n.id=t.id,e.next=5,t.uc.editExpense(n,t.amount,t.description,t.category,t.date);case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})))()},clear:function(){this.amount="",this.description="",this.category="",this.validate=!1,this.id="",this.date=v.P.getCurrentDate(),this.setExpenseProductSelected(null)},closeModal:function(){this.clear(),this.$bvModal.hide("add-expense-product-modal")},fillData:function(){this.expenseProductSelected&&(this.id=this.expenseProductSelected.id,this.amount=this.expenseProductSelected.amount,this.description=this.expenseProductSelected.description,this.category=this.expenseProductSelected.category,this.date=this.expenseProductSelected.date)},openModal:function(){this.fillData()}},(0,l.OI)("productsStore",["setExpenseProductSelected"])),mounted:function(){this.openModal()}},b=h,y=n(1001),C=(0,y.Z)(b,d,p,!1,null,null,null),_=C.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"l-list px-4"},[n("product-summary",{attrs:{expenses:t.product.getTotalExpense(),incomes:t.product.getTotalIncome()}}),n("div",{staticClass:"pb-1 border-bottom d-flex align-items-center justify-content-center"},[n("div",{staticClass:"d-flex align-items-center justify-content-center"},[n("div",{staticClass:"action action--sm mr-2 d-flex"},[n("button",{staticClass:"button-action",attrs:{disabled:""}},[n("b-icon",{attrs:{icon:"coin"}})],1)]),n("p",{staticClass:"gray-xs-text mr-1"},[t._v("Saldo total")])]),n("div",{staticClass:"text-center pl-2 mb3"},[n("p",{staticClass:"text-book text-medium"},[t._v("$ "+t._s(t._f("formatNumber")(t.product.getTotalIncome()-t.product.getTotalExpense())))])])]),t._l(t.expensesByDate,(function(e){return n("div",{key:e.date,staticClass:"mt-4"},[n("p",{staticClass:"text-sm text-book mb-3"},[t._v(" "+t._s(t._f("formatDateMonthYear")(e.date))+" ")]),t._l(e.expenses,(function(t){return n("expense-product-row",{key:t.id,attrs:{expense:t}})}))],2)}))],2)},k=[],Z=(n(2707),n(41539),n(54747),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mb-3 pb-2"},[n("div",{staticClass:"d-flex align-items-center"},[n("div",{staticClass:"d-flex align-items-center"},[n("div",{staticClass:"icon-category icon-category--small mr-2",style:{backgroundColor:t.category.backgroundColor}},[n("b-icon",{style:{color:t.category.iconColor},attrs:{icon:t.category.icon}})],1)]),n("div",{staticClass:"w-100"},[n("div",{staticClass:"d-flex align-items-center justify-content-between"},[n("p",{staticClass:"text-book text-capitalize text-medium"},[t._v(t._s(t.expense.description)+" ")]),n("p",{staticClass:"text-book text-sm",class:t.classAmount},[t._v("$ "+t._s(t._f("formatNumber")(t.expense.amount))+" ")])]),n("div",{staticClass:"d-flex align-items-center justify-content-between pt-1"},[n("p",{staticClass:"gray-xs-text"},[t._v(t._s(t._f("formatAllDate")(t.expense.date))+" | "+t._s(t.infoExpense)+" ")]),n("div",{staticClass:"d-flex align-items-center justify-content-between"},[n("button",{staticClass:"button-action button-action--edit ml-3",on:{click:function(e){return t.openModal()}}},[n("b-icon",{attrs:{icon:"pencil"}})],1),n("button",{staticClass:"button-action ml-3 button-action--delete",on:{click:function(e){return t.deleteExpense()}}},[n("b-icon",{attrs:{icon:"trash"}})],1)])])])])])}),S=[],P={name:"ExpenseRow",props:{expense:{type:Object,required:!0}},data:function(){return{uc:new x.Z}},computed:{classAmount:function(){return"credit"===this.expense.type?"text-danger":"text-success"},infoExpense:function(){return"credit"===this.expense.type?"Gasto":"Ingreso"},category:function(){return this.expense.category}},methods:(0,i.Z)({deleteExpense:function(){var t=this;return(0,r.Z)((0,o.Z)().mark((function e(){var n,a,s;return(0,o.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n="credit"===t.expense.type?"gasto":"ingreso",a="Se eliminará el ".concat(n," ¿Está seguro de realizarla?"),e.next=4,(new u.Z).confirm(a);case 4:if(s=e.sent,!s.isConfirmed){e.next=8;break}return e.next=8,t.deleteAll(!0);case 8:case"end":return e.stop()}}),e)})))()},deleteAll:function(t){var e=this;return(0,r.Z)((0,o.Z)().mark((function t(){return(0,o.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return v.P.startLoading(),t.prev=1,t.next=4,e.uc.deleteExpense(e.expense);case 4:v.P.stopLoading(),t.next=11;break;case 7:t.prev=7,t.t0=t["catch"](1),(new u.Z).notify("Ocurrió un error!"),v.P.stopLoading();case 11:case"end":return t.stop()}}),t,null,[[1,7]])})))()},openModal:function(){this.setExpenseProductSelected(this.expense),this.$bvModal.show("add-expense-product-modal")}},(0,l.OI)("productsStore",["setExpenseProductSelected"]))},E=P,D=(0,y.Z)(E,Z,S,!1,null,null,null),B=D.exports,$=n(43560),N=n(17133),T=n.n(N),A={components:{ExpenseProductRow:B,ProductSummary:$.Z},name:"ExpensesPerProduct",props:{product:{type:Object,required:!0}},computed:{expensesByDate:function(){var t=[],e=[],n="",a="",s=this.product;return s.expenses.sort((function(t,e){return new Date(e.date)-new Date(t.date)})),s.expenses.forEach((function(s,o){0===o&&(n=v.P.getFirstDay(s.date),a=v.P.getLastDay(s.date)),T()(s.date).isBetween(n,a,void 0,"[]")||(e.push({date:n,expenses:t}),n=v.P.getFirstDay(s.date),a=v.P.getLastDay(s.date),t=[]),t.push(s)})),e.push({date:n,expenses:t}),s.expenses.length>0?e:[]}}},I=A,R=(0,y.Z)(I,w,k,!1,null,null,null),M=R.exports,j={components:{TitleGeneral:c.Z,AddProductExpense:_,ExpensesPerProduct:M},name:"DetailsAccount",computed:(0,i.Z)({},(0,l.rn)("productsStore",["productSelected"])),methods:(0,i.Z)({addExpense:function(){var t=this;return(0,r.Z)((0,o.Z)().mark((function e(){var n;return(0,o.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(new u.Z).selectOption("Gasto","Ingreso");case 2:n=e.sent,n.isConfirmed?t.setType("credit"):n.isDenied&&t.setType("debit"),(n.isConfirmed||n.isDenied)&&t.$bvModal.show("add-expense-product-modal");case 5:case"end":return e.stop()}}),e)})))()}},(0,l.OI)("productsStore",["setType","setProductSelected"])),created:function(){this.productSelected||this.$router.push("/products")},beforeDestroy:function(){this.setProductSelected(null)}},O=j,G=(0,y.Z)(O,a,s,!1,null,null,null),F=G.exports},73727:function(t,e,n){n.d(e,{Z:function(){return d}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mb-1"},[n("label",[t._v(t._s(t.label))]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"form-control",class:t.customClass,attrs:{type:"text",maxlength:t.max,pattern:t.pattern},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),n("valid-alert",{attrs:{"data-value":t.text,validate:t.validate}})],1)},s=[],o=(n(9653),n(14511)),r=n(74256),i={name:"InputGeneral",components:{validAlert:r.Z},props:{label:{type:String,default:""},value:{type:[String,Number],default:""},customClass:{type:String,default:""},max:{type:Number,default:100},isNumber:{type:Boolean,default:!1},pattern:{type:String,default:""},validate:{type:Boolean,default:!1}},data:function(){return{text:this.value}},watch:{text:function(t){this.isNumber&&(this.text=o.P.onlyNumber(t)),this.$emit("input",this.text)},value:function(t){this.text=t}}},c=i,l=n(1001),u=(0,l.Z)(c,a,s,!1,null,null,null),d=u.exports},74216:function(t,e,n){n.d(e,{Z:function(){return u}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("label",{attrs:{for:"datepicker"}},[t._v("Fecha*")]),n("div",{staticClass:"border-bottom"},[n("b-form-datepicker",{attrs:{id:"datepicker",locale:"es",placeholder:"Seleccione fecha","date-format-options":{year:"numeric",month:"short",day:"2-digit"}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),n("valid-alert",{attrs:{dataValue:t.date,validate:t.validate}})],1)},s=[],o=(n(9653),n(74256)),r={name:"SelectDate",components:{validAlert:o.Z},props:{value:{type:[String,Number],default:""},validate:{type:Boolean,default:!1}},data:function(){return{date:this.value}},watch:{date:function(t){this.$emit("input",t)},value:function(t){this.date=t}}},i=r,c=n(1001),l=(0,c.Z)(i,a,s,!1,null,null,null),u=l.exports},25099:function(t,e,n){n.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"l-title",class:t.addClass},[n("h2",{staticClass:"main-title"},[t._v(t._s(t.title))]),t.backRoute?n("button",{staticClass:"btn back-arrow",on:{click:function(e){return t.goToRoute(t.backRoute)}}},[n("b-icon",{attrs:{icon:"arrow-left"}})],1):t._e(),t.addButtonRoute?n("button",{staticClass:"btn btn-block button-rounded button-big button-outline-color-general",on:{click:function(e){return t.goToRoute(t.addButtonRoute)}}},[t._v("+")]):t._e(),t.addButtonFunction?n("button",{staticClass:"btn btn-block button-rounded button-big button-outline-color-general",on:{click:function(e){return t.addButtonFunction()}}},[t._v("+")]):t._e()])},s=[],o={name:"TitleGeneral",props:{title:{type:String,default:""},backRoute:{type:String,default:""},addButtonRoute:{type:String,default:""},addButtonFunction:{type:Function}},computed:{addClass:function(){return this.backRoute?"l-title-back":""}},methods:{goToRoute:function(t){this.$router.push(t)}}},r=o,i=n(1001),c=(0,i.Z)(r,a,s,!1,null,null,null),l=c.exports},74256:function(t,e,n){n.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"valid-alert"},[!t.validate||t.dataValue.toString().trim()&&0!==t.dataValue?t._e():n("p",{staticClass:"text-danger"},[t._v(t._s(t.message))])])},s=[],o=(n(9653),{name:"validAlert",props:{message:{type:String,default:"Campo obligatorio"},dataValue:{type:[String,Number,Object],default:""},validate:{type:Boolean,default:!1}}}),r=o,i=n(1001),c=(0,i.Z)(r,a,s,!1,null,null,null),l=c.exports},1160:function(t,e,n){n.d(e,{Z:function(){return r}});var a=n(76133),s=n(92751),o=n(28935),r=function(){function t(){(0,a.Z)(this,t)}return(0,s.Z)(t,[{key:"notify",value:function(t){return o["default"].swal(t)}},{key:"confirm",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Confirmación!";return o["default"].swal({title:e,text:t,type:"warning",showCancelButton:!0,confirmButtonText:"Aceptar",reverseButtons:!0})}},{key:"selectOption",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Seleccione una opción",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#d51212",s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#4caf50";return o["default"].swal({title:n,type:"",showDenyButton:!0,showCancelButton:!0,confirmButtonColor:a,confirmButtonText:t,denyButtonText:e,denyButtonColor:s,cancelButtonText:"Cancelar"})}}]),t}()}}]);
//# sourceMappingURL=details-product-legacy.84bd1810.js.map