import { db } from '@/firebase/firebase'
import { collection, query, getDocs, where, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export default class ProductsRepository {
  #user

  constructor (user) {
    this.#user = user
  }

  findProducts (user) {
    const queryProducts = query(collection(db, 'products'), where('user', '==', user))

    return getDocs(queryProducts)
  }

  addProduct (product) {
    return addDoc(collection(db, 'products'), product)
  }

  updateProduct (product, id) {
    const refProduct = doc(db, 'products', id)

    return updateDoc(refProduct, product)
  }

  deleteProduct (id) {
    const refProduct = doc(db, 'products', id)

    return deleteDoc(refProduct)
  }

  saveProductsToLocal (response) {
    const products = []

    response.forEach((json) => {
      products.push({ data: json.data(), id: json.id })
    })
    localStorage.setItem('products' + this.#user, JSON.stringify(products))
  }

  addProductToLocal (product, id) {
    const products = JSON.parse(localStorage.getItem('products' + this.#user))

    products.push({ data: product, id: id })
    localStorage.setItem('products' + this.#user, JSON.stringify(products))
  }

  updateProductToLocal (updateData, id) {
    const products = JSON.parse(localStorage.getItem('products' + this.#user))
    const productsNewArray = []

    products.forEach((json) => {
      if (json.id === id) productsNewArray.push({ data: updateData, id: json.id })
      else productsNewArray.push({ data: json.data, id: json.id })
    })

    localStorage.setItem('products' + this.#user, JSON.stringify(productsNewArray))
  }

  deleteProductToLocal (id) {
    const products = JSON.parse(localStorage.getItem('products' + this.#user))

    const index = products.findIndex(filter => filter.id === id)
    if (index !== -1) products.splice(index, 1)

    localStorage.setItem('products' + this.#user, JSON.stringify(products))
  }
}
