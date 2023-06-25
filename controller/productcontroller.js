const express=require('express')
const {productModel} =require('../models/product')
const productController={
    getAllProduct:async(req,res)=>{
        try{
            const  product= await productModel.find()
            res.send(product)
        }
        catch(error){
               console.error(error);
               res.status(500).send(error);
        }
    },
    addProduct:async(req,res)=>{
        try{
            const{img,title,price,type}=req.body
            const findproduct=await productModel.findOne({title})
            if(findproduct) {
                res.send("sản phẩm đã tồn tại")
            }
            else{
                const product=await productModel.create({img,title,price,type})
                res.send(product)
            }
        }
        catch(error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    deleteProduct:async(req,res)=>{
      const {_id} =req.body
          try{
             productdelete=await productModel.findByIdccccc(_id)
             if(productdelete){
                 await productModel.findByIdAndDelete(_id)
                 .then((data)=>
                 res.json({
                     message:`da xoa thanh cong`,
                     data
                   })
                   ).catch((err)=>res.json(err))
             }
             else{
                res.send("user không tồn tại")
             }
          }
          catch(error){
            console.error(error);
            res.status(500).send(error);
          }
    },
    updateProduct: async(req,res)=>{
        const { _id, title, price, img, type } = req.body
        try{
          const product = await productModel.findById(_id);
          if(product){
            await productModel.findByIdAndUpdate(_id, {title, price, img, type})
            .then((updatedProduct)=>{
              res.json({
                message: "Cập nhật thông tin sản phẩm thành công",
                updatedProduct
              })
            })
            .catch((err)=>{
              res.json(err);
            })
          } else {
            res.send("Sản phẩm không tồn tại");
          }
        } catch(error){
          console.error(error);
          res.status(500).send(error);
        }
      }
}
module.exports=productController;