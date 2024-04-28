import { Schema,Types,model } from "mongoose"

const academicYearSchema = new Schema({
    
    name:{
            type:String,
            required: [true, 'Name of year is required'],
            trim:true,
    },

createdby: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
    required: true
},

updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
}
,
teahers: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
},
students: {
    type: Schema.Types.ObjectId,
    ref: 'student',
},

    IsCurrent: {
        type: Boolean,
        default:false
    },
    fromYear: {
        type: Date,
        required: true,
    },
    ToYear: {
        type: Date,
        required: true,
    },
 
},{timeStamp:true});

export const academicYearModel=model('academicYear',academicYearSchema)