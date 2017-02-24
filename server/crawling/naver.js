/**
 * Created by 1002625 on 2017-02-23.
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
        document.getElementById("pw").value = "****";
        document.getElementById("frmNIDLogin").submit();
    });
});

// make a screenshot
// casper.then(function() {
//     console.log("make a screenshot and save it as afterlogin.png");
//     this.wait(3000);
//     this.capture("crawling\\afterlogin.png");
// });

// get today stock
casper.thenOpen("http://m.stock.naver.com/sise/siseList.nhn", function() {
    console.log(this.evaluate(function() {
        return document.querySelector("ul.index_lst").innerText;
    }));
});

// get the graph of today stock
casper.thenOpen("http://m.stock.naver.com/sise/siseList.nhn", function() {
    var images = this.evaluate(function() {
        var arrImage = document.getElementsByTagName("img");
        var arrSource = [];
        for (var i = 0; i < arrImage.length; i++) {
            if (arrImage[i].alt == "차트") {
                arrSource.push(arrImage[i].src);
            }
        }
        return arrSource;
    });
    console.log(images.join("\t"));
});

// get world stock
casper.thenOpen("http://m.stock.naver.com/world/index.nhn", function() {
    console.log(this.evaluate(function() {
        return document.querySelector("ul.international_lst").innerText;
    }));
});

// get my stock
casper.thenOpen("http://finance.naver.com/mystock/itemList.nhn", function() {
    console.log(this.evaluate(function() {
        return document.getElementById("itemForm").innerText;
    }));
});

casper.run();