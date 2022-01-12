const apodModel = require('../model/apodModel')
const apodRoute = require('express').Router()
const {getAPODByDate , downloadImage} = require('../util/httpUtils')
const path = require('path')
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

apodRoute.get('/images/:imagename',(req,res)=>{
  console.log(req.params)
  res.sendFile(path.join(__dirname , '../images' , req.params.imagename))
})

apodRoute.get('/' , async (req,res)=>{
    try 
    {
      let date = req.query.date
      if(!date)
      {
        let todayDate = new Date()
        date = `${todayDate.getFullYear()}-${(todayDate.getMonth()+1)>9 ? (todayDate.getMonth()+1) : '0'+(todayDate.getMonth()+1).toString()}-${todayDate.getDate()>9 ? todayDate.getDate() : '0'+todayDate.getDate().toString()}`
      }

      // get data from server cache 
      let cacheData = myCache.get(date)
      if(cacheData == undefined)
      {
        console.log("data" , date , "cachemiss")

        // get data from database
        const data = await apodModel.findOne({date : date})
        if(data)
        {
            myCache.set(data.date , data)
            res.json(data)
        }
        else
        {
            // get data from nasa api
            const data = await getAPODByDate(date)
            if(data.media_type == "image")
            {
              let pathArrray = data.url.split('/')
              let imageName = pathArrray[pathArrray.length-1].toString()
          
              // downlaod image in images folder
              downloadImage(data.url , imageName)
              .then(()=>{
                data.url = process.env.DOMAIN_URL + '/api/apodRoute/images/' + imageName
                apodModel.create(data).then(data => {
                  console.log("create store" , data)
                  myCache.set(data.date , data)
                })
                .catch(err => console.log("data not store",err))
                myCache.set(data.date , data)
                
              })
              .catch(err => console.log("downlaod images error :: " + JSON.stringify(err)))
            }
            else
            {
              apodModel.create(data).then(data => {
                myCache.set(data.date , data)
              })
              .catch(err => console.log("data not store" , err))
            }
            res.json(data)
        }
      }
      else
      {
        console.log("data" , date , "cachehit")
        res.json(cacheData)
      }
    } 
    catch (error) 
    {
      console.log("ERROR :: " + JSON.stringify(error))
      return res.status(400).send("API Failed to fetch data");
    }
})

module.exports = apodRoute