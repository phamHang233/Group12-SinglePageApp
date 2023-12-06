var reviewService = require('./reviewService')

var getDataControllerfn = async (req, res) => {
    var review = await reviewService.getDataFromDBService();
    res.send(review)
}

module.exports = { getDataControllerfn }