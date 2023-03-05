const { string } = require('joi')
const mongoose = require('mongoose')

const roles = ['ADMIN', 'TECHNICIEN', 'INGENIEUR']

const profileSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     unique: true,
    //     ref: 'user'
    // },
    // nom: {
    //     type: String,
    //     required: true
    // },
    // prenom: {
    //     type: String,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     required: true
    // },
    // cin: {
    //     type: String,
    //     required: true,
    //     min: 8
    // },
    // role: {
    //     type: String,
    //     required: true,
    //     enum: roles,
    //     default: ''
    // },
    // photo: {
    //     type: String,
    // },
    // specialite: {
    //     type: String,
    // },
    avatar: {
        type: String,
    }
},
)
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next()
//     try {
//         const salt = await bcrypt.genSalt(12)
//         this.password = await bcrypt.hash(this.password, salt)
//     } catch (error) {
//         return next(error)
//     }
// })

module.exports = Profile = mongoose.model('profile', profileSchema)