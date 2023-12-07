var userService = require('./userService')

var getDataControllerfn = async (req, res) => {
    var employee = await userService.getDataFromDBService();
    res.send(employee)
    console.log("Lấy dữ liệu đăng nhập người dùng")
}

var createUserControllerfn = async (req, res) => {
    try {
        userService.createUserDBService(req.body)
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

var loginUserControllerfn = async (req, res) => {
    try {
        userService.loginUserDBService(req.body)
            .then(result => {
                res.send(result)
                console.log("ok")
            })
            .catch(error => {

                res.send(error)
            })
    }
    catch (error) {
        console.error();
    }

}

var getAllOrdersOfUserControllerfn = async (req,res) => {
    try {
        userService.getAllOrdersOfUser(req.body)
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
module.exports = { getDataControllerfn, createUserControllerfn, loginUserControllerfn ,getAllOrdersOfUserControllerfn}