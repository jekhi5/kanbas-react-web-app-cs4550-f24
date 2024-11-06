import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer';

export default function AssignmentEditor() {

    const { cid, aid } = useParams();
    const { pathname } = useLocation();

    const editing = !pathname.includes('new');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { assignments } = useSelector((state: any) => state.assignmentsReducer);

    const pulledAssignment = assignments.find((assignment: any) => assignment._id === aid);

    const [_id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [course, setCourse] = useState<string>('');
    const [releaseDate, setReleaseDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [points, setPoints] = useState<number>(100);
    const [description, setDescription] = useState<string>('');
    const [assignmentGroup, setAssignmentGroup] = useState<string>('');
    const [submissionType, setSubmissionType] = useState<string>('');
    const [displayGradeAs, setDisplayGradeAs] = useState<string>('');
    const [onlineEntryOptions, setOnlineEntryOptions] = useState<string[]>([]);
    const [assignTo, setAssignTo] = useState<string>('')
    const [availableUntil, setAvailableUntil] = useState('')

    if (pulledAssignment && _id.length === 0) {
        setId(pulledAssignment._id);
        setTitle(pulledAssignment.title);
        setCourse(pulledAssignment.course);
        setReleaseDate(pulledAssignment.releaseDate);
        setDueDate(pulledAssignment.dueDate);
        setPoints(pulledAssignment.points);
        setDescription(pulledAssignment.description);
        setAssignmentGroup(pulledAssignment.assignmentGroup);
        setSubmissionType(pulledAssignment.submissionType);
        setDisplayGradeAs(pulledAssignment.displayGradeAs);
        setOnlineEntryOptions(pulledAssignment.onlineEntryOptions);
        setAssignTo(pulledAssignment.assignTo);
        setAvailableUntil(pulledAssignment.availableUntil);
    }

    function handleSubmit() {
        editing ? dispatch(updateAssignment({
            _id,
            title,
            course,
            releaseDate,
            dueDate,
            points,
            description,
            assignmentGroup,
            submissionType,
            displayGradeAs,
            onlineEntryOptions,
            assignTo,
            availableUntil,
        })) : dispatch(addAssignment({
            _id,
            title,
            course: cid!,
            releaseDate,
            dueDate,
            points,
            description,
            assignmentGroup,
            submissionType,
            displayGradeAs,
            onlineEntryOptions,
            assignTo,
            availableUntil,
        }));

        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }

    const assignmentGroupOptions = ['ASSIGNMENTS', 'QUIZZES', 'EXAMS', 'PROJECTS'];
    const gradeDisplayOptions = ['Percentage', 'Points', 'Letter']
    const submissionTypes = ['Online', 'In person', 'Gradescope']
    const onlineSubmissionOptions = ['Text Entry', 'Website URL', 'Media Recordings', 'Student Annotation', 'File Uploads']

    return (
        <div id='wd-assignments-editor'>
            <div className='mb-4'>
                <label htmlFor='textarea1' className='form-label'>Assignment Name</label>
                <textarea className='form-control' id='wd-name' value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
            </div>
            <textarea id='wd-description' className='form-control mb-2' cols={50} rows={8} onChange={(e) => setDescription(e.target.value)}>
                {description}
            </textarea>
            <div className='row mb-4'>
                <div className='col-3'>
                    <label htmlFor='wd-points' className='form-label float-end'>Points</label>
                </div>
                <div className='col-7'>
                    <input id='wd-points' className='form-control' value={points} onChange={(e) => setPoints(Number(e.target.value))} />
                </div>
            </div>
            <div className='row mb-4'>
                <div className='col-3'>
                    <label htmlFor='wd-group' className='form-label float-end'>Assignment Group </label>
                </div>
                <div className='col-7'>
                    <select id='wd-group' className='form-select' value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
                        {assignmentGroupOptions.map(
                            option => {
                                return (
                                    <option key={option} value={option} >
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>
            <div className='row mb-4'>
                <div className='col-3'>
                    <label htmlFor='wd-display-grade-as' className='form-label float-end'>Display Grade as </label>
                </div>
                <div className='col-7'>
                    <select id='wd-display-grade-as' className='form-select' value={displayGradeAs} onChange={(e) => setDisplayGradeAs(e.target.value)}>
                        {gradeDisplayOptions.map(
                            option => {
                                return (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>
            <div className='row mb-4'>
                <div className='col-3'>
                    <label htmlFor='wd-submission-type' className='form-label float-end'>Submission Type </label>
                </div>
                <div className='col-7 border rounded-2 p-3'>
                    <select id='wd-submission-type' className='form-select mb-1' value={submissionType} onChange={(e) => setSubmissionType(e.target.value)}>
                        {submissionTypes.map(
                            option => {
                                return (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                    <b>Online Entry Option</b>
                    {onlineSubmissionOptions.map(
                        option => {
                            return (
                                <div className='form-check my-2'>
                                    <input
                                        id={`wd-${option.toLowerCase().replace(' ', '-')}`}
                                        type='checkbox'
                                        className='form-check-input'
                                        checked={onlineEntryOptions.includes(option)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setOnlineEntryOptions([...onlineEntryOptions, option]);
                                            } else {
                                                setOnlineEntryOptions(onlineEntryOptions.filter(opt => opt !== option));
                                            }
                                        }}
                                    />
                                    <label htmlFor={`wd-${option.toLowerCase().replace(' ', '-')}`} className='form-check-label'>{option}</label>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
            <div className='row'>
                <div className='col-3'>
                    <label className='form-label float-end'>Assign </label>
                </div>
                <div className='col-7 border rounded-2 p-3'>
                    <div className='mb-2'>
                        <label htmlFor='wd-assign-to' className='form-label'><b>Assign to</b></label>
                        <input id='wd-assign-to' type='text' className='form-control' value={assignTo} onChange={(e) => setAssignTo(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='wd-due-date' className='form-label'><b>Due</b></label>
                        <input id='wd-due-date' type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} className='form-control' />
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <label htmlFor='wd-available-from' className='form-label'><b>Available from</b></label>
                            <input id='wd-available-from' type='date' className='form-control' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                        </div>
                        <div className='col-6'>
                            <label htmlFor='wd-available-until' className='form-label'><b>Until</b></label>
                            <input id='wd-available-until' type='date' className='form-control' value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
                        </div>
                    </div>
                </div>

            </div>
            <hr />
            <button className='btn btn-danger float-end' onClick={handleSubmit}>Save</button>
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className='btn btn-secondary float-end me-2'>Cancel</Link>
        </div >
    );
}
