import { Product } from "../models";
import multer from "multer";
import path from "path";
import {CustomErrorHandler} from "../services";
import Joi from "joi";
import fs from "fs";
import productSchema from "../validators/productValidator";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage }).single("image");

const productController = {
    async store(req, res, next){

        
        upload(req, res, async (err) =>{
            if(err){
                return next(CustomErrorHandler.serverError(err.message));
            }
           

            const filePath = req.file.path;
            // validation
            const {error} = productSchema.validate(req.body);
            console.log(req.body)

            
            // if error delete the uploaded image
            if(error){

                const rootPath = path.join(appRoot, filePath);
                fs.unlink(rootPath, err =>{
                    if(err){
                        return next(CustomErrorHandler.serverError(err.message));
                    }
                    
                });

                return next(error);
            }




            const { name, price, size } = req.body;
            let product = new Product({
                    name, 
                    price, 
                    size, 
                    image: filePath
            });

            let result;
            try {
                result = await product.save();

            } catch (error) {
                next(error)
            }

            // console.log(result)
            res.status(201).json(result);
     
        });  
    },


    async update(req, res, next){

        upload(req, res, async (err) =>{
            if(err){
                return next(CustomErrorHandler.serverError(err.message));
            }
           
            let filePath;
            if(req.file){
                filePath = req.file.path;
            }


            // validation
            
            const {error} = productSchema.validate(req.body);

            // if error delete the uploaded image
            if(error){

                if(req.file){
                    const rootPath = path.join(appRoot, filePath);
                    fs.unlink(rootPath, err =>{
                        if(err){
                            return next(CustomErrorHandler.serverError(err.message));
                        }
                    
                    });
                }

                return next(error);
            }




            const { name, price, size } = req.body;

            let product = {
                    name, 
                    price, 
                    size, 
                    ...(req.file && {image: filePath})       
            }

            let result;
            try {
                result = await Product.findByIdAndUpdate(req.params.id,product, {new : true});

                if(result === null){
                    return next(CustomErrorHandler.invalidProductId())
                }
            } catch (error) {
                next(error)
            }

            // console.log(result)
            res.status(201).json(result);
     
        });  
    },


    async delete(req, res, next){

        let result;
        try {
            result = await Product.findByIdAndDelete(req.params.id);

            if(result === null){
                return next(CustomErrorHandler.invalidProductId())
            }

            // delete image
            
            const rootPath = path.join(appRoot, result.image);
            fs.unlink(rootPath, err =>{
                if(err){
                    return next(CustomErrorHandler.serverError(err.message));
                }
                
            });

        } catch (error) {
            return next(error.message)
        }  

        res.status(201).json({status: "success"})
    },

    async getOneProduct(req, res, next){

        let result;
        try {
            result = await Product.findById(req.params.id);

            if(result === null){
                return next(CustomErrorHandler.invalidProductId())
            }

        } catch (error) {
            return next(error.message)
        }  

        res.status(201).json(result)
    },

    async getAllProducts(req, res, next){

        let result;
        try {
            result = await Product.find().select("-updatedAt -__v").sort({createdAt: -1});
            if(result === null){
                return next(CustomErrorHandler.invalidProductId())
            }

            

        } catch (error) {
            console.log(error.message)
            return next(error.message)
        }  

        res.status(201).json(result)
    }













}

export default productController;