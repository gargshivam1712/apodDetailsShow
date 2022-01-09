const apodModel = require('../model/apodModel')
const apodRoute = require('express').Router()
const {getAPODToday , getAPODByDate} = require('../util/httpUtils')
const {saveAs} = require('file-saver')
const fs = require('fs')
const request = require('request')
const path = require('path')
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const download = (uri, filename, callback)=>{
  console.log("uri" , uri , filename )
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

apodRoute.get('/images/:imagename',(req,res)=>{
  console.log(req.params)
  res.sendFile(path.join(__dirname , '../images' , req.params.imagename))
})

apodRoute.get('/' , async (req,res)=>{
    console.log(req.query , "query")
      let date = req.query.date
      if(date)
       {
          try 
          {
            let cacheData = myCache.get(date)
            if(cacheData == undefined)
            {
              console.log("data" , date , "cachemiss")
              const data = await apodModel.findOne({date : date})
              if(data)
              {
                  myCache.set(data.date , data)
                  res.json(data)
              }
              else
              {
                  const data = await getAPODByDate(date)
                  myCache.set(data.date , data)
                  console.log(data)
                  if(data.media_type == "image")
                  {
                    let pathArrray = data.url.split('/')
                    let imageURL = "images/"+pathArrray[pathArrray.length-1].toString()
                    download(data.url , imageURL , function(){
                      apodModel.create(data)
                      res.json(data)
                    })
                  }
                  else
                  {
                    apodModel.create(data)
                    res.json(data)  
                  }
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
            
        }
        else
        {
            try 
            {
                let todayDate = new Date()
                todayDate = `${todayDate.getFullYear()}-${(todayDate.getMonth()+1)>9 ? (todayDate.getMonth()+1) : '0'+(todayDate.getMonth()+1).toString()}-${todayDate.getDate()>9 ? todayDate.getDate() : '0'+todayDate.getDate().toString()}`
                console.log("today date" , todayDate)
                let cacheData = myCache.get(todayDate)
                if(cacheData == undefined)
                {
                  console.log("data" , todayDate , "cachemiss")
                  const data = await apodModel.findOne({date : todayDate})
                  if(data)
                  {
                      res.json(data)
                  }
                  else
                  {
                    const data = await getAPODToday()
                    console.log(data)
                    if(data.media_type == "image")
                    {
                      let pathArrray = data.url.split('/')
                      let imageURL = "images/"+pathArrray[pathArrray.length-1].toString()
                      download(data.url , imageURL , function(){
                        apodModel.create(data)
                        res.json(data)
                      })
                    }
                    else
                    {
                      apodModel.create(data)
                      res.json(data)  
                    }
                  }
                }
                else
                {
                  console.log("data" , todayDate , "cachemiss")
                  res.json(data)
                }  
            } 
            catch (error) 
            {
              console.log("ERROR :: " + JSON.stringify(error))
              return res.status(400).send("API Failed to fetch data");
            }
        }

      
     
})

module.exports = apodRoute