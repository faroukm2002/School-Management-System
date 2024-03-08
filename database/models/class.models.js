import { Schema,Types,model } from "mongoose"

const classSchema = new Schema({
    
    name:{
            type:String,
            required: [true, 'name is required'],
            trim:true,
            min: [2, 'minimum length 2 char'],
            max: [20, 'max length 2 char']
    },

    description:{
        type:String,
        required: [true, 'description is required'],
        trim:true,
        min: [2, 'minimum length 2 char'],
        max: [1000, 'max length 2 char']
},

createdby: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true
},
updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
},
teachers: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
},

subjects: {
    type: Schema.Types.ObjectId,
    ref: 'subject',
},

student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
},

 
},{timeStamp:true});

export const classModel=model('class',classSchema)
 