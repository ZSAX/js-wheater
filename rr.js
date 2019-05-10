const request = require('request')
const cheerio = require('cheerio')
const fs = require("fs");
var url ='http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm';
var urls ='http://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm';
var   city = require("./citydate");
var   citys = require("./citydates");

process.stdin.setEncoding('utf8');
console.log("your city：");
process.stdin.on('readable',function () {   
    var chunk = process.stdin.read();
	chunk = chunk.trim();
	var citycode  = city[chunk];
	var citycodes = citys[chunk];
	console.log(citycode);
	
	if(typeof (citycode) === "string") {
            url = "http://www.cwb.gov.tw/V7/forecast/taiwan/" + citycode + ".htm";
			urls ="https://www.cwb.gov.tw/V7/forecast/taiwan/inc/city/" + citycode + ".htm"+ citycodes;
            getCityData(url);
        }	
})


function getCityData(url) {

request(url, (err, res, body) => {
  const $ = cheerio.load(body)
  let weathers = []
  $('#box8 .FcstBoxTable01 tbody tr').each(function(i, elem) {
    weathers.push(
      $(this)
        .text()
        .split('\n')
    )})
  weathers = weathers.map(weather => ({
    time: weather[1].substring(2).split(' ')[0],
    temp: weather[2].substring(2),
    rain: weather[6].substring(2),
  }))
  console.log(weathers)
})
request(urls, (err, res, body) => {
  const $ = cheerio.load(body)
  let weathers = []
  $('#forecast0 .FcstBoxTable01 tr').each(function(i, elem) {
    weathers.push(
      $(this)
        .text().replace(/[\n\t]/g,'')
        .split('\n')
    )
  })
console.log(weathers) 
})









}