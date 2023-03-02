const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const { generateToken, verifToken } = require('../utils/generateToken');
require("dotenv").config();
const { sendEmail } = require('../utils/sendPasswordRecoveryMail');
const { config } = require('dotenv');



const registerUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const { nom, prenom, email, password, role } = req.body
    try {
        // email existe
        let user = await User.findOne({ email: email })
        if (user) {
            return res.json({ msg: "utilisateur déja existe" })
        }
        // else define new user
        user = new User({
            nom, prenom, email, password, role
        })
        // save new user
        await user.save()
        // implement jwt
        // const payload ={
        //     user :{
        //         id: user.id
        //     }
        // }
        // jwt.sign(payload , "feefefefefe", {expiresIn : 7200000},(error , token)=>{
        //     if (error) throw error
        //     res.json({token})
        // })
        res.status(200).send({ status: true })

    } catch (error) {
        console.error('erreur', error)
        res.status(400).send({ status: false })

    }
}
const loginUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array({ onlyFirstError: true }) })
    }

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Cannot find user with those credentials!' }]
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Cannot find user with those credentials!' }]
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }, (error, token) => {
            if (error) throw error
            res.json({ token })
        })

    } catch (error) {
        console.error('fff', error.message)
        res.json({ msg: 'Erreur de serveur!' })
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        res.json(user)
    } catch (error) {
        console.error('fff', error.message)
        res.json({ msg: 'Erreur de serveur!' })
    }
}
const sendForgetPasswordEmail = async (req, res) => {

    const email = req.body['email']
    console.log("hjnkl;m:", email)
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Cannot find user with those credentials!' }]
            })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const token = await generateToken(payload)

        // console.log("emaiiil", req.body);
        await sendEmail(email, token)
        res.status(200).json({ msg: 'Email sent!' })
    } catch (error) {
        console.error('fff', error.message)
        res.json({ msg: 'Erreuur de serveur!' })
    }
}
const updatePassword = async (req, res) => {
    try {
        const verif = await verifToken(req.params.token)
        console.log("vvvvvvvvvv", verif)

        if (!verif) {
            return res.status(400).json({
                status: false, message: 'Invalid Token !'
            })
        }
        const user = await User.findOne({ _id: verif.user.id })




        if (!user) {
            return res.status(400).json({
                status: false, message: 'Cannot find user with those credentials!'
            })
        }

        const salt = await bcrypt.genSalt(12)
        const newpassword = await bcrypt.hash(req.body.password, salt)
        const result = await User.findByIdAndUpdate(verif.user.id, { $set: { password: newpassword } })
        console.log(result)
        res.send({ status: true, message: 'passorw updated successfully' })
    } catch (error) {
        console.log(error)
        // return res.status(400).json({
        //     errors: [{ msg: 'Cannot find user with those credentials!' }]
        //   })
    }
}
module.exports = { registerUser, getUser, loginUser, sendForgetPasswordEmail, updatePassword }