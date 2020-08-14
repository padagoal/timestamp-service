// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});


app.get('/api/timestamp/:dateString?', (req, res) => {
    const dateString = req.params.dateString;

    let date;

    if (!dateString) { //If is empty, use the  Actual Date
        date = new Date();
    } else {
        //If no empty, i need to check want inside
        //First let see if is integer
        if (!isNaN(dateString)) { //Is a integer
            date = new Date(parseInt(dateString));
        } else {
            date = new Date(dateString);
        }
    }

    //Now i need to verify if it the Date is valid

    if (date.toString() === 'Invalid Date') {
        res.json({ error: date.toString() });
    } else {
        //Format the response
        //{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
        res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});