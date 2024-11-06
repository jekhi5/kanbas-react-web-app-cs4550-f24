import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addEnrollment, deleteEnrollment } from "./dashboardReducer";

export default function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [userCourses, setUserCourses] = useState<any[]>(courses.filter((course) =>
        enrollments.some(
            (enrollment: { user: any; course: any; }) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
        )));
    const [showEnrollments, setShowEnrollments] = useState<boolean>(false);
    const dispatch = useDispatch();

    if (!currentUser) return <div> ERROR! UNABLE TO LOAD USER COURSE INFORMATION </div>;

    const isEnrolled = (courseId: string) =>
        enrollments.some((enrollment: { user: string, course: string }) =>
            enrollment && enrollment.user === currentUser._id && enrollment.course === courseId);

    const enrollInCourse = (courseId: string) =>
        dispatch(addEnrollment({ user: currentUser._id, course: courseId }));

    const unenrollInCourse = (courseId: string) =>
        dispatch(deleteEnrollment(enrollments
            .find((enrollment: { user: string, course: string }) => enrollment && enrollment.user === currentUser._id && enrollment.course === courseId)._id))

    const isFaculty = currentUser.role && currentUser.role === 'FACULTY';
    const isStudent = currentUser.role && currentUser.role === 'STUDENT';


    return (<div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        {isFaculty && <>
            <h5>New Course
                <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={() => {
                        addNewCourse();
                        setUserCourses([...userCourses, course]);
                    }
                    } > Add </button>
                <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click">
                    Update
                </button>
            </h5>
            <br />
            <input value={course.name} className="form-control mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <textarea value={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value })} />
            <hr />
        </>}
        {isStudent
            && <button className="btn btn-primary float-end" onClick={() => {
                setShowEnrollments(!showEnrollments);
                setUserCourses(showEnrollments ? courses.filter((course) =>
                    enrollments.some(
                        (enrollment: { user: any; course: any; }) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                    )) : courses);
            }}>
                Enrollments
            </button>}
        <h2 id="wd-dashboard-published">Published Courses ({userCourses.length})</h2> <hr />
        <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
                {userCourses.map((course) => (
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link to={isEnrolled(course._id) ? `/Kanbas/Courses/${course._id}/Home` : '/Kanbas/Dashboard'}
                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                <img src={require(`../public/images/${course.imageName ? course.imageName : 'GenericCourseImage'}.jpg`)} width="100%" height={160} alt="Course logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">
                                        {course.name} </h5>
                                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                        {course.description} </p>
                                    <button className="btn btn-primary"> Go </button>
                                    {isFaculty
                                        && <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">
                                            Delete
                                        </button>}
                                    {isFaculty
                                        && <button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}
                                            className="btn btn-warning me-2 float-end" >
                                            Edit
                                        </button>}
                                    {isStudent
                                        && (isEnrolled(course._id) ?
                                            <button className="btn btn-danger mx-2" onClick={(e) => {
                                                e.preventDefault();
                                                unenrollInCourse(course._id);
                                            }}>
                                                Unenroll
                                            </button>
                                            :
                                            <button className="btn btn-success mx-2" onClick={(e) => {
                                                e.preventDefault();
                                                enrollInCourse(course._id);
                                            }}>
                                                Enroll
                                            </button>)}
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}
