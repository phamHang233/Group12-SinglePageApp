var addrService = require('./addrService')


var getDataControllerfn = async (req, res) => {
    var userID = req.params.userID;
    var addr = await addrService.getDataFromDBService(userID);
    res.send(addr)
}
module.exports = { getDataControllerfn }