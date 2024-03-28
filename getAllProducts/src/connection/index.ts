import mongoose from 'mongoose'

async function connectToDataBase(uri = '') {
    try {

        await mongoose.connect(uri)
        console.log("connected")

    }
    catch(err){

        console.log("error on connection")

    }
}

export default connectToDataBase