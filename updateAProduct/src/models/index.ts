import { Schema, model, Types } from "mongoose"

interface IProduct {
    _id: Types.ObjectId,
    name: string,
    price: number,
    tags: string[]
}

const ProductSchema = new Schema<IProduct>({
    name: String,
    price: Number,
    tags: [{type: String}]
})

const Product = model("Product", ProductSchema, "products")

export {
    ProductSchema,
    IProduct,
}

export default Product