const PlayFabClient = require("playfab-sdk/Scripts/PlayFab/PlayFabClient") //playfab
const idreg = require('./model/idreg')
const mongoose = require('mongoose')

const playfabcheck = (client, loginRequest, playfabid) => {

    client.LoginWithCustomID(loginRequest, (e, r) => {
        if (e) {
            console.error(e);
            return
        }
        let req = {
            InfoRequestParameters: {
                GetPlayerProfile: false,
                GetPlayerStatistics: true,
                GetUserAccountInfo: false,
                GetUserData: false,
                GetUserReadOnlyData: true,
                GetUserVirtualCurrency: false,
                GetCharacterInventories: false,
                GetCharacterList: false,
                GetTitleData: false,
                GetUserInventory: false
            },
            PlayFabId: playfabid
        }
        client.GetPlayerCombinedInfo(req, async (e, r) => {
            if (e) {
                console.error(e);
                return
            }
            //código pra fazer coisas aqui
            //console.log(JSON.stringify(r))

            const m = r.data.InfoResultPayload.PlayerStatistics.find(x => x.StatisticName === "DuelRank")?.Value
            const n = r.data.InfoResultPayload.UserReadOnlyData.AccountInfo.Value
    
            const n1 = JSON.parse(n)
            const n2 = n1.Name

            await mongoose.models.idsdb.updateOne({PlayfabID: playfabid}, {MMR: m, Nome: n2}, {upsert: true})
            
            console.log(n2, m)
        })

    });

}

module.exports = {
    playfabcheck
}