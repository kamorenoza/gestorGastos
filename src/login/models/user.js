export default class User {
  /**
   * @type {string}
   */
  #id = ''
  email = ''

  constructor (id, email) {
    this.#id = id
    this.email = email
  }

  static fromJSONResponse (json) {
    return new User(json.uid, json.email)
  }

  getId () {
    return this.#id
  }

  getEmail () {
    return this.email
  }
}
