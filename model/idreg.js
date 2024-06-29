const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    PlayfabID: {unique: true, type: String},
    MMR: String,
    Nome: String
});

module.exports = mongoose.model("idsdb", Schema);