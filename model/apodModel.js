const mongoose = require('mongoose')

const APOD_Schema = new mongoose.Schema(
	{
		copyright : {type : String},
        date : {type : String , required : true } , 
        explanation : {type  : String , required : true} ,
        service_version : {type : String , require : true} ,
        hdurl : { type : String } , 
        media_type : { type : String , require : true},
        title : {type : String , required : true},
        url : { type : String , required : true}
	},
	{ collection: 'apod_data' }
)

APOD_Schema.index({ date: 1 }, { unique: true })

const model = mongoose.model('apod_data', APOD_Schema)
module.exports = model