import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButton";
import AssignmentHeadingControlButtons from "./AssignmentHeadingControlButtons";
import { PiNotePencilDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router";
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProtectedRoute from "../../Account/ProtectedRoute";


export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const todaysDate = new Date().setHours(0, 0, 0, 0);
    const isFaculty = currentUser.role && currentUser.role === 'FACULTY';

    return (
        <div>
            {isFaculty && <AssignmentsControls />}
            <ul id="wd-assignment-list" className="list-group rounded-0">
                <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        {isFaculty && <BsGripVertical className="me-2 fs-3" />}
                        <IoIosArrowDown />
                        <span className="px-3"><b>ASSIGNMENTS</b></span>
                        {isFaculty && <AssignmentHeadingControlButtons />}
                        <div className="float-end">
                            <span className="border border-dark p-2 rounded-5">40% of Total</span>
                        </div>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {assignments
                            .filter((assignment: any) => assignment.course === cid)
                            .map((assignment: any) => (
                                <li className="wd-assignment-list-item list-group-item p-3 ps-1 py-0">
                                    <div className="d-flex mb-3">
                                        <div className="p-2 my-auto">
                                            {isFaculty && < BsGripVertical className="me-2 fs-3" />}
                                            <PiNotePencilDuotone className="me-2 fs-5" />
                                        </div>
                                        <div className="p-2 my-auto">
                                            <h3>
                                                {isFaculty ?
                                                    <ProtectedRoute requiredAttribute={{ key: 'role', val: 'FACULTY', altRoute: `Courses/${cid}/Assignments` }}>
                                                        <Link className="wd-assignment-link text-dark text-decoration-none"
                                                            to={`${assignment._id}`}>
                                                            {assignment.title}
                                                        </Link>
                                                    </ProtectedRoute>
                                                    : assignment.title}
                                            </h3>
                                            <span className="text-danger"> Multiple Modules </span> | {(assignment.releaseDate && Date.parse(assignment.releaseDate.replace(/-/g, " ")) > todaysDate) ? <span><b>Not Available until </b>{format(assignment.releaseDate, "MMMM d 'at' hh:mma") + ' |'}</span> : ''} <span><b>Due</b> {format(assignment.dueDate, "MMMM d 'at' hh:mma")} | {assignment.points} pts</span>
                                        </div>
                                        <div className="ms-auto p-2 my-auto">
                                            {isFaculty && <AssignmentControlButtons />}
                                        </div>
                                    </div>
                                </li>))}
                    </ul>
                </li>
            </ul >
        </div >
    );
}
