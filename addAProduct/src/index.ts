import connecToDatabase from "./connection"
import Product from "./models"
import { APIGatewayEvent } from "aws-lambda"

const dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/test"

export const handler = async (event: APIGatewayEvent) => {

    try {
        await connecToDatabase(dbUri)

        console.log("connected to the database")
    }
    catch(err) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({errorMessage: err})
        }
    }

    if(!event.body) return {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({errorMessage: "Product properties not defined"})
    }

    const newProduct = new Product(JSON.parse(event.body))

    const productAdded = await newProduct.save()

    console.log({productAdded})

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
            newProduct: productAdded,
        })
    }

}