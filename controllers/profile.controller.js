const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const gravatar = require('gravatar')
const Profile = require('../models/profile.model')


// ajouter profile
const addProfile = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array({ onlyFirstError: true }) })
    }
    const { cin, specialite } = req.body;
    const cv = req.file.cv || ''
    const image = req.file.image || gravatar.url(email, { s: '200', r: 'pg', d: '404' })
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ msg: "utilisateur n' existe" })
        }

        let profile = new Profile({
            user: req.body.user,
            nom: req.body.nom,
            cin: req.body.cin,
            specialite: req.body.specialite,
            cv: cv,
            image: image,
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
}

// modifier profile
const updateUserProfile = async (req, res) => {
    const { nom, prenom, email, cin, photo, specialite } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.nom = nom || user.nom;
        user.prenom = prenom || user.prenom;
        user.email = email || user.email;
        user.profile.cin = cin || user.profile.cin;
        user.profile.photo = photo || user.profile.photo;
        user.profile.specialite = specialite || user.profile.specialite;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//***********get user */
const getUserPofile = async (req, res) => {
    const user = await User.findById(req.header._id);
    const { cin, specialite } = req.body
    const cv = req.file.cv || ''
    const image = req.file.image || gravatar.url(email, { s: '200', r: 'pg', d: '404' })
    if (user) {
        res.json({
            user: req.user.id,
            nom: req.user.nom,
            cin: req.body.cin,
            specialite: req.body.specialite,
            image: image,
            cv: cv
        })
    } else {
        res.status(404).json({
            succes: false,
            msg: 'user not found'
        })
    }
}