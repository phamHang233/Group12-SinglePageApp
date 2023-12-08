const { error } = require('jquery');
const bookModel = require('./bookModel');
var bookService = require('./bookModel');

module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        bookModel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};

module.exports.createBookDBService = (bookDetails) => {
    return new Promise((resolve, reject) => {
        var bookModelData = new bookModel()
        bookModelData.bookName = bookDetails.bookName
        bookModelData.category = bookDetails.category
        bookModelData.star = bookDetails.star
        bookModelData.author = bookDetails.author
        bookModelData.dailyPrice = bookDetails.dailyPrice
        bookModelData.salePrice = bookDetails.salePrice
        bookModelData.description = bookDetails.description
        bookModelData.imagePath = bookDetails.imagePath
        console.log("aa");
        bookModelData.save().then(result => {
            console.log("Lưu dữ liệu thành công!")
            resolve(result);
        })
            .catch(error => {
                console.log("Lưu dữ liệu thất bại!", error)

                reject(false);
            });
    })
}

module.exports.getBookDBbyIDService = (bookId) => {
    return new Promise((resolve, reject) => {
        console.log(bookId);
        bookModel.findById(bookId).then(result => {
            console.log(result)
            if (result != undefined && result != null){
                console.log("Lấy dữ liệu thành công!")
                resolve({status: true, msg: "Lấy dữ liệu thành công", book: result})
            }
            else {
                console.log("Lấy dữ liệu thất bại!")
                reject({status: false, msg: "Lấy dữ liệu thất bại"});
            }
        }).
        catch(error => {
            console.log("Lấy dữ liệu thất bại!", error)
            reject(false);
        })
    })
}