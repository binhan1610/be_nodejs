const express=require('express')
const {userModel} =require('../models/user')
const userController= {
   getAllUsers: async(req, res)=> {
    try {
      const users = await userModel.find();
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  deleteUser: async(req,res)=>{
      const userdelete = await userModel.findOne({username:req.body.username})
      console.log(userdelete);
      if(userdelete){
        userModel.findOneAndDelete({username:req.body.username})
        .then((data)=>
           res.json({
               message:`da xoa thanh cong`,
               data
             })
        ).catch((err)=>res.json(err))
    }
    else{
        res.json("User không tồn tại")
    }
      }
  }


module.exports = userController;
