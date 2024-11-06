import { db } from '@/firebase/firebase'
import { collection, query, getDocs, where, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export default class CategoryRepository {
  #user

  constructor () {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    user = user.email

    this.#user = user
  }

  findCategories (user) {
    const queryCategories = query(collection(db, 'categories'), where('user', '==', user))

    return getDocs(queryCategories)
  }

  addCategory (category) {
    return addDoc(collection(db, 'categories'), category)
  }

  updateCategory (category, id) {
    const refCategory = doc(db, 'categories', id)

    return updateDoc(refCategory, category)
  }

  deleteCategory (id) {
    const refCategory = doc(db, 'categories', id)

    return deleteDoc(refCategory)
  }

  saveCategoriesToLocal (response) {
    const categories = []

    response.forEach((json) => {
      categories.push({ data: json.data(), id: json.id })
    })
    localStorage.setItem('categories' + this.#user, JSON.stringify(categories))
  }

  addCategoryToLocal (category, id) {
    const categories = JSON.parse(localStorage.getItem('categories' + this.#user))

    categories.push({ data: category, id: id })
    localStorage.setItem('categories' + this.#user, JSON.stringify(categories))
  }

  updateCategoryToLocal (updateData, id) {
    const categories = JSON.parse(localStorage.getItem('categories' + this.#user))
    const categoriesNewArray = []

    categories.forEach((json) => {
      if (json.id === id) categoriesNewArray.push({ data: updateData, id: json.id })
      else categoriesNewArray.push({ data: json.data, id: json.id })
    })

    localStorage.setItem('categories' + this.#user, JSON.stringify(categoriesNewArray))
  }

  deleteCategoryToLocal (id) {
    const categories = JSON.parse(localStorage.getItem('categories' + this.#user))

    const index = categories.findIndex(filter => filter.id === id)
    if (index !== -1) categories.splice(index, 1)

    localStorage.setItem('categories' + this.#user, JSON.stringify(categories))
  }
}
