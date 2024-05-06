import { Schema,model } from "mongoose"

const examResultSchema = new Schema({
    
    status:{
            type:String,
            required:true,
            enum:['failed', 'passed'],
            default:"failed"
    },

remarm: {
    type:String,
    required: true,
    enum:['good','very good','poor','Excellent','fair'],
    default:"poor"

},

score:{
    type: Number,
    required: true,
},
grade:{
    type: Number,
    required: true,
},
passMark: {
    type: Number,
    required: true,
    default:50
},
IsPublished: {
    type: Boolean,
    default:false
},


studentId: {
    type: Schema.Types.ObjectId,
    ref: 'student',
    required: true
},
answerQesutions: [{
    type: Object,
}],
examId: {
    type: Schema.Types.ObjectId,
    ref: 'exam',
    required: true
},

academicYearId: {
    type: Schema.Types.ObjectId,
    ref:"academicYear",
    required:true
},
academicTermId: {
    type: Schema.Types.ObjectId,
    ref:"academicTerm",
    required:true
},
classLevelId: {
    type: Schema.Types.ObjectId,
    ref:"class",
    required:true
}

},{timeStamp:true});

export const examResultModel=model('examResult',examResultSchema)