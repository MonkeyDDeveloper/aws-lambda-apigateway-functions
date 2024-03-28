import { APIGatewayEvent } from "aws-lambda"
import {handler} from "./src/index"

// const apiEvent = "" as unknown as APIGatewayEvent

// handler(apiEvent)

export {
    handler
}