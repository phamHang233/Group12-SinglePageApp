var bookService = require('./bookModel')

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