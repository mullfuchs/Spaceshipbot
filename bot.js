console.log("bot is running");

var Twit = require("twit");

var config = require("./config");

var T = new Twit(config);

var message = {
  status: 'hello world! 2'
}

T.post('statuses/update', message, tweeted);

function tweeted(err, data, response) {
  if(err){
    console.log("Error");
  } else {
    console.log("tweet successful");
  }
 //console.log(data);
}


