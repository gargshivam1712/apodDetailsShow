var axios = require('axios');

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

module.exports = { getAPODByDate , getAPODToday}