import { Schema, model } from "mongoose";

interface IProduct {
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
    ProductSchema
}

export default Product