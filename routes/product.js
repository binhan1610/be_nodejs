const express = require('express')
const productController=require('../controller/productcontroller')

const productRouter = express.Router()
const authorizationCheck = (req, res, next) => {
    const userRoles = req.user.role
    console.log(userRoles)
    // Check xem user nay co quyen lay toan bo user khong (Authorization) == check role
    if (userRoles.includes('admin')) {
        next()
    } else {
        res.send('User khong co quyen')
    }


}


productRouter.post("/",authorizationCheck, productController.addProduct)
productRouter.put("/",authorizationCheck, productController.updateProduct)
productRouter.post("/delete",authorizationCheck, productController.deleteProduct)

module.exports={productRouter}


