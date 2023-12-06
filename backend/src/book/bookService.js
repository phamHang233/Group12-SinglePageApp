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