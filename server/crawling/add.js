/**
 * Created by 1002625 on 2017-02-24.
 */


// configure casper setting
var casper = require("casper").create({
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
    },
    // logLevel: "debug",
    verbose: false
});

// start casper and open naver login page
casper.start().thenOpen("https://nid.naver.com/nidlogin.login", function() {
    // console.log("naver login page is opened.");
});

// login naver
casper.then(function() {
    // console.log("login using username and password");
    this.evaluate(function() {
        document.getElementById("id").value = "chhong0708";
        document.getElementById("pw").value = "ghdckdgh84";
        document.getElementById("frmNIDLogin").submit();
    });
});

// add item
casper.thenOpen("http://finance.naver.com/mystock/itemList.nhn", function() {

    this.wait(100);

    console.log("add item");

    this.evaluate(function(item) {
        document.getElementById("mystock_input").value = item;
        document.getElementsByName("mystockFrm")[0].children[3].click();
    }, casper.cli.args[0]);

});

casper.then(function() {
});

casper.run();