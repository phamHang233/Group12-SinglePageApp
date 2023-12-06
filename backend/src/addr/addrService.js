const addrModel = require('./addrModel')

module.exports.getDataFromDBService = (userID) => {
    return new Promise((resolve, reject) => {
        addrModel.findOne({ userID: userID })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(false);
            });
    });
};