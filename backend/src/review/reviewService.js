const reviewModel = require('./reviewModel')

module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        reviewModel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};

module.exports.getReviewByBookService = async (bookID) => {
    return new Promise((resolve, reject) => {
        reviewModel.find({ product_id: bookID })
            .populate({ path: 'customer_id' })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });

};