import mongoose from "mongoose"

export default function connecToDatabase(dbUri: string) {
    return new Promise(async (res, rej) => {
        try {
            await mongoose.connect(dbUri)
            res(true)
        }
        catch(err) {
            rej("Error connecting to the database" + err)
        }
    })
}