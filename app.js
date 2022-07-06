const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require('ejs');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(favicon(path.join(__dirname,'public', "favicon.ico")));

app.set('view engine', 'ejs');
app.get("/" ,function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" ,function(req,res){
    const query =req.body.CityName;
    const appId ='Write your AppId here';
    const Units = 'metric';
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+Units+"&appid=" +appId ;
    https.get(url,function(response){
        response.on("data" , function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const imgUrl = "http://openweathermap.org/img/wn/"+ icon+"@2x.png";
            res.render('result.ejs' , {query : query , temp : temp , weatherDescription:weatherDescription , imgUrl : imgUrl , 
                humidity : humidity , windSpeed : windSpeed});
            
            
        });
    });
});
app.listen(process.env.PORT || 3000,function(){
    console.log("server working fine on port 3000");
});

