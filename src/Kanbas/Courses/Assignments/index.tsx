import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButton";
import AssignmentHeadingControlButtons from "./AssignmentHeadingControlButtons";
import { PiNotePencilDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import * as db from "../../Database";
import { useParams } from "react-router";
import { format } from 'date-fns';


export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.default.assignments;

    const todaysDate = new Date().setHours(0, 0, 0, 0);

    return (
        <div>
            <AssignmentsControls />
            <ul id="wd-assignment-list" className="list-group rounded-0">
                <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <IoIosArrowDown />
                        <span className="px-3"><b>ASSIGNMENTS</b></span>
                        <AssignmentHeadingControlButtons />
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
                                            <BsGripVertical className="me-2 fs-3" />
                                            <PiNotePencilDuotone className="me-2 fs-5" />
                                        </div>
                                        <div className="p-2 my-auto">
                                            <h3>
                                                <a className="wd-assignment-link text-dark text-decoration-none"
                                                    href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                                    {assignment.title}
                                                </a>
                                            </h3>
                                            <span className="text-danger"> Multiple Modules </span> | {(Date.parse(assignment.releaseDate.replace(/-/g, " ")) > todaysDate) ? <span><b>Not Available until </b>{format(assignment.releaseDate, "MMMM d 'at' hh:mma") + ' |'}</span> : ''} <span><b>Due</b> {format(assignment.dueDate, "MMMM d 'at' hh:mma")} | {assignment.points} pts</span>
                                        </div>
                                        <div className="ms-auto p-2 my-auto">
                                            <AssignmentControlButtons />
                                        </div>
                                    </div>
                                </li>))}
                    </ul>
                </li>
            </ul>
        </div >
    );
}
