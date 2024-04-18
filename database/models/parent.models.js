import { Schema,Types,model } from "mongoose"
import bcrypt from 'bcrypt';

const parentSchema = new Schema({
    
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
        default:'parent',
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

children:{
        type:Schema.ObjectId,
        ref:"student",
      },
 
},{timeStamp:true});


// hash password 
parentSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND))
})

parentSchema.pre('findOneAndUpdate',function(){
    // console.log(this)
        if(this._update.password)this._update.password=bcrypt.hashSync(this._update.password,parseInt(process.env.SALTROUND))
    })
    
export const parentModel=model('parent',parentSchema)
 