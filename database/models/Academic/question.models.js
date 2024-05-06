import { Schema,model } from "mongoose"

const questionSchema = new Schema({
    
    question:{
            type:String,
            required:true,
            trim:true,
    },

optionA: {
    type:String,
    required: true
},

optionB: {
    type:String,
    required: true
},
optionC: {
    type:String,
    required: true
},
optionD: {
    type:String,
    required: true
},

correctAnswer: {
    type:String,
    required: true
},
Incorrect: {
    type:String,
    default: false
},
createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
    required: true
},
 
},{timeStamp:true});

export const questionModel=model('question',questionSchema)