const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstname = name.body.fname;
  const lastname = name.body.lname;
  const emailname = name.body.email;

  const data = {
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields: {
          FNAME : firstname,
          LNAME : lastname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us4.api.mailchimp.com/3.0/lists/0d305cfae4";

  const options = {
    method: "POST",
    auth: "Vijay1:cf4481b0a5905c091ba86098b905d8d7-us4"
  }

  const request = https.request(url, options, function(response) {

    if(response.statuscode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(){
  console.log("server is running on port 3000");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});


//Api_id
//cf4481b0a5905c091ba86098b905d8d7-us4

//list_id
//0d305cfae4
