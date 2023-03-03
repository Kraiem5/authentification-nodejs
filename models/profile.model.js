const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require("dotenv").config();

const roles = ['ADMIN', 'TECHNICIEN', 'INGENIEUR']

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    role: {
        type: String,
        required: true,

    },
    cin: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    cv: {
        type: String,

    },
    specialite: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

module.exports = Profile = mongoose.model('profile', profileSchema)