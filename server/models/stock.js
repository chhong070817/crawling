/**
 * Created by 1002625 on 2017-02-23.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stockSchema = new Schema({
    code: String,
    name: String,
    current_value: String,
    updown_value: String,
    updown_rate: String,
    image: String,
    category: String
});

module.exports = mongoose.model("stock", stockSchema);