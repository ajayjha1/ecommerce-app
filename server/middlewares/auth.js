const admin = require('../firebase');
const express = require('express')
const router = express.Router();
const {authCheck} = require('../controllers/auth')
const User = require("../models/user");


exports.authCheck = async (req, res, next) => {
    console.log(req.headers.authtoken)
    // next();
    let firebaseUser = ""
    try{
        await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        .then(data =>{
            firebaseUser = data
        })
        .catch((err) =>{
            console.log(err.message)
        })
        console.log("Middelware--> Firebase user in auth check", firebaseUser);
        req.user = firebaseUser
        console.log('Middelware--> Firebase user in user--- check', req.user)
        next()
    } catch (err){
        res.status(401).json({
            err:"Middeleware error Invalid or expired token",
        })
    }
}

exports.adminCheck = async (req, res, next) =>{
    const {email} = req.user
    await User.findOne({email})
    .then((res) => {
        adminUser = res
    })
    .catch((err)=>{
        console.log(err.message)
    })

    if(adminUser.role !== 'admin'){
        res.status(403).json({
            err: "Admin resource. Access Denied."
        });
    } else{
        next();
    }
}