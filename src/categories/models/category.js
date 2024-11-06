export default class Category {
  /**
   * @type {string}
   */
  id = ''
  detail = ''
  icon = ''
  iconColor = ''
  backgroundColor = ''
  user = ''

  constructor (detail, icon, iconColor, backgroundColor) {
    this.detail = detail
    this.icon = icon
    this.iconColor = iconColor
    this.backgroundColor = backgroundColor
  }

  static fromJSONResponse (json, id) {
    const category = new Category(json.detail, json.icon, json.iconColor, json.backgroundColor)
    if (id) category.setId(id).setUser(json.user)

    return category
  }

  getId () {
    return this.id
  }

  setId (id) {
    this.id = id

    return this
  }

  getDetail () {
    return this.detail
  }

  getIcon () {
    return this.icon
  }

  getIconColor () {
    return this.iconColor
  }

  getBackgroundColor () {
    return this.backgroundColor
  }

  setUser (email) {
    this.user = email

    return this
  }

  getObjectData (withId) {
    const catObject = {
      detail: this.detail,
      backgroundColor: this.backgroundColor,
      icon: this.icon,
      iconColor: this.iconColor,
      user: this.user
    }

    if (withId) catObject.id = this.id

    return catObject
  }
}
