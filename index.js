const express =  require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const path = require('path')
const dbConnection = require('./model/connection')
const apodRoute = require('./route/apodRoute')
const job = require('./automation/schedule')
const {apodAPITask} = require('./automation/task')

app.use(bodyParser.json())

if(process.env.NODE_ENV=="production"){
    let options = {
        etag : true ,
        maxAge : 1000*60*60,
        redirect : true
    }
    app.use(express.static( 'client/build' , options))
    const path = require('path')
    app.get("/",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.use('/api/apodRoute' , apodRoute)

const PORT = process.env.PORT
server.listen(PORT , ()=>console.log(`Server has been started on port ${PORT}`))