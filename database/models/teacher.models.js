import { Schema,Types,model } from "mongoose"

const teacherSchema = new Schema({
    
    // personal information
    firstname:{
            type:String,
            required: [true, 'firstname is required'],
            trim:true,
            min: [2, 'minimum length 2 char'],
            max: [20, 'max length 2 char']
    },
   lastname:{
        type:String,
        required: [true, 'lastname is required'],
            trim:true,
            min: [2, 'minimum length 2 char'],
            max: [20, 'max length 2 char']
        },


phone:{
    type:Number,
    unique:true,
    required:true,
    trim:true,
},
Address:{
    type:String,
    required:true,
    trim:true,
},
image:{
    type:String,
    // required:true,
},
dateOfBirth:{
    type:Date,
    required:true,
    trim:true,
},
placeOfBirth:{
    type:String,
    required:true,
    trim:true,
}, 


// email: {
//     type: String,
//     unique: [true, 'email must be unique value'],
//     required: [true, 'email is required'],
// },
// password: {
//     type: String,
//     required: [true, 'password is required'],
// },
role: {
    type: String,
    enum:['admin','teacher'],
    default:'techer',
    // required: [true, 'role is required'],

    
},


// Education Information
university:{
    type:String,
    required:true,
    trim:true,
},
degree:{
    type:String,
    required:true,
    trim:true,
},

city:{
    type:String,
    required:true,
    trim:true,
},


    started_date: {
        type: Date
    },
    finished_date: {
        type: Date
    },
     


    subject:{
        type:Schema.ObjectId,
        ref:"subject",
      },
 
},{timeStamp:true});

export const teacherModel=model('teacher',teacherSchema)
 