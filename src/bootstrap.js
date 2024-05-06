import { globalError } from "./middleware/globalErrorMiddleware.js";
import academicTermRouter from "./modules/academicTerm/academicTerm.routes.js";
import academicYearRouter from "./modules/academicYear/academicYear.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import ClassLevelRouter from "./modules/class/class.routes.js";
import examRouter from "./modules/exam/exam.routes.js";
import examResultRouter from "./modules/examResult/examResult.routes.js";
import parentRouter from "./modules/parent/parent.routes.js";
import questionRouter from "./modules/question/question.routes.js";
import studentRouter from "./modules/student/student.routes.js";
import subjectRouter from "./modules/subject/subject.routes.js";
import teacherRouter from "./modules/teacher/teacher.routes.js"
import { AppError } from "./utils/AppError.js";
import express from 'express'
import path from 'path'

export function bootstrap(app){
  app.set('view engine', 'ejs'); // Set EJS as the view engine
  app.use(express.static("services"))
    app.get('/', (req, res) =>
    res.send('<h1> School Management System Home page</h1>')

    // res.render("forgetPassword.ejs")
)
    app.use("/api/v1/teacher",teacherRouter)
    app.use("/api/v1/subject",subjectRouter)
    app.use("/api/v1/class",ClassLevelRouter)
    app.use("/api/v1/admin",adminRouter)
    app.use("/api/v1/auth",authRouter)
    app.use("/api/v1/student",studentRouter)
    app.use("/api/v1/parent",parentRouter)
    app.use("/api/v1/academicTerm",academicTermRouter)
    app.use("/api/v1/academicYear",academicYearRouter)
    app.use("/api/v1/exam",examRouter)
    app.use("/api/v1/question",questionRouter)
    app.use("/api/v1/examResult",examResultRouter)

  // url error
  app.use("*", (req, res, next) => {
    next(new AppError(`invalid url ${req.originalUrl}`, 404));
  });

  // globalError
  app.use(globalError);
}
