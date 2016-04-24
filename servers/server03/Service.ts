import * as mongodb from 'mongodb'
import { Product } from './Product'


export class ServiceBase<T> {

  constructor(private db: mongodb.Db) { }

  private get items(): mongodb.Collection {
    return this.db.collection(this.collectionName)
  }

  protected get collectionName() : string {
    throw new Error("Pure function call")
  }

  async insertOne(item: T) {
    return new Promise( (resolve, reject) => {
      this
        .items
        .insertOne(item)
        .then(resolve)
        .catch(reject)
    })
  }

  async getAll():Promise<Array<T>> {
    return new Promise<Array<T>>((resolve, reject) => {
      this.items
          .find({})
          .toArray()
          .then(resolve)
          .catch(reject)
    })
  }
}

export class ProductService extends ServiceBase<Product> {
  protected get collectionName() : string {
    return "products"
  }
}
