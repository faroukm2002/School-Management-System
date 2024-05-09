import { examModel } from "../../../database/models/Academic/exam.models.js";
import { examResultModel } from "../../../database/models/Academic/examResult.models.js";
import { studentModel } from "../../../database/models/student.models.js";
import { teacherModel } from "../../../database/models/teacher.models.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import { deleteOne } from "../handlers/refactor.js";

//  Add Exam
const addExam = catchError(async (req, res, next) => {
  req.body.createdby = req.user._id;
  const teacher = await teacherModel.findById(req.user._id);
  if (!teacher) return next(new AppError("teacher not found", 404));

  const existExam = await examModel.findOne({ name: req.body.name });
  if (existExam) return next(new AppError("Exam already exists", 404));

  const newExam = await examModel.create(req.body);
  teacher.exams.push(newExam);
  await teacher.save();
  res.status(201).json({ message: "Done", newExam });
});

// Get Exams
const getAllExams = catchError(async (req, res, next) => {
  let Exam = await examModel
    .find()
    .populate({
      path: "questions",
      select: "-correctAnswer -Incorrect -updatedAt -createdAt",
      populate: {
        path: "createdBy",
        select: "Name",
      },
    })
    .select(" Name duration questions ");
  res.status(201).json({ message: "Done this is Exam", Exam });
});

//  Get ExamBY_ID

const getExamByID = catchError(async (req, res, next) => {
  const Exam = await examModel.findById(req.params.id);
  !Exam && next(new AppError("Exam not found", 404));

  Exam && res.status(201).json({ message: "this is Exam", Exam });
});

const updateExam = catchError(async (req, res, next) => {
  const { id } = req.params;
  const Exam = await examModel.findByIdAndUpdate(id, req.body, { new: true });
  !Exam && next(new AppError("Exam not found", 404));

  Exam && res.status(201).json({ message: "this is Exam", Exam });
});

const deleteExam = deleteOne(examModel, "Exam");

  
//  student writeExam
const writeExam = catchError(async (req, res, next) => {
  const student = await studentModel.findById(req.user._id);
  if (!student) return next(new AppError("student not found", 404));

  if (student.IsSuspended || student.Iswitdrawn)
    return next(
      new AppError(
        "You can not take this exam you are IsSuspended  or Iswitdrawn",
        404
      )
    );

  const exam = await examModel
    .findById(req.params.id)
    .populate("questions")
    .populate("academicTermId");
  if (!exam) return next(new AppError("exam not found", 404));

  const questions = exam.questions
  console.log(exam);

  const examResult = await examResultModel.findOne({
    studentId: student._id,
    examId: exam._id,
  });
  
  if (examResult)
    return next(new AppError("You have aready tack this exam", 404));




  //check if student answer All Questios

  const studentAnswer = req.body.answers
  if (questions.length != studentAnswer.length) 
  
      return next(new AppError("you have answer all questions", 404));

  
  let correctAnswer = 0
  let wrongAnswer = 0
  let score = 0
  let answeredQuestions = 0
  let grade = 0
  let totalQuestion = 0
  let status = ""
  let remark = ""

  // check  exam Answers
  for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      if (question.correctAnswer === studentAnswer[i]) {
          correctAnswer++
          score++
          question.Incorrect = true
      } else {

          wrongAnswer++

      }

  }
  /// Exam Report
  totalQuestion = questions.length
  grade = (correctAnswer / totalQuestion) * 100
  answeredQuestions = questions.map(question => {
      return {
          question: question.question,
          correctAnswer: question.correctAnswer,
          Incorrect: question.Incorrect
      }

  })

  // student status
  if (grade >= 50) {
      status = "passed"
  } else {
      status = "failed"
  }

  // remark
  if (grade >= 80) {
      remark = "Excellent"
  } else if (grade >= 70) {
      remark = "Very good"
  } else if (grade >= 60) {
      remark = "good"
  } else if (grade >= 50) {
      remark = "fair"
  } else {
      remark = "poor"
  }

  // // assgin resualt 
  const finalResualt = await examResultModel.create({
    studentId: exam._id,
    examId: student._id,    
    classLevelId: exam.classLevel,
    academicTermId: exam.academicTermId,
    academicYearId: exam.academicYearId,
    grade,
    score,
    remark,
    status,
    answerQesutions: answeredQuestions,
})

  // push resualt to student
  student.examResults.push(finalResualt)
  student.exams.push(exam)

  await student.save()

  res.status(201).json({ message: " you are Submit  come back for check  resualt later",finalResualt
  })

})
export { 
    addExam,
     getAllExams,
      getExamByID,
       updateExam,
        deleteExam,
        writeExam
     };
