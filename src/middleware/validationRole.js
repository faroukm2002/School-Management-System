import { adminModel } from "../../database/models/admin.models.js";
import { parentModel } from "../../database/models/parent.models.js";
import { studentModel } from "../../database/models/student.models.js";
import { teacherModel } from "../../database/models/teacher.models.js";

 const selectModel = (role) => {
    let userCollection;

    if (role === 'student') {
        userCollection = studentModel;
    } else if (role === 'teacher') {
        userCollection = teacherModel;
    } else if (role === 'admin') {
        userCollection = adminModel;
    }
    else if (role === 'parent') {
        userCollection = parentModel;
    }
     else {
        return null;
    }
    return userCollection

}



export{
    selectModel
}