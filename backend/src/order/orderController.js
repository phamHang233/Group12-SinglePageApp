var orderService = require('./orderService')

var getDataControllerfn = async (req, res) => {
    var order = await orderService.getDataFromDBService();
    res.send(order)
    console.log("Gửi orders thành công")

}

module.exports = { getDataControllerfn }