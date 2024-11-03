import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import ActiveQuiz from "../Quiz/Preview";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import * as db from "../Database";
import Quizzes from "./Quizzes";

export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = db.default.courses.find((course) => course._id === cid);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
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
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Quizzes/:qid" element={<ActiveQuiz />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
