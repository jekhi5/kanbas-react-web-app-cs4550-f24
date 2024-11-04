import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";
export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.default.assignments.find((assignment: any) => assignment._id === aid);
    const assignmentGroupOptions = ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"];
    const gradeDisplayOptions = ["Percentage", "Points", "Letter"]
    const submissionType = ["Online", "In person", "Gradescope"]
    const onlineSubmissionOptions = ["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"]
    return !assignment ? <div>No assignment found!</div> : (
        <div id="wd-assignments-editor">
            <div className="mb-4">
                <label htmlFor="textarea1" className="form-label">Assignment Name</label>
                <textarea className="form-control" id="wd-name" value={assignment.title}></textarea>
            </div>
            <textarea id="wd-description" className="form-control mb-2" cols={50} rows={8}>
                {assignment.description}
            </textarea>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-points" className="form-label float-end">Points</label>
                </div>
                <div className="col-7">
                    <input id="wd-points" className="form-control" value={assignment.points} />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-group" className="form-label float-end">Assignment Group </label>
                </div>
                <div className="col-7">
                    <select id="wd-group" className="form-select">
                        {assignmentGroupOptions.map(
                            option => {
                                return (
                                    <option key={option} value={option} selected={option === assignment.assignmentGroup}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-display-grade-as" className="form-label float-end">Display Grade as </label>
                </div>
                <div className="col-7">
                    <select id="wd-display-grade-as" className="form-select">
                        {gradeDisplayOptions.map(
                            option => {
                                return (
                                    <option key={option} value={option} selected={option === assignment.displayGradeAs}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-3">
                    <label htmlFor="wd-submission-type" className="form-label float-end">Submission Type </label>
                </div>
                <div className="col-7 border rounded-2 p-3">
                    <select id="wd-submission-type" className="form-select mb-1">
                        {submissionType.map(
                            option => {
                                return (
                                    <option key={option} value={option} selected={option === assignment.submissionType}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                    <b>Online Entry Option</b>
                    {onlineSubmissionOptions.map(
                        option => {
                            return (
                                <div className="form-check my-2">
                                    <input id="wd-text-entry" type="checkbox" className="form-check-input" defaultChecked={assignment.onlineEntryOptions.includes(option)} />
                                    <label htmlFor="wd-text-entry" className="form-check-label">{option}</label>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label className="form-label float-end">Assign </label>
                </div>
                <div className="col-7 border rounded-2 p-3">
                    <div className="mb-2">
                        <label htmlFor="wd-assign-to" className="form-label"><b>Assign to</b></label>
                        <input id="wd-assign-to" type="text" value={assignment.assignTo} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label>
                        <input id="wd-due-date" type="date" value={assignment.dueDate} className="form-control" />
                    </div>
                    <div className="row mb-2">
                        <div className="col-6">
                            <label htmlFor="wd-available-from" className="form-label"><b>Available from</b></label>
                            <input id="wd-available-from" type="date" value={assignment.releaseDate} className="form-control" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                            <input id="wd-available-until" type="date" value={assignment.availableUntil} className="form-control" />
                        </div>
                    </div>
                </div>

            </div>
            <hr />
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger float-end">Save</Link>
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary float-end me-2">Cancel</Link>
        </div >
    );
}
