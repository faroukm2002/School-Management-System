import { Schema,Types,model } from "mongoose"
import bcrypt from 'bcrypt';

const adminSchema = new Schema({
    
    name:{
            type:String,
            required: [true, 'name is required'],
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
        default: 'admin',
        required: [true, 'role is required'],

    },
    confirmEmail: {
        type: Boolean,
        default:false,

    },
    classLevel: [{
        type: Schema.Types.ObjectId,
        ref: "class"
    }],
    academicYears:[{
        type: Schema.Types.ObjectId,
        ref: "academicYear"
    }],
    academicTerms: [{  
        type: Schema.Types.ObjectId,
        ref: "academicTerm"
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "teacher"
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: "student"
    }],
    program: [{
        type: Schema.Types.ObjectId,
        ref: "program"
    }],

}, {
    timestamps: true
})

// hash password 
adminSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND))
})

export const adminModel=model('admin',adminSchema)
 