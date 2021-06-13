const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
// const Mailchimp = require('mailchimp-api-v3');

// const mailchimp = new Mailchimp('venkat:78af00a99c1fa0a1c479d29469e81353-us6');

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/", function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const emailid = req.body.email;
    // mailchimp.post('https://us6.api.mailchimp.com/3.0/lists/870fd9260e./members', {
    //     email_address: 'jack@example.com',
    //     status: 'subscribed',
    //     merge_fields: {
    //       FNAME: 'Jack',
    //       EMAIL: 'jack@example.com',
    //       COMPANY: 'Apple'
    //     }
    //   })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    const data = 
    {
        members: 
        [
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields: 
                {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jasondata=JSON.stringify(data);
    const url ="https://us6.api.mailchimp.com/3.0/lists/870fd9260e/members"
    const options ={
        method: "POST",
        auth: "venkat:78af00a99c1fa0a1c479d29469e81353-us6"
    }
    const request = https.request(url,options,function(response)
    {
        if(response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jasondata);
    request.end();

})

app.post("/failure",function(req,res)
{
    res.redirect("/");
})


app.listen(process.env.PORT || 3000 ,function(){
    console.log("you are on port 3000");
})

// apikey
// 78af00a99c1fa0a1c479d29469e81353-us6
// listId
// 870fd9260e