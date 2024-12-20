import { Navigate, Route, Routes, useParams, useLocation } from 'react-router';
import CoursesNavigation from './Navigation';
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/Editor';
import QuizDetails from './Quizzes/details';
import QuizEditor from './Quizzes/editor';
import QuizPreview from './Quizzes/Preview/index';
import { FaAlignJustify } from 'react-icons/fa';
import PeopleTable from './People/Table';
import Quizzes from './Quizzes';
import * as courseClient from './client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import QuizResults from './Quizzes/Preview/QuizResults';

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);

  const course = courses.find((course) => course._id === cid);
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quizId = pathname.split('/')[5];
  const quiz = quizzes.find((quiz: any) => quiz._id === quizId);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await courseClient.findUsersForCourse(course._id);
      setEnrolledUsers(users);
    };
    fetchUsers();
  }, [course._id]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split('/')[4]}
        {quiz && quiz.title ? (
          <>
            <span className="text-danger"> {' > '} </span>
            <span className="text-secondary">{quiz.title}</span>
          </>
        ) : null}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill ">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Assignments/new" element={<AssignmentEditor />} />
            <Route path="Quizzes/new" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/results" element={<QuizResults />} />
            <Route
              path="People"
              element={<PeopleTable users={enrolledUsers} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
