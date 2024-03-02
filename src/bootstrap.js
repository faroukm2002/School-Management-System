import { globalError } from "./middleware/globalErrorMiddleware.js";
import ClassLevelRouter from "./modules/class/class.routes.js";
import subjectRouter from "./modules/subject/subject.routes.js";
import teacherRouter from "./modules/teacher/teacher.routes.js"
import { AppError } from "./utils/AppError.js";

export function bootstrap(app){
    app.get('/', (req, res) => res.send('Hello World!'))  

    app.use("/api/v1/teacher",teacherRouter)
    app.use("/api/v1/subject",subjectRouter)
    app.use("/api/v1/class",ClassLevelRouter)

  // url error
  app.use("*", (req, res, next) => {
    next(new AppError(`invalid url ${req.originalUrl}`, 404));
  });

  // globalError
  app.use(globalError);
}
