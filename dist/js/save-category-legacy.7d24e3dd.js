'use strict'; (self.webpackChunkgestor_gastos = self.webpackChunkgestor_gastos || []).push([[804], { 8730: function (t, o, e) { e.r(o), e.d(o, { default: function () { return x } }); const a = function () { const t = this; const o = t.$createElement; const e = t._self._c || o; return e('div', [e('title-general', { attrs: { title: t.title, backRoute: '/categories' } }), e('div', { staticClass: 'l-content' }, [e('div', { staticClass: 'l-list' }, [e('input-general', { attrs: { label: 'Nombre de la categoría', validate: t.validate, max: 15 }, model: { value: t.detail, callback: function (o) { t.detail = o }, expression: 'detail' } }), e('icon-modal', { model: { value: t.icon, callback: function (o) { t.icon = o }, expression: 'icon' } }), e('icon-detail', { attrs: { icon: t.icon, iconColor: t.iconColor, validate: t.validate, backgroundColor: t.backgroundColor } }), t.icon ? e('color-modal', { attrs: { idModal: 'color-modal' }, model: { value: t.iconColor, callback: function (o) { t.iconColor = o }, expression: 'iconColor' } }) : t._e(), t.icon ? e('color-modal', { attrs: { idModal: 'background-modal', title: 'Colo del fondo' }, model: { value: t.backgroundColor, callback: function (o) { t.backgroundColor = o }, expression: 'backgroundColor' } }) : t._e(), e('div', [e('button', { staticClass: 'btn button-color-general btn-block', on: { click: function (o) { return t.save() } } }, [t._v('Guardar')])])], 1)])], 1) }; const i = []; const n = e(67906); const r = e(16198); const l = e(4367); const c = (e(73210), e(27746)); const s = e(1160); const d = e(34665); const u = e(25099); const g = e(14511); const h = e(73727); const C = e(21654); const v = e(84998); const b = e(50761); const f = new c.Z(); const k = { name: 'CategoriesForm', components: { TitleGeneral: u.Z, InputGeneral: h.Z, IconModal: C.Z, ColorModal: v.Z, IconDetail: b.Z }, data: function () { return { detail: '', icon: '', backgroundColor: '', iconColor: '', validate: !1, id: '' } }, watch: { icon: function () { this.iconColor && this.backgroundColor || (this.backgroundColor = '#FFFFFF', this.iconColor = '#000000') } }, computed: (0, l.Z)({ validData: function () { return this.icon.trim() !== '' && this.detail.trim() !== '' }, title: function () { return this.id ? 'Editar categoría' : 'Nueva categoría' } }, (0, d.rn)('categoriesStore', ['categorySelected'])), methods: (0, l.Z)({ clear: function (t) { !t && this.id || (this.detail = this.iconColor = this.icon = this.backgroundColor = this.id = '', this.setCategorySelected(null)), this.validate = !1 }, save: function () { const t = this; return (0, r.Z)((0, n.Z)().mark(function o () { let e; return (0, n.Z)().wrap(function (o) { while (1) switch (o.prev = o.next) { case 0:if (t.validate = !0, !t.validData) { o.next = 17; break } return g.P.startLoading(), o.next = 5, f.saveCategory(t.detail, t.icon, t.iconColor, t.backgroundColor, t.id); case 5:return e = o.sent, o.t0 = t, o.next = 9, f.getCategories(); case 9:return o.t1 = o.sent, o.next = 12, o.t0.setCategories.call(o.t0, o.t1); case 12:return t.clear(), g.P.stopLoading(), o.next = 16, (new s.Z()).notify(e); case 16:t.$router.push('/categories'); case 17:case 'end':return o.stop() } }, o) }))() }, loadData: function () { let t; this.categorySelected !== null && (this.detail = this.categorySelected.getDetail(), this.icon = (t = this.categorySelected) === null || void 0 === t ? void 0 : t.getIcon(), this.iconColor = this.categorySelected.getIconColor(), this.backgroundColor = this.categorySelected.getBackgroundColor(), this.id = this.categorySelected.getId()) } }, (0, d.OI)('categoriesStore', ['setCategories', 'setCategorySelected'])), created: function () { this.loadData() }, beforeDestroy: function () { this.clear(!0) } }; const m = k; const p = e(1001); const Z = (0, p.Z)(m, a, i, !1, null, null, null); var x = Z.exports } }])
// # sourceMappingURL=save-category-legacy.7d24e3dd.js.map
