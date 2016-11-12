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
          media_ids: [id]
        }

        T.post('statuses/update', message, tweeted);
      }
      console.log('created image');
    }


  function tweeted(err, data, response) {
    if(err){
      console.log("Error");
    } else {
      console.log("tweet successful");
    }
   //console.log(data);
  }
}

function sketchProc(processing) {
  // Override draw function, by default it will be called 60 times per second
  processing.draw = function() {
    // determine center and max clock arm length
    var centerX = processing.width / 2, centerY = processing.height / 2;
    var maxArmLength = Math.min(centerX, centerY);

    function drawArm(position, lengthScale, weight) {      
      processing.strokeWeight(weight);
      processing.line(centerX, centerY, 
        centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,
        centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);
    }

    // erase background
    processing.background(224);

    var now = new Date();

    // Moving hours arm by small increments
    var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;
    drawArm(hoursPosition, 0.5, 5);

    // Moving minutes arm by small increments
    var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;
    drawArm(minutesPosition, 0.80, 3);

    // Moving hour arm by second increments
    var secondsPosition = now.getSeconds() / 60;
    drawArm(secondsPosition, 0.90, 1);
  };
  
}




