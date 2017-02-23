/**
 * Created by 1002625 on 2017-02-23.
 */
$(function(window, $, document) {

    $(document).ready(function() {

        var httpRequest = function(url, callback) {
            $.ajax({
                cache: false,
                type: "GET",
                crossDomain: true,
                url: url,
                success: function (data) {
                    var resultData = (typeof data === "string") ? JSON.parse(data) : data;
                    callback(resultData);
                },
                error: function (data) {
                    //nothing
                },
                xhrFields: {
                    withCredentials: true
                }
            });
        };

        var todayStock = function() {
            var todayStockCB = function(data) {
                var html = "<tr><td>증권시장</td><td>현재지수</td><td>전일대비</td><td>차트</td></tr>";
                for(var i = 0; i < data.length; i++) {
                    var updownStyle = data[i].updown_value.indexOf("+") >= 0 ?
                        " style='color:red'" : (data[i].updown_value.indexOf("-") >= 0 ? " style='color:blue'" : "");

                    html += "<tr><td>" + data[i].name +
                            "</td><td" + updownStyle + ">" + data[i].current_value +
                            "</td><td" + updownStyle + ">" + data[i].updown_value +
                            "</td><td><img src='" + data[i].image + "<'/></td></tr>";
                }
                $("#table_today").html(html);
            };
            httpRequest("http://localhost:8080/api/stocks/today", todayStockCB);
        };

        var worldStock = function() {
            var worldStockCB = function(data) {
                var html = "<tr><td>증권시장</td><td>현재지수</td><td>전일대비</td></tr>";
                for(var i = 0; i < data.length; i++) {
                    var updownStyle = data[i].updown_value.indexOf("+") >= 0 ?
                        " style='color:red'" : (data[i].updown_value.indexOf("-") >= 0 ? " style='color:blue'" : "");

                    html += "<tr><td>" + data[i].name +
                        "</td><td" + updownStyle + ">" + data[i].current_value +
                        "</td><td" + updownStyle + ">" + data[i].updown_value +
                        "</td></tr>";
                }
                $("#table_world").html(html);
            };
            httpRequest("http://localhost:8080/api/stocks/world", worldStockCB);
        };

        var myStock = function() {
            var myStockCB = function(data) {
                var html = "<tr><td>종목명</td><td>현재가</td><td>전일대비</td><td>등락률</td></tr>";
                for(var i = 0; i < data.length; i++) {
                    if(data[i].code === null) {
                        continue;
                    }
                    var updownStyle = data[i].updown_rate.indexOf("+") >= 0 ?
                        " style='color:red'" : (data[i].updown_rate.indexOf("-") >= 0 ? " style='color:blue'" : "");

                    html += "<tr><td>" + data[i].name +
                        "</td><td" + updownStyle + ">" + data[i].current_value +
                        "</td><td" + updownStyle + ">" + data[i].updown_value +
                        "</td><td" + updownStyle + ">" + data[i].updown_rate +
                        "</td></tr>";
                }
                $("#table_mygroup").html(html);
            };
            httpRequest("http://localhost:8080/api/stocks/mystock", myStockCB);
        };

        todayStock();
        worldStock();
        myStock();

        $("#to_today").on("click", function(e) {
            todayStock();
        });

        $("#to_world").on("click", function(e) {
            worldStock();
        });

        $("#to_mygroup").on("click", function(e) {
            myStock();
        });
    });
}(window, jQuery, document));