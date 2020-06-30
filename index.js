const express=require("express");

const https=require("https");
const { json } = require("express");
const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var weathers=new Object();
app.get("/",function(req,res){
   
    res.sendFile(__dirname+"/index.html");
    
});




app.post("/",function(req,res){
var pl=req.body.place;
const url="https://api.openweathermap.org/data/2.5/weather?q="+pl+"&units=metric&appid=ce3dc7325abe309dd92f8685aafd176f";

https.get(url,function(response){
    console.log(response.statusCode);
    if(response.statusCode==404)
    {
        console.log("error");
        res.write("<h1>wrong credentials</h1><p>Data not found<br><i>try somethings else<i/></p>");
        res.send();
    }
    else
    {
    response.on("data",function(data){
         weathers=JSON.parse(data);
        // console.log(weathers.weather)
        // console.log(weathers.main);

        const temp=weathers.main.temp
        const icon=weathers.weather[0].icon
        const des=weathers.weather[0].main
        const main=JSON.stringify(weathers.main);

        const img_url='http://openweathermap.org/img/wn/'+icon+'@4x.png'
    res.write("<h1>wether forcast at "+pl+" </h1>") 
    res.write(main);
    res.write("<h3><i> the temp. is  "+temp+" c </i></h3>");
    res.write("<h3><i> the weather is like " +des+" enjoy </i></h3>");
    res.write("<img src="+img_url+">");
     res.send();
    })
}
})

})


app.listen(process.env.PORT || 3000,function(){
console.log("server at port 3000");
});