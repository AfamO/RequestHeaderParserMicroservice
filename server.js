// server.js
// where your node app starts

// init project
var express = require('express');
var url=require('url');
var app = express();
function headerInfo(ipAddress,language,software){
  this.ipadress=ipAddress;
  this.language=language;
  this.software=software;
}
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  var addresses=request.headers["x-forwarded-for"].split(",");//Removes the uneeded ip
  var languages=request.headers["accept-language"].split(",");//Removes the unecessary lang values
  var software= request.headers["user-agent"].split(" (");//Removes unecessary software values
  var jsonAppHeaders={
    "ipaddress":addresses[0],
    "language":languages[0],
    "software":software[1],
    
  }
  var headeInfo=new headerInfo(addresses[0],languages[0],software[1]);
  var parsedUrl=url.parse(request.url, true);
	console.log(JSON.stringify(headeInfo));
  //response.send(headerInfo);
  response.send(headeInfo);
  //response.sendFile(__dirname + '/views/index.html');
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
