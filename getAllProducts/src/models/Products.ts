import mongoose, {Types} from "mongoose"

interface IProduct {
    name: string,
    price: number,
    tags: string[]
}

const productSchema = new mongoose.Schema<IProduct>({
    name: String,
    price: Number,
    tags: [{type: String}]
})

const Product = mongoose.model("Product", productSchema, "products")

export {
    productSchema
}

export default Product