const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const bodyParser = require('body-parser')
mongoose.set('strictQuery', false)
const Profile = require('./models/profile.model')
const cors = require('cors')
const multer = require('multer');
const path = require('path')

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, path.join(__dirname, '/upload'))
//         },
//         filename: (req, file, cb) => {
//             cb(null, Date.now() + '-' + file.originalname)
//         }

//     }),
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter: (req, file, cb) => {
//         console.log(file);
//         cb(null, true)
//     }
// })
const util = require('util')
const morgan = require('morgan')
app = express()
app.use(cors())



mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("db connected");
    }).catch(() => {
        console.log("errr");
    });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'upload')))
app.use(express.static('upload'));
app.use('/upload', express.static(__dirname + '/upload/'));
app.use('/cv', express.static(__dirname + '/cv/'));

app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
const port = process.env.port
app.listen(port, () => {
    console.log(`connected at ${port}  `);
})
app.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find({}).exec()
        console.log(profiles);
        const profil = profiles && profiles.length ? profiles[0] : null
        res.render('index', { profil })

    } catch (error) {
        console.log(error);
    }
})


// app.post('/', upload.single('avatar'), async (req, res) => {
//     // console.log(util.inspect(req.body, { compact: false, depth: 5, breakLength: 80, colors: true }));
//     // console.log(util.inspect(req.file, { compact: false, depth: 5, breakLength: 80, colors: true }));

//     try {
//         const newProfile = new Profile({
//             avatar: req.file.filename
//         })
//         const savedProfile = await newProfile.save()
//         const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`; // créer une URL complète pour l'image
//         res.json({ url: imageUrl });
//         res.redirect('/')
//     } catch (error) {
//         console.log(error);
//     }
// })

app.use((err, req, res, next) => {
    console.log(util.inspect(err, { compact: false, depth: 5, breakLength: 80, colors: true }));
    res.status(500).redirect('/')
})
//define routes
app.use('/api/user', require('./router/router'))
