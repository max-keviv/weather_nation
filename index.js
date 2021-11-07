////////////REQUESTING MODULE///////////////

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
// const request=require("request");
const https=require("https");
const ejs = require("ejs");
            ///////////////////////////
                // use of module
// app.use(express.static("public"));
app.set('view engine','ejs');
app.use("/", express.static(__dirname));//working
app.use(bodyParser.urlencoded({extended:true}));

        ////////////******** get response**********///////////
var weathers=new Object();
app.get("/",function(req,res){
   
    // res.sendFile(__dirname+"/index.html");
    res.render("search");
});




app.post("/",function(req,res){
var pl=req.body.place;
const url="https://api.openweathermap.org/data/2.5/weather?q="+pl+"&units=metric&appid=ce3dc7325abe309dd92f8685aafd176f";

https.get(url,async function(response){
    console.log(response.statusCode);
    if(response.statusCode!=200)
    {
        console.log("error");
        // res.sendFile(__dirname+"/failure.html");
        res.render("error");
    }
    else
    {
    await function(){ 
         response.on("data", function(data){
     weathers = JSON.parse(data);
        // console.log(weathers.weather)
        // console.log(weathers.main);
        console.log(weathers)
    //     const temp=weathers.main.temp
    //     const icon=weathers.weather[0].icon
    //     const des=weathers.weather[0].main
    //     const main=JSON.stringify(weathers.main);
    //     const img_url='http://openweathermap.org/img/wn/'+icon+'@4x.png'
    // res.write("<h1>weather forcast at "+pl+" </h1>") 
    // var arr=main.split(",");
    
    // res.write("<h3><i> the temp. is  "+temp+" c </i></h3>");
    // for(var i=1;i<arr.length;i++)
    // {
    //     res.write("<h4><i>"+arr[i]+"</i></h4>");
        
    // }
    // res.write("<h3><i> the weather is like " +des+" </i></h3>");
    // res.write("<img src="+img_url+">");
    //  res.send();
    })
}()
   await res.render('render',{weathers:weathers});
}
})

})


app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT ||2000,function(){
console.log("server at port 2000");
});