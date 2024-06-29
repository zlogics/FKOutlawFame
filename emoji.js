const emoji = (stringmmr) => {
    
    const nummmr = Number(stringmmr)
    
    if (nummmr >= 3000) return '<:Elite_5:1101504498452672582> '
    else if (nummmr >= 2900) return '<:Elite_4:1101504485035102378>'
    else if (nummmr >= 2800) return '<:Elite_3:1101504472129220709>'
    else if (nummmr >= 2700) return '<:Elite_2:1101504458074095636>'
    else if (nummmr >= 2600) return '<:Elite_1:1101504442936852602>'
    else if (nummmr >= 2500) return '<:Diamond_5:1101504427472470076>'
    else if (nummmr >= 2400) return '<:Diamond_4:1101504412972765275>'
    else if (nummmr >= 2300) return '<:Diamond_3:1101504398473035796>'
    else if (nummmr >= 2200) return '<:Diamond_2:1101504382538874920>'
    else if (nummmr >= 2100) return '<:Diamond_1:1101504368236318791>'
    else if (nummmr >= 2000) return '<:Platinum_5:1101504340465827901>'
    else if (nummmr >= 1900) return '<:Platinum_4:1101504326863683595>'
    else if (nummmr >= 1800) return '<:Platinum_3:1101504311458025482>'
    else if (nummmr >= 1700) return '<:Platinum_2:1101504297092526080>'
    else if (nummmr >= 1600) return '<:Platinum_1:1101504283142258739>'
    else if (nummmr >= 1500) return '<:Gold_5:1101504258811121714>'
    else return '<:sosad:1082124654371688519>'
}

module.exports = {
    emoji
}