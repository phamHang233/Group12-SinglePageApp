const orderModel = require('./orderModel')

module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        orderModel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};