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

const getBooksByNameController = async (req, res) => {
    var search_key = req.body.bookName;
    console.log(search_key);
    bookService.getBooksByName(search_key).then(result => {
        res.send(result)
    })
        .catch(error => {
            res.send(error)
        })
};

const getBookByIDController = async (req, res) => {
    var id = req.body.id
    bookService.getBookByID(id).then(result => {
        res.send(result)
    })
        .catch(error => {
            res.send(error)
        })

}

const updateBookControllerfn = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }


    bookService.updateBookDBService(req.body)

        .then(result => {
            res.send({ 'status': true, "message": "Cap nhat san pham thanh cong " })
        })
        .catch(error => {
            res.send({ 'status': false, "message": "Cap nhat san pham that bai " })
            console.log(error)
        })
}
const deleteBookController = async (req, res) => {
    var id = req.body.id;
    console.log(id)
    bookService.deleteBookDBService(id)
        .then(result => {
            res.send({ 'status': true, "message": "Xóa san pham thanh cong " })
            console.log("OK")
        })
        .catch(error => {
            res.send({ 'status': false, "message": "Xoa san pham that bai " })
            console.log(error)
        })
}
module.exports = { getDataControllerfn,createBookControllerfn,getBooksByNameController,getBookByIDController,updateBookControllerfn,deleteBookController}