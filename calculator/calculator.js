
const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
    var num1=Number(req.body.num1);
    var num2= Number(req.body.num2);
    var result=num1 + num2;

    res.send("Thanks for posting<br>The result of your calculation is "+result);
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})