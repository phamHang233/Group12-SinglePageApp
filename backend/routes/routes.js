const express = require('express')
const router = express.Router()

const userController = require('../src/user/userController')
const bookController = require('../src/book/bookController')
const addrController = require('../src/addr/addrController')
const orderController = require('../src/order/orderController')
const reviewController = require('../src/review/reviewController')

router.route('/user/getAll').get(userController.getDataControllerfn)
router.route('/user/addUser').post(userController.createUserControllerfn)
router.route('/user/login').post(userController.loginUserControllerfn)
router.route('/user/getOrders').post(userController.getAllOrdersOfUserControllerfn)

router.route('/allBooks').get(bookController.getDataControllerfn)
router.route('/createBooks').put(bookController.createBookControllerfn)
router.route('/books/update/:id').put(bookController.updateBookControllerfn)
router.route('/books/:bookId').post(bookController.getBookByIDController)
router.delete('/books/delete/:id', bookController.deleteBookController)
router.route('/books/name/:search_key').get(bookController.getBooksByNameController)

router.route('/addr/getAddr/:userID').get(addrController.getDataControllerfn)

router.route('/order').get(orderController.getDataControllerfn)
router.route('/order/add').post(orderController.createOrderControllerfn)

router.route('/review').get(reviewController.getDataControllerfn)

module.exports = router;