import { connect } from "mongoose"

export function connecToDb(dbUri: string) {
    return new Promise(async (res, rej) => {
        try {

            await connect(dbUri)

            res(true)

        }
        catch(err) {
            rej(`Error connecting to the database ${err}`)
        }
    })
}