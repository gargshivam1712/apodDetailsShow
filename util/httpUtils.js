var axios = require('axios');
const path = require('path')
const fs = require('fs')

const getAPODByDate = async (date)=>{
    try {
        let config = {
            method: 'get',
            url: `${process.env.APOD_NASA_URL }?api_key=${process.env.APOD_KEY}&date=${date}`,
            headers: { 'Content-Type': 'application/json' }
          };
          console.log("config by date" , config)
        let res = await axios(config)
        return res.data
    } catch (error) {
        console.log("rror" , error)
        throw error
    }
}


const getAPODToday = async ()=>{
    try {
        let config = {
            method: 'get',
            url: `${process.env.APOD_NASA_URL }?api_key=${process.env.APOD_KEY}`,
            headers: { 'Content-Type': 'application/json' }
          };
          console.log("config" , config)
        let res = await axios(config)

        return res.data
    } catch (error) {
        console.log("some error :: " , error)
        throw error
    }
}

const downloadImage = async (url,filename)=>{
    console.log("downlaod start")
    let res  = await axios({
      method : 'GET' ,
      url : url ,
      responseType : 'stream'
    })
  
    const imagePath = path.resolve(__dirname , '../images' , filename)
  
    res.data.pipe(fs.createWriteStream(imagePath))
  
    return new Promise((resolve , rejects)=>{
      res.data.on('end' , ()=>{
        console.log("dowload complete")
        resolve()
      })
  
      res.data.on('error' , (err)=>{
        rejects(err)
      })
    })
  }

module.exports = { getAPODByDate , getAPODToday , downloadImage}