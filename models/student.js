const mongoose= require("mongoose");

const Schema = mongoose.Schema;



const Student = new Schema({
    nickname:String,
    gpa:String,
    firstname:String,
    middlename:String,
    lastname:String,
    email:String,
    gender:String,
    stateoforigin:String,
    matricnumber:String,
    department:String,
    faculty:String,
    yearofintake:String,
    monthofintake:String,
    entryage:String,
    expectedyearofentry:String,
    country:String,

})

const addStudent= mongoose.model("addStudent",Student);


module.exports= addStudent;