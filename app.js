const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
    
    response.sendFile(__dirname + "/index.html");
    
});


app.post("/", function(request, res){

    const query = request.body.cityName;
    const apiKey = "f8ce907dc7161e0671c192848e42081d";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + ""
    console.log(url)
    
   https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in "+ query +" is " + temp + " degress Celcius</h1>");
            res.write("<img src=" + imageURL + ">"); 
            res.send();
        });
    });
   
});


app.listen(3000, function(){
    console.log("Server is running on port:3000");
    });







