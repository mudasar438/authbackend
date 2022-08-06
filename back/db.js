'use strict';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://root:root@cluster0.uwscieq.mongodb.net/multer?retryWrites=true&w=majority', {
      
    }).then(()=>{
        console.log('Database is connected');
    }).catch(err => console.log(err))

}