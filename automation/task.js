var axios = require('axios');

const  apodAPITask = ()=>{
    let todayDate = new Date()
    todayDate = `${todayDate.getFullYear()}-${(todayDate.getMonth()+1)>9 ? (todayDate.getMonth()+1) : '0'+(todayDate.getMonth()+1).toString()}-${todayDate.getDate()>9 ? todayDate.getDate() : '0'+todayDate.getDate().toString()}`
    console.log("today date" , todayDate)
    var config = {
        method: 'get',
        url: 'localhost:8080/api/apodRoute/images/M51Bfield_Sofia_960.jpg',
        headers: { 
          'Content-Type': 'application/json'
        },
      };
        
    axios(config)
    .then(function (response) {
        console.log("job done");
    })
    .catch(function (error) {
        console.log(error);
    });

}

module.exports = apodAPITask


