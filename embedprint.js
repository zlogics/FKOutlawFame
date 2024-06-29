const idreg = require('./model/idreg')
const mongoose = require('mongoose')

const playerlist = (embed, id, mmr) => {
    
    embed.addFields({ name: id, value: mmr})
    
}

module.exports = {
    playerlist
}