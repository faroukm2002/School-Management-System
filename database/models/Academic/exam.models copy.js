import { Schema,model } from "mongoose"

const examSchema = new Schema({
    
    name:{
            type:String,
            required: [true, 'userName is required'],
            min: [2, 'minimum length 2 char'],
            max: [20, 'max length 2 char'],
            trim:true,
    },

    description: {
    type:String,
    required: true
},

duration: {
    type:String,
    required: true
},
examDate: {
    type:Date,
    required: [true, 'examDate is required'],
},
examTime: {
    type:String,
    required: [true, 'examTime is required'],
},
examType: {
    type: String,
    required: [true, 'examType is required'],
    default: "Quiz"
},
examStatus: {
    type: String,
    enum: ['pending', 'live'],
    default: "pending"
},
questions: [{
    type: Schema.Types.ObjectId,
    ref: "question",
    required: true

}],

createdBy: [{
    type: Schema.Types.ObjectId,
    ref: "admin",
    required: true

}],
totalMark: {
    type: Number,
    required: true,
    default: 100
},
passMark: {
    type: Number,
    required: true,
    default: 50
},
subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'subject',
    required:true,
},
academicTermId: {
    type: Schema.Types.ObjectId,
    ref: 'academicTerm',
    required:true,
},
academicYearId: {
    type: Schema.Types.ObjectId,
    ref: 'academicYear',
    required:true,
},
program: {
    type: Schema.Types.ObjectId,
    ref: 'program',
    required: true
},
classLevel: {
    type: Schema.Types.ObjectId,
    ref: 'class',
    required: true
},
},{timeStamp:true});

export const examModel=model('exam',examSchema)