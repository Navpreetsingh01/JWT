const mongoose = require('mongoose');

const url = process.env.DATABASE_URL;

mongoose.connect(url,{useNewUrlParser:true ,useUnifiedTopology: true, useCreateIndex: true} ,(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})


