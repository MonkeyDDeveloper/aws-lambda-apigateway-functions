import { APIGatewayProxyEvent } from 'aws-lambda'
import Product from './models/Product'
import {connecToDb} from './connection'

const dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/test"

export const handler = async (event: APIGatewayProxyEvent) => {

    try {

        await connecToDb(dbUri)

    }
    catch(err) {

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
              errorMessage: "Couldn't connect to the database" + err  
            })
        }

    }

    const productId = event.queryStringParameters?.productId

    if(!productId) return {
        statusCode: 400,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            errorMessage: "Product ID not specified"
        })
    }

    try {

        await Product.findByIdAndDelete(productId)

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                successMessage: "Product deleted successfully"
            })
        }

    }
    catch(err) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                errorMessage: "Error while deleting the product"
            })
        }
    }


}