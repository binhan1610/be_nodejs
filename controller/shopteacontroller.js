const express=require('express')
const {shopteaModel}=require('../models/shoptea')
const shopteaController={
    getAllShoptea:async(req,res)=>{
        try {
            const shoptea = await shopteaModel.find();
            res.send(shoptea);
          } catch (error) {
            console.log(error);
            res.status(500).send(error);
          }
    },
    addShoptea:async(req,res)=>{
        const {name,address,lon,lat}=req.body
       try{
        const findshoptea=await shopteaModel.findOne({address})
        if(findshoptea){
            res.send("shoptea đã tồn tại")
        }
        else{
            const shoptea= await shopteaModel.create({name,address,lon,lat})
            res.send(shoptea)
        }
       }
       catch(error){
        console.log(error)
        res.status(500).send('Có lỗi xảy ra!')
       }
    }

}
module.exports=shopteaController;