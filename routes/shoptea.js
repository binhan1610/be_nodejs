const express = require('express')
const shopteaController=require('../controller/shopteacontroller')
const {shopteaModel}=require('../models/shoptea')


const shopteaRouter = express.Router()

const authorizationCheck = (req, res, next) => {
    const userRoles = req.user.role
    console.log(userRoles)
    // Check xem user nay co quyen lay toan bo user khong (Authorization) == check role
    if (userRoles.includes('admin')||userRoles.includes('user')) {
        next()
    } else {
        res.send('User khong co quyen')
    }

}


shopteaRouter.post('/',authorizationCheck, shopteaController.addShoptea)
module.exports={shopteaRouter}