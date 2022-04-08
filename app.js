const express= require('express');

const app= express();

const session= require("express-session");

app.use(session({secret:"123456", saveUninitialized:true, resave:true}))



const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/student",{useNewUrlParser:true, useUnifiedTopology:true}).then((result)=>{
    if (result) {
        console.log("connected to db");
        app.listen(5000, ()=>{
            console.log("http://localhost:5000/");
        })
    }
})


const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));





app.use(express.static('static'));

app.set("view engine","ejs");

//databases
const student =require("./models/student");
const { add } = require('nodemon/lib/rules');























//deleteitem route
app.get('/delete/:ids',(req,res)=>{
    const id= req.params.ids;
    var sess =req.session;
    var now= new Date()
    student.findOne({matricnumber:id},(err,data)=>{
            if (err){
                console.log(err);
            }else{
                if (data) {
                    student.remove({matricnumber:id},(err)=>{
                        if (err) {
                            console.log(err);
                        }else{
                            console.log("deleted");
                            student.find({},(err,data)=>{
                                if (err) {
                                    console.log(err);
                                } else {
                                    // if (data) {
                                        console.log(data);
                                        res.render('sdirectory',{strs:data,msg:""});
                                    // }else{
                                    //     res.render('home',{data});
                                    // }
                                    
                                }
                            })
                        
                        }
                    })
                }else{
                    res.redirect("/")
                }
            }
        })
})

















//subtract quantity
app.get('/update/:ids',(req,res)=>{
    var id= req.params.ids;
 
        student.findOne({matricnumber:id},(err, data)=>{
            if (err) {
                console.log(err);
            }else{
                if (data) {
                    
                        // window.alert("empty")    
                        res.render("editstudent",{studentdet:data,msg:""})

                  //  }
                    // console.log();
                }else{
                    res.redirect('/unknowndata')
                }
            }
        })
   
})




app.get('/personal/:ids',(req,res)=>{
    var id= req.params.ids;
 
        student.findOne({matricnumber:id},(err, data)=>{
            if (err) {
                console.log(err);
            }else{
                if (data) {
                    
                        // window.alert("empty")    
                        res.render("personalfolder",{strs:data})

                  //  }
                    // console.log();
                }else{
                    res.redirect('/unknowndata')
                }
            }
        })
   
})





app.post('/update/:ids',(req,res)=>{
    var id= req.params.ids;
    var cllect= req.body
        student.findOne({matricnumber:id},(err, data)=>{
            if (err) {
                console.log(err);
            }else{
                if (data) {
                        // window.alert("empty")    
                        student.updateOne({matricnumber:id},{
                            
                            nickname:cllect.nickname,
                            firstname:cllect.firstname,
                            middlename:cllect.middlename,
                            lastname:cllect.lastname,
                            email:cllect.email,
                            gender:cllect.gender,
                            stateoforigin:cllect.stateoforigin,
                            matricnumber:cllect.matricnumber,
                            department:cllect.department,
                            faculty:cllect.faculty,
                            gpa:cllect.gpa,

                            yearofintake:cllect.yearofintake,
                            monthofintake:cllect.monthofintake,
                            entryage:cllect.entryage,

                            expectedyearofentry:cllect.expectedyearofentry,
                            country:cllect.country
                        
                        },(err)=>{
                            if(err){
                                console.log(err);
                            }else{
                                // addhistory.date = now.getDate+"-"+toString(now.getMonth)+"-"+toString(now.getFullYear)+"--"+toString(now.getHours)+":"+toString(now.getMinutes);
                                console.log("updated");
                                student.find({},(err,data)=>{
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        // if (data) {
                                            console.log(data);
                                            res.render('sdirectory',{strs:data,msg:""});
                                        // }else{
                                        //     res.render('home',{data});
                                        // }
                                        
                                    }
                                })
                            
                                // res.jsonp({success:true})
                            }
                        })

                  //  }
                    // console.log();
                }else{
                    res.redirect('/unknowndata')
                }
            }
        })
   
})




















app.get("/sdirectory/:matricnumber", function(request,response){
 


    var data = request.body
    var mtrick =request.params.matricnumber
 
 
     student.find({matricnumber:mtrick},(err,data)=>{
         if (err) {
             console.log(err);
         } else {
             // if (data) {
                 console.log(data);
                 res.render('sdirectory',{strs:data});
             // }else{
             //     res.render('home',{data});
             // }
             
         }
     })
 
 
 })












 app.get("/sdirectory", function(request,response){
 
    var values = request.body
 
     student.find({},(err,data)=>{
         if (err) {
             console.log(err);
         } else {
             // if (data) {
                 console.log(data);
                 response.render('sdirectory',{strs:data,msg:""});
             // }else{
             //     res.render('home',{data});
             // }
             
         }
     })
 
 
 })
 
 

 
 app.post("/search", function(request,response){
   
    var searchdata = request.body

    student.find({matricnumber: searchdata.search},(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            if (data.length>0) {
                console.log(data);
                response.render('sdirectory',{strs:data,msg:""});
            }else{
                console.log("none");
                response.render('sdirectory',{strs:data,msg:"no search results found"});
             }
            
        }
    })

 })


 
app.post("/insertstudent",function(req,res){
    var newReg = student()

    newReg.nickname = req.body.nickname
    newReg. gpa = req.body.gpa
    newReg.firstname = req.body.firstname
    newReg.middlename = req.body.middlename
    newReg.lastname = req.body.lastname
    newReg.email = req.body.email
    newReg.gender = req.body.gender
    newReg.stateoforigin = req.body.stateoforigin

    newReg.matricnumber = req.body.matricnumber
    newReg.department = req.body.department
    newReg.faculty = req.body.faculty
    newReg.yearofintake = req.body.yearofintake
    newReg.monthofintake = req.body.monthofintake
    newReg.entryage = req.body.entryage
    newReg.expectedyearofentry = req.body.expectedyearofentry
    newReg.country = req.body.country
    
    newReg.save().then(() =>{ 
        student.find({},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                // if (data) {
                    console.log(data);
                    res.render('sdirectory',{strs:data,msg:""});
                // }else{
                //     res.render('home',{data});
                // }
                
            }
        })
    
        console.log("student saved")
    })
    })
    
    




app.get("/about", function(request,response){
    console.log("about page enterred")
    response.render("about")
})






app.get("/addstudent", function(request,response){
    console.log("add student page enterred")
    response.render("addstudent")
})
















//update
//delete
//search






app.get("/", (req,res)=>{

    console.log("home page enterred")
    res.render('login', {msg:"Catalog Login"});
 //   res.render("login")
   
    
})



app.get("/checkpassword", (req,res)=>{
    // const user="admins";
    // const pass ="tomtomElly";

    // var collect = req.body;

    // console.log("login clicked")

    // if(collect.username==user && collect.password==pass ){
    //     console.log("password correct, home page enterred")
    //     res.render('home');
    // }else{
        // console.log("incorrect login")
        res.render('login', {msg:""});
    // }


})


app.post("/checkpassword", (req,res)=>{
    const user="admins";
    const pass ="tomtomElly";

    var collect = req.body;

    console.log("login clicked")

    if(collect.username==user && collect.password==pass ){
        console.log("password correct, home page enterred")
        res.render('home');
    }else{
        console.log("incorrect login")
        res.render('login', {msg:"incorrect password"});
    }


})


app.get("/login", (req,res)=>{

    // var password =req.params.password
    // var username =req.params.username

    // if(!username){
    //   return;
    // }


    // if(!password){
    //     return;
    // }

    console.log("home page enterred")
    res.render("home", {msg:""})
   
    
})


app.get("/search", (req,res)=>{

    console.log("search page enterred")
    res.render("search", {msg:""})
   
    
})