const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

// Créer un nouveau profil utilisateur
router.post('/', async (req, res) => {

});



// Récupérer un profil utilisateur par son ID
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profil utilisateur non trouvé' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// Mettre à jour un profil utilisateur par son ID
router.put('profile/:id', async (req, res) => {
    try {
        const { name, lastname, cin, email, role, speciality } = req.body;
        const profile = await Profile.findByIdAndUpdate(req.params.id, {
            name,
            lastname,
            cin,
            email,
            role,
            speciality
        }, { new: true });
        if (!profile) {
            return res.status(404).json({ message: 'Profil utilisateur non trouvé' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});



module.exports = router;