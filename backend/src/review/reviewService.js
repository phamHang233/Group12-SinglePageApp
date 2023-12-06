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