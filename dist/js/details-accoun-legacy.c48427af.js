"use strict";(self["webpackChunkgestor_gastos"]=self["webpackChunkgestor_gastos"]||[]).push([[133],{29686:function(e,t,n){n.r(t),n.d(t,{default:function(){return S}});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"l-content"},[n("title-general",{attrs:{title:e.accountSelected.getName(),backRoute:"/accounts",addButtonFunction:e.addExpense}}),n("select-period"),n("expenses-per-account",{attrs:{account:e.accountSelected}}),n("add-expense")],1)},c=[],o=n(67906),a=n(16198),r=n(4367),u=n(24559),d=n(25099),i=n(34665),l=n(66312),p=n(1160),f=n(81550),h={components:{ExpensesPerAccount:u.Z,TitleGeneral:d.Z,SelectPeriod:l.Z,AddExpense:f["default"]},name:"DetailsAccount",computed:(0,r.Z)({},(0,i.rn)("accountsStore",["accountSelected"])),methods:(0,r.Z)((0,r.Z)({addExpense:function(){var e=this;return(0,a.Z)((0,o.Z)().mark((function t(){var n;return(0,o.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(new p.Z).selectOption("Gasto","Ingreso");case 2:n=t.sent,n.isConfirmed?e.setType("credit"):n.isDenied&&e.setType("debit"),(n.isConfirmed||n.isDenied)&&e.$bvModal.show("add-expense-modal");case 5:case"end":return t.stop()}}),t)})))()}},(0,i.OI)("expensesStore",["setType"])),(0,i.OI)("accountsStore",["setAccountSelected"])),created:function(){this.accountSelected||this.$router.push("/")}},x=h,Z=n(1001),m=(0,Z.Z)(x,s,c,!1,null,null,null),S=m.exports}}]);
//# sourceMappingURL=details-accoun-legacy.c48427af.js.map