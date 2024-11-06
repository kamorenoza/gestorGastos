"use strict";(self["webpackChunkgestor_gastos"]=self["webpackChunkgestor_gastos"]||[]).push([[804],{8730:function(t,o,e){e.r(o),e.d(o,{default:function(){return f}});var a=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("title-general",{attrs:{title:t.title,backRoute:"/categories"}}),e("div",{staticClass:"l-content"},[e("div",{staticClass:"l-list"},[e("input-general",{attrs:{label:"Nombre de la categoría",validate:t.validate,max:15},model:{value:t.detail,callback:function(o){t.detail=o},expression:"detail"}}),e("icon-modal",{model:{value:t.icon,callback:function(o){t.icon=o},expression:"icon"}}),e("icon-detail",{attrs:{icon:t.icon,iconColor:t.iconColor,validate:t.validate,backgroundColor:t.backgroundColor}}),t.icon?e("color-modal",{attrs:{idModal:"color-modal"},model:{value:t.iconColor,callback:function(o){t.iconColor=o},expression:"iconColor"}}):t._e(),t.icon?e("color-modal",{attrs:{idModal:"background-modal",title:"Colo del fondo"},model:{value:t.backgroundColor,callback:function(o){t.backgroundColor=o},expression:"backgroundColor"}}):t._e(),e("div",[e("button",{staticClass:"btn button-color-general btn-block",on:{click:function(o){return t.save()}}},[t._v("Guardar")])])],1)])],1)},i=[],l=e(7746),r=e(1160),c=e(4665),n=e(5099),s=e(4511),d=e(3727),u=e(1654),g=e(4998),h=e(761);const C=new l.Z;var b={name:"CategoriesForm",components:{TitleGeneral:n.Z,InputGeneral:d.Z,IconModal:u.Z,ColorModal:g.Z,IconDetail:h.Z},data(){return{detail:"",icon:"",backgroundColor:"",iconColor:"",validate:!1,id:""}},watch:{icon(){this.iconColor&&this.backgroundColor||(this.backgroundColor="#FFFFFF",this.iconColor="#000000")}},computed:{validData(){return""!==this.icon.trim()&&""!==this.detail.trim()},title(){return this.id?"Editar categoría":"Nueva categoría"},...(0,c.rn)("categoriesStore",["categorySelected"])},methods:{clear(t){!t&&this.id||(this.detail=this.iconColor=this.icon=this.backgroundColor=this.id="",this.setCategorySelected(null)),this.validate=!1},async save(){if(this.validate=!0,this.validData){s.P.startLoading();const t=await C.saveCategory(this.detail,this.icon,this.iconColor,this.backgroundColor,this.id);await this.setCategories(await C.getCategories()),this.clear(),s.P.stopLoading(),await(new r.Z).notify(t),this.$router.push("/categories")}},loadData(){null!==this.categorySelected&&(this.detail=this.categorySelected.getDetail(),this.icon=this.categorySelected?.getIcon(),this.iconColor=this.categorySelected.getIconColor(),this.backgroundColor=this.categorySelected.getBackgroundColor(),this.id=this.categorySelected.getId())},...(0,c.OI)("categoriesStore",["setCategories","setCategorySelected"])},created(){this.loadData()},beforeDestroy(){this.clear(!0)}},v=b,k=e(1001),m=(0,k.Z)(v,a,i,!1,null,null,null),f=m.exports}}]);
//# sourceMappingURL=save-category.cdd08858.js.map