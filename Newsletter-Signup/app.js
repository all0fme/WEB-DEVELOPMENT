const express= require("express");
const request = require("request");
const bodyParser=require("body-parser");
const https=require("https");
const { post } = require("request");
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",(req,res)=>{
    const firstName=req.body.fname;
    const lastName= req.body.lname;
    const userEmail = req.body.userEmail;
    console.log("hello "+firstName+" "+lastName+" with emailId : "+ userEmail);
    const data={
        members: [
            {
                email_address: userEmail,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,

                }

            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us7.api.mailchimp.com/3.0/lists/29a21cbd25";
    const options={
        method: "POST",
        auth: "all0fme:a53273838c4d85624403a565fa5935cf-us7"
    }
    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200)
        {
            res.send("Success");
        }else{
            res.send("failure");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
    
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});

// API KEY 
// a53273838c4d85624403a565fa5935cf-us7 
//LIST ID
//29a21cbd25