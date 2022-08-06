require('./db')()

const { User } = require('./modle/userModle')
const express =  require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors()); 
app.use(bodyParser.json());
app.post('/api/register', async (req, res) => {
    // console.log(req.body);
    const user1 = req.body;
    console.log(user1)

    const newPassword = await bcrypt.hash(req.body.password, 10)
    const newUser =new User({
        name: user1.name,
        email: user1.email,
        password: newPassword
    })
    await newUser.save();
    try{
        await newUser.save();
        console.log("user added to the database");
        // res.send(newUser);
        res.status(201).json(newUser)

    } catch (err){
        console.log(err.message);

    }
// try{
//    await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     })
//     res.json("user Response",)
// }
// catch(err){
//     console.log("user post Error",err);
//     res.status(400).send(err);
// }

  
})
app.post('/api/login', async (req, res) => {

    console.log(req.body);
    
      const user = await User.findOne({
           
            email: req.body.email,
           
        })
        if(!user){
            return res.status(400).send("User not found");
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'secret123'
            )
    
            return res.json({ status: 'ok', user: token })
        } else {
            return res.json({ status: 'error', user: false })
        }
  
      
    })
    


    



app.listen(8000, (req, res) => {
console.log('server runnning  on port 8000');
})