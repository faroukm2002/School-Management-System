import { Schema,Types,model } from "mongoose"

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
    default: 'Admin',
    required: [true, 'role is required'],

},
confirmEmail: {
    type: Boolean,
    default:false,

},
classLevel: {
    type: Schema.Types.ObjectId,
    ref: "class"
},
// AcademicYear:{
//     type: Schema.Types.ObjectId,
//     ref: "AcademicYear"
// },
// Academicterm: {
//     type: Schema.Types.ObjectId,
//     ref: "Academicterm"
// },
teachers: {
    type: Schema.Types.ObjectId,
    ref: "teacher"
},
studens: {
    type: Schema.Types.ObjectId,
    ref: "student"
},
// progrm: [{
//     type: Schema.Types.ObjectId,
//     ref: "Program"
// }],

}, {
timestamps: true
})


 

export const subjectModel=model('admin',adminSchema)
 