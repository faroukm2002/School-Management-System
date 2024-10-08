import { Schema,Types,model } from "mongoose"

const academicTermSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name of year is required'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'description is required'],
        trim: true,
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
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
    }
},{ timeStamp: true });

export const academicTermModel = model('academicTerm', academicTermSchema);
