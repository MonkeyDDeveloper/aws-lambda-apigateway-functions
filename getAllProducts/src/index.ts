import {APIGatewayProxyEvent} from "aws-lambda"
import connectToDataBase from "./connection"
import models from "./models"

const { Product } = models

const dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/test"

export const handler = async (event: APIGatewayProxyEvent) => {

    console.log({event})

    try {
        await connectToDataBase(dbUri)
    }
    catch(err) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Credentials": true, 
            },
            body:JSON.stringify({
                errorMessage: "Error connecting to the database"
            })
        }
    }

    const productId = event.queryStringParameters?.productId

    console.log({productId})

    const queryFilter = productId ? {_id: productId} : {}

    try {

        const allProducts = await Product.find(queryFilter)

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Credentials": true, 
            },
            body: JSON.stringify({allProducts}),
        }

    }
    catch(err) {

        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Credentials": true, 
            },
            body: JSON.stringify({
                errorMessage: "There was a problem with the query parameters" + err
            })
        }

    }

}

// handler()