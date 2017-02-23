module.exports = function(app, stock) {

    //get all stocks
    app.get("/api/stocks", function(req, res) {
        stock.find(function(err, stocks) {
            if(err) return res.status(500).send({error: "database failure"});
            res.json(stocks);
        });
    });

    //get stocks by category
    app.get("/api/stocks/:category", function(req, res) {
        stock.find({category: req.params.category}, function(err, stock) {
            if(err) return res.status(500).json({error: err});
            if(!stock) return res.status(404).json({error:"stock not found"});
            res.json(stock);
        });
    });

    //create stock
    app.post("/api/stocks", function(req, res) {
        var stock = new stock();
        stock.code = req.body.code;
        stock.name = req.body.name;
        stock.current_value = req.body.current_value;
        stock.updown_value = req.body.updown_value;
        stock.updown_rate = req.body.updown_rate;
        stock.image = req.body.image;
        stock.category = req.body.category;

        stock.save(function(err) {
            if(err) {
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });

    //update stock
    app.put("/api/stocks/:code", function(req, res) {
        stock.update({code: req.params.code}, {$set: req.body}, function(err, output) {
            if(err) res.status(500).json({error: "database failure"});
            if(!output.n) return res.status(404).json({error: "stock not found"});
            res.json({message:"stock updated"});
        });
    });

    //delete
    app.delete("/api/stocks/:code", function(req, res) {
        stock.remove({code: req.params.code}, function(err, output) {
            if(err) return res.status(500).json({error: "database failure"});

            res.status(204).end();
        })
    });
};
