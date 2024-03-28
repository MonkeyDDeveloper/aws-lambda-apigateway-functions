import {APIGatewayEvent} from "aws-lambda"
import Product, {IProduct} from "./models"
import { connecToDb } from "./connection"

const dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/test"

export const handler = async (event: APIGatewayEvent) => {

    try {

        await connecToDb(dbUri)

    }
    catch(err) {

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({errorMessage: err})
        }

    }

    if(!event.body) return {
        statusCode: 400,
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({errorMessage: "No new data provided"})
    }

    const newDataForProduct: IProduct = JSON.parse(event.body) as unknown as IProduct

    const product = await Product.findById(newDataForProduct._id)

    if(!product) return {
        statusCode: 404,
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({errorMessage: "Product not found"})
    }

    product.name = newDataForProduct.name
    product.price = newDataForProduct.price
    product.tags = newDataForProduct.tags

    try {

        const newProductData = await product.save()

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                productUpdated: newProductData
            })
        }

    }
    catch(err) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({errorMessage: "Error updating product information"})
        }
    }


}