const mongoose = require('mongoose')

const MONGO_DB_URL = process.env.MONGO_DB_URL

try {
    mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((db) => console.log("db connected"))
    
} catch (error) {
    consoe.log("Mongo db Error :: " + JSON.stringify(error) )
}

