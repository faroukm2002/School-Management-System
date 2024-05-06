import { Schema,Types,model } from "mongoose"
import bcrypt from 'bcrypt';

const studentSchema = new Schema({

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
        email:{
            type:String,
            required: [true, 'description is required'],
            trim:true,
            unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },


    role: {
        type: String,
        default:'student',
        required: [true, 'role is required'],


    },

    confirmEmail: {
        type: Boolean,
        default:false,

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

    subject:[{
        type:Schema.ObjectId,
        ref:"subject",
      }],

      classLevel:{
        type:Schema.ObjectId,
        ref:"class",
      },

      examResults: [{
        type: Schema.Types.ObjectId,
        ref: "examResult",
    }],

      exams: [{
        type: Schema.Types.ObjectId,
        ref:"exam",
    }],
    
    academicYear: {
        type: Schema.Types.ObjectId,
        ref:"academicYear",
    },
    
    YearGraduatd: {
        type: Date,
    },
    
    isGraduated: {
        type: Boolean,
        default:false
    }
},{timeStamp:true});


// hash password 
studentSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND))
})

studentSchema.pre('findOneAndUpdate',function(){
    // console.log(this)
        if(this._update.password)this._update.password=bcrypt.hashSync(this._update.password,parseInt(process.env.SALTROUND))
    })

export const studentModel=model('student',studentSchema)