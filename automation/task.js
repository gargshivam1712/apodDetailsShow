var axios = require('axios');

const apodAPITask = ()=>{
  
    console.log("jo start")
    
    var config = {
        method: 'get',
        url: process.env.DOMAIN_URL +  '/api/apodRoute',
        headers: { 
          'Content-Type': 'application/json'
        },
      };
        
    axios(config)
    .then(function (response) {
        console.log("job done",response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

}

module.exports = { apodAPITask}



