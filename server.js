require('dotenv').config()
require('./db/conn');
const Register = require('./model/registration.model')

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const bcrypt = require("bcryptjs")


app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());




//! Endpoints

app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/registration", (req,res)=>{
    res.render("registeration", )
})
app.post("/registration", async (req,res)=>{
    const password = req.body.password
    const cpassword = req.body.cpassword
    try{
        
        if(password === cpassword){
            var registerStudent = new Register({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password:password
                
            })
            const token = await registerStudent.generateToken()
            
            const result = await registerStudent.save()
            res.redirect("/login")
            console.log(result)
            
        }else{
            res.send("Passwords are not matching")
        }      
    }catch(e){
        res.redirect("/registration")
        console.log("Error in registering")
    }
    
   
})
app.get("/login", (req,res)=>{
    res.render("login")
})

app.post("/login", async (req, res)=>{
    try{
        const username = req.body.name
        const password = req.body.password

    const user = await Register.findOne({name: username})
    const token = await user.generateToken()
    console.log(token)
    const isMatch = await bcrypt.compare(password, user.password )

    if(isMatch){
       res.send("Welcome")
    }else{
        res.send("Invalid password" )
    }

    }catch(e){
        res.send("Invalid login details")
    }
    

})





//! Listening to server

app.listen(port, ()=>{
    console.log(`The server is running on the port ${port}`)
})