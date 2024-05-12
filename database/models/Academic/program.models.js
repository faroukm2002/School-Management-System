import { Schema,model } from "mongoose"

const programSchema = new Schema({
    
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
    required: [true, 'duration is required'],
    default:"4 years"

},
code:{
    type:String,
    required:true
},
createdBy: {
    type:Schema.Types.ObjectId ,
    ref: 'admin',
   required:true
},
updatedBy: {
    type:Schema.Types.ObjectId ,
    ref: 'admin',
},
teachers: [{
    type:Schema.Types.ObjectId ,
    ref: 'teacher',

}],
students:[ {
    type:Schema.Types.ObjectId ,
    ref: 'student',
}], 
 subjects:[{
    type:Schema.Types.ObjectId ,
    ref: 'subject',
}],
}, {
timestamps: true,
toJSON:{virtuals:true},
toObject:{virtual:true}

})

programSchema.virtual("mysubject",{
ref:"subject",
localField:"_id",
foreignField:"programId"
})
programSchema.pre(/^find/,function(){
    this.populate('mysubject') 
 })

export const programModel=model('program',programSchema)