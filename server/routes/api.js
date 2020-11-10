const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const guser = require('../models/googleUser')
const Product = require('../models/product')
const newProduct = require('../models/newProduct')
const dummyData = require('../models/dummyData');
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')

const uri = "mongodb+srv://darkrai19:abcd1234@cluster0-s9fpb.mongodb.net/test?retryWrites=true&w=majority";

// const db = 'mongodb://localhost/newDemo'
// mongoose.connect(db,err => {
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log('database connected sucessfully')
//     }
// })

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('database connected sucessfully')
    }
})

router.get('/', (req, res) => {
    res.send('Thanos was always right')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)

    user.save((err, registeredUser) => {
        if (err) {
            console.error(err)
        }
        else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'hailsatan')
            res.status(200).send(JSON.stringify(token))
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    console.log(userData)
    User.findOne({ email: userData.email }, (err, isUser) => {
        if (err) {
            console.log(err)
        }
        else {
            if (!isUser) {
                res.status(401).send(JSON.stringify('Invalid email Id or not registered Id'))
            }
            else {
                if (userData.password != isUser.password) {
                    res.status(401).send(JSON.stringify('Wrong password'))
                }
                else {
                    let payload = { subject: isUser._id }
                    let token = jwt.sign(payload, 'hailsatan')
                    res.status(200).send(JSON.stringify(token))
                }
            }
        }
    })
})

router.post('/glogin', (req, res) => {
    let userData = req.body;
    console.log('g user data', userData);
    guser.findOneAndUpdate(
        { gId: userData.gId },
        {
            $push: { gusers: userData },
        },
        { upsert: true },
        (err, doc) => {
            if (err) {
                console.log('glogin error', err);
                res.send(500).send(err);
            } else {
                res.sendStatus(200);
            }
        }
    );
})

router.get('/data', (req, res) => {
    const options = {
        page: req.query.page,
        limit: 10
    };
    dummyData.paginate({}, options).then((result) => {
        setTimeout(function () {
            res.status(200).send(result);
        }, 2000)
    }).catch((error) => {
        res.status(500).send(error);
    })
})
router.delete('/deletedata', (req, res) => {
    const id = req.body.id
    dummyData.findByIdAndDelete({ _id: id }, (err, obj) => {
        if (err) {
            res.status(500).send(JSON.stringify('Not deleted'))
        }
        else {
            res.status(200).send(obj)
        }
    })
})

router.post('/addProduct', (req, res) => {
    let productData = req.body
    console.log(productData)
    dummyData.insertMany(productData, (error, docs) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(docs);
        }
    })
})

//method to verify the token 
function verifyToken(req, res, next) {

    if (!req.headers.authorizaiton) {
        res.status(401).send('Unauthorized Request')
    }
    else {
        let token = req.headers.authorizaiton.split(' ')[1]
        // console.log(token)
        // console.log('token received')

        if (token === 'null') {
            res.status(401).send('Unauthorized Request')
        }
        else {
            jwt.verify(token, 'hailsatan', (err, verifiedToken) => {
                if (err) {
                    res.status(401).send('wrong token')
                }
                else {
                    req.userId = verifiedToken.subject
                    next()
                }
            })
        }
    }
}
module.exports = router