const orderModel = require('../order/orderModel');
const userModel = require('./userModel')

module.exports.getDataFromDBService = () => {
    return new Promise((resolve, reject) => {
        userModel.find({})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
};
module.exports.createUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userDetails.email }).then(result => {
            if (result != undefined && result != null) {
                console.log("Email đã tồn tại")
                resolve({ status: false, msg: "Email đã tồn tại" })
            }
            else {
                var userModelData = new userModel()
                userModelData.firstName = userDetails.firstName
                userModelData.lastName = userDetails.lastName
                userModelData.email = userDetails.email
                userModelData.password = userDetails.password
                userModelData.role = userDetails.role

                userModelData.save().then(result => {
                    console.log("Lưu dữ liệu thành công!")
                    resolve({ status: true, msg: "Đăng kí thành công" });
                })
                    .catch(error => {
                        console.log("Lưu dữ liệu thất bại!")
                        reject(error);
                    });
            }
        })
    })
}

module.exports.loginUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userDetails.email }).then(result => {
            if (result != undefined && result != null) {

                if (result.password == userDetails.password) {
                    resolve({ status: true, msg: "Đăng nhập thành công", user: result })
                }
                else {
                    console.log("sai mkhau")
                    reject({ status: false, msg: "Sai mật khẩu" })
                }
            }
            else {
                reject({ status: false, msg: "Người dùng không tồn tại" })
            }
        })
        .catch(errValue => {
            console.log(errValue)
            reject({ status: false, msg: "Invalid Data" })
        })
    })
}

module.exports.getAllOrdersOfUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        orderModel.find({customer_id: userDetails.cusId})
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    })
}