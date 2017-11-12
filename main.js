const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');
var jsonfile = require('jsonfile');
var fs = require('fs');
app.use(cors());

var obj = {
    table: []
};
var url = "http://leml365x-lemlpi.seattleu.edu"
request(url, function (error, response, html) {
    console.log("req sent");
  if (!error && response.statusCode == 200) {
      console.log("no error, no statusCode");
    var $ = cheerio.load(html);
    var json;
    $('div.container').each(function(i, element){
      var a = $(this).children();
      for (var i = 0; i < a.length; i++) {
          obj.table.push({text: $(a[i]).val(),
          name: $(a[i]).attr("name"), class: $(a[i]).attr("class")});
          json = JSON.stringify(obj);
          fs.writeFile('data.json', json, 'utf8');
      }
    });
  }
  if(error){
    console.log("Error: ", error);
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/SURoomReserve.html'));
});
console.log("TESTING");
app.listen(3000, () => console.log('Example app listening on port 3000!'));

/*
var request = require('request');
var cheerio = require('cheerio');

request('http://leml365x-lemlpi.seattleu.edu/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('div.space').each(function(i, element){
            var next = $(this).next();
            console.log(next.text());
        });

        $('div.container').children().each(function() {
            var val = $(this).val();
            console.log(val);
            var str = val.toString();

            // returns true if room is in use
            var is_in_use = str.includes("in use");
            console.log(is_in_use);
        });
    }
});
*/
