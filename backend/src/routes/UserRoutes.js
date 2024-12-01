const userModel = require("../models/UserModel");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
router.use(cors());

router.post("/signup",
    [ body('username').notEmpty().withMessage("Username id required."),
        body('email').notEmpty().withMessage("Email is required."),
        body('password').notEmpty().isLength({ min: 8 }).withMessage("Password is required to be at least 8 chars long.")
    ],
    async(req, res)=>{
        const {username, email, password, created_at, updated_at} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                status: false,
                message: errors.array().map(err => err.msg).join(', ')
            });
        }
        const existingUser = await userModel.findOne({
            $or: [{ email:email }, { username:username }]
        });
        if (existingUser){
            return res.status(400).json({
                status:false, message:"Username or email is already in use. Try another one."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username, email, password:hashedPassword,
            created_at: new Date(),
            updated_at: new Date()
        });
        try{
            const userNew = await user.save();
            res.status(201).json({ message: "User created succesfully.", user_id: userNew._id})
        } catch (error) {
            res.status(400).json({
                status:false,
                message: "Failed to create User", erorr: error.message
            })
        }
    }
);


router.post("/login", 
    [
        body('password').notEmpty().isLength({ min: 8 }).withMessage("Password is required to be at least 8 chars long.")
    ],
    async (req, res) =>{
        const { username, email, password} = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(400).json({
                status: false,
                message: error.array().map(err => err.msg).join(", ")
            })
        }
        if (!username && !email){
            return res.status(400).json({
                status:false,
                message: "Please enter either username or email."
            })
        }
        try{
            const user = await userModel.findOne({
                $or: [{ email: email }, { username: username }]
            });
            if(!user){
                return res.status(400).json({ 
                    status:false,
                    message: "Invalid username or email"
                });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                return res.status(400).json({
                    status:false,
                    message: "Invalid password"
                })
            }
            res.status(200).json({ 
                message: "Login succesfull. "
            });
        }catch(error){
            res.status(500).json({
                message: "An error occured when logging in", 
                error: error.message
            });
        }
    }
)

module.exports = router