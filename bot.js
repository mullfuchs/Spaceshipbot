console.log("bot is running");

var Twit = require("twit");

var config = require("./config");

var T = new Twit(config);

setInterval(sendTweet, 1000*60);
//sendTweet();

function sendTweet() {
  // body...
  var rando = Math.floor(Math.random()*100);

  var message = { 
  status: 'Testing run! random number' + rando
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
}



