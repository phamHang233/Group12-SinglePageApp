var bookService = require('./bookService')

var getDataControllerfn = async (req, res) => {
    var book = await bookService.getDataFromDBService();
    res.send(book)
}

var createBookControllerfn = async (req, res) => {

    try {
        bookService.createBookDBService(req.body)
            .then(result => {
                res.send({ 'status': result, "message": "Tao moi san pham thanh cong " })
                console.log("oke")
            })
            .catch(error => {

                res.send({ 'status': false, "message": "Tao moi san pham that bai " })
            })
    }
    catch (error) {
        console.error();
    }
}

var getBookDBbyIDControllerfn = async (req, res) => {
    try {
        //console.log(req)
        bookService.getBookDBbyIDService(req.params.bookId)
            .then(result => {
                res.send(result)
                console.log("oke")
            })
            .catch(error => {
                res.send(error)
            })
    }
    catch (error) {
        console.error();
    }
}

module.exports = { getDataControllerfn, createBookControllerfn, getBookDBbyIDControllerfn}