var userService = require('./userService')

var getDataControllerfn = async (req, res) => {
    var employee = await userService.getDataFromDBService();
    res.send(employee)
    console.log("Lấy dữ liệu đăng nhập người dùng")
}

var createUserControllerfn = async (req, res) => {
    var status = await userService.createUserDBService(req.body);
    if (status) {
        res.send({ 'status': true, "message": "Tao moi nguoi dung thanh cong " })
        console.log("OK")
    }
    else res.send({ 'status': false, "message": "Tao moi nguoi dung that bai " })
}

var loginUserControllerfn = async (req, res) => {
    try {
        userService.loginUserDBService(req.body)
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

module.exports = { getDataControllerfn,createUserControllerfn,loginUserControllerfn }