const { response } = require("express");
const express=require("express");
const app=express();
const https=require("https");
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html") ; 
    
});
app.post("/",(req,res)=>{
    console.log("Post request received");
    const apikey="b4ad9abe99038dd2eb748a1af1427d1e";
    const query=req.body.cityName;
    const unit="metric";
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"",(response)=>{
     console.log(response.statusCode); 
     response.on("data",function(data){
         const weatherMapData= JSON.parse(data);
         console.log(weatherMapData);
         const temp= weatherMapData.main.temp;
         const icon = weatherMapData.weather[0].icon;
         const weatherDescription = weatherMapData.weather[0].main;
         res.setHeader("Content-Type", "text/html");
         const weatherIconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
         res.write("<h1>The temperature in "+weatherMapData.name+" is "+temp+" Degree Celcius</h1>");
         res.write("<h3>The weather is mostly "+weatherDescription+"</h3>");
         res.write("<img src="+ weatherIconUrl + ">");
         
         res.send();
     });
     
    });
})



app.listen(3000,()=>{
    console.log("Server running on port 3000");
})