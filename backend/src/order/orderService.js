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
module.exports.createOrderDBService = (orderDetails) => {
    return new Promise((resolve, reject) => {
        var orderModelData = new orderModel()
        
        orderModelData.order_purchase_timestamp = orderDetails.order_purchase_timestamp
        orderModelData.customer_id = orderDetails.customer_id

        
        for (let i = 0; i < orderDetails.products.length; i++) {
            const productData = {
              product_id: orderDetails.products[i].product_id,
              price: orderDetails.products[i].price,
              product_category_name: orderDetails.products[i].product_category_name,
              quantity: orderDetails.products[i].quantity
            };
          
            orderModelData.products.push(productData);
        }
        orderModelData.save().then(result => {
            console.log("Lưu dữ liệu thành công!")
            resolve(result);
        })
            .catch(error => {
                console.log("Lưu dữ liệu thất bại!", error)

                reject(false);
            });
    })
}