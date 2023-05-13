const express = require('express')
const jwt = require('jsonwebtoken')
const {  userModel } = require('../models/user')
const userController =require('../controller/usercontroller')

const userRouter = express.Router()

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

userRouter.get('/',authorizationCheck, userController.getAllUsers)
// userRouter.get('/',authorizationCheck, async (req, res) => {
//     const users = await userModel.find({})
//     res.send(users)
//     })
userRouter.get('/me', (req, res) => {
    res.send(req.user)
})



userRouter.patch('/', async(req,res)=>{
    const{password} = req.body
})

userRouter.delete('/:username', authorizationCheck , userController.deleteUser)
// async(req,res) => {
//     // Lay username tu params
    
//     const userdelete= await userModel.findOne({username : req.params.username})
//     console.log(userdelete);
//     if(userdelete){
//         userModel.findOneAndDelete({username : req.params.username})
//         .then((data)=>
//            res.json({
//                message:`da xoa thanh cong`,
//                data
//              })
//         ).catch((err)=>res.json(err))
//     }
//     else{
//         res.json("User không tồn tại")
//     }

 
    // Tim xem user co trong db khong??

    // Xoa

    
// })

module.exports = { userRouter }