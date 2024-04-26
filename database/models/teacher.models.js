import { Schema, Types, model } from "mongoose";
import bcrypt from 'bcrypt';

const teacherSchema = new Schema({
    // Personal information
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
        trim: true,
        minlength: [2, 'Minimum length 2 characters'],
        maxlength: [20, 'Max length 20 characters']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        trim: true,
        minlength: [2, 'Minimum length 2 characters'],
        maxlength: [20, 'Max length 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        default: 'teacher',
        required: [true, 'Role is required'],
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
        trim: true,
    },
    Address: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    placeOfBirth: {
        type: String,
        required: true,
        trim: true,
    },
    // Education Information
    university: {
        type: String,
        required: true,
        trim: true,
    },
    degree: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    started_date: {
        type: Date
    },
    finished_date: {
        type: Date
    },
    subject: {
        type: Schema.ObjectId,
        ref: "subject",
    },
    classLevel: {
        type: Schema.ObjectId,
        ref: "class",
    },
}, { timestamps: true });

// Hash password 
teacherSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND));
    next();
});

teacherSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, parseInt(process.env.SALTROUND));
    next();
});

// URL image 
teacherSchema.post('init', function(doc) {
    const encodedImage = encodeURIComponent(doc.image);
    doc.image = `${process.env.BASEURL}/teacher/${encodedImage}`;
});

export const teacherModel = model('teacher', teacherSchema);
