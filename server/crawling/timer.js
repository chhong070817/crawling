/**
 * Created by 1002625 on 2017-02-23.
 */

var exec = require("child_process").exec;
var stock = require("../models/stock");

module.exports.start = function() {
    var parse = function(data) {
        var lines = data.split("\r\n");
        var images = lines[17].split("\t");
        var result = [
            {
                code: "KOSPI",
                name: lines[0],
                current_value: lines[1],
                updown_value: lines[2],
                updown_rate: "",
                image: images[0],
                category: "today"
            }, {
                code: "KOSDAQ",
                name: lines[4],
                current_value: lines[5],
                updown_value: lines[6],
                updown_rate: "",
                image: images[1],
                category: "today"
            }, {
                code: "KPI200",
                name: lines[8],
                current_value: lines[9],
                updown_value: lines[10],
                updown_rate: "",
                image: images[2],
                category: "today"
            }, {
                code: "FUTURES",
                name: lines[12],
                current_value: lines[13],
                updown_value: lines[14],
                updown_rate: "",
                image: images[3],
                category: "today"
            }, {
                code: "DAU",
                name: lines[18],
                current_value: lines[19],
                updown_value: lines[20],
                updown_rate: "",
                image: "",
                category: "world"
            }, {
                code: "NASDAQ",
                name: lines[21],
                current_value: lines[22],
                updown_value: lines[23],
                updown_rate: "",
                image: "",
                category: "world"
            }, {
                code: "JP",
                name: lines[24],
                current_value: lines[25],
                updown_value: lines[26],
                updown_rate: "",
                image: "",
                category: "world"
            }, {
                code: "CHN",
                name: lines[27],
                current_value: lines[28],
                updown_value: lines[29],
                updown_rate: "",
                image: "",
                category: "world"
            }, {
                code: "GER",
                name: lines[30],
                current_value: lines[31],
                updown_value: lines[32],
                updown_rate: "",
                image: "",
                category: "world"
            }, {
                code: "GBR",
                name: lines[33],
                current_value: lines[34],
                updown_value: lines[35],
                updown_rate: "",
                image: "",
                category: "world"
            }
        ];

        for(var i = 39; i < lines.length; i++ ){
            if(lines[i] != "") {
                var tokens = lines[i].split("\t");
                var item = {
                    code: tokens[1],
                    name: tokens[1],
                    current_value: tokens[2],
                    updown_value: tokens[3],
                    updown_rate: tokens[4],
                    image: "",
                    category: "mystock"
                };
                result.push(item);
            }
        }

        return result;
    };

    setInterval(function() {
         exec("casperjs crawling\\naver.js", function(err, stdout, stderr) {
             if(err) {
                 console.log("child process exited with error code", err.code);
                 return;
             }
             var parsedData = parse(stdout);
             for(var i = 0; i < parsedData.length; i++) {
                 stock.remove(function(err, output) {
                     //
                 });

                 stock.update({code: parsedData[i].code}, {$set: parsedData[i]},
                     {
                         upsert: true, multi: true
                     }, function(err, output) {

                     });
             }
         });
    }, 10000);
};