import { Schema,Types,model } from "mongoose"

const yeargroupSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name of year is required'],
        trim: true,
    },
    academicYear:{
        type:Schema.Types.ObjectId,
        ref:"academicYear",
        required:true
        },
    duration:{
        type: String,
        required: true,
        default: "3 months"
    },
    createdby: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
  
},{ timeStamp: true });

export const yeargroupModel = model('yeargroup', yeargroupSchema);
