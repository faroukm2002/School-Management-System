import { globalError } from "./middleware/globalErrorMiddleware.js";
import adminRouter from "./modules/admin/admin.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import ClassLevelRouter from "./modules/class/class.routes.js";
import studentRouter from "./modules/student/student.routes.js";
import subjectRouter from "./modules/subject/subject.routes.js";
import teacherRouter from "./modules/teacher/teacher.routes.js"
import { AppError } from "./utils/AppError.js";

export function bootstrap(app){
    app.get('/', (req, res) => res.send('Hello World!'))  

    app.use("/api/v1/teacher",teacherRouter)
    app.use("/api/v1/subject",subjectRouter)
    app.use("/api/v1/class",ClassLevelRouter)
    app.use("/api/v1/admin",adminRouter)
    app.use("/api/v1/auth",authRouter)
    app.use("/api/v1/student",studentRouter)

  // url error
  app.use("*", (req, res, next) => {
    next(new AppError(`invalid url ${req.originalUrl}`, 404));
  });

  // globalError
  app.use(globalError);
}
