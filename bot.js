console.log("bot is running");

var Twit = require("twit");

var config = require("./config");

var T = new Twit(config);

var exec = require('child_process').exec;

var fs = require('fs');

//setInterval(sendTweet, 1000*60);
sendTweet();

function sendTweet() {
  // body...
  var command = 'processing-java --sketch=`pwd`/imageCreator --run';

  exec(command, processing);




  //T.post('statuses/update', message, tweeted);

  function tweeted(err, data, response) {
    if(err){
      console.log("Error");
    } else {
      console.log("tweet successful");
    }
   //console.log(data);
  }
}

function processing() {
  var filename = 'imageCreator/output.png';
  var params = {
    encoding: 'base64'
  }
  var b64Content = fs.readFileSync(filename, params);
  T.post('media/upload', {media_data: b64Content}, uploaded); 

  function uploaded(err, data, response) {
    // body...
    var id = data.media_id_string;

    var rando = Math.floor(Math.random()*100);

    var message = { 
      status: 'Testing run! random image ' + rando,
      media_ids: [id];
    }
    
  }

  console.log('created image');
}



