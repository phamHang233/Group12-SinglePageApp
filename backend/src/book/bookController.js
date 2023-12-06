var bookService = require('./bookService')

var getDataControllerfn = async (req, res) => {
    var book = await bookService.getDataFromDBService();
    res.send(book)
}

module.exports = { getDataControllerfn }