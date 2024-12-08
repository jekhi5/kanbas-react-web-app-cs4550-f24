import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedContent from '../Account/ProtectedContent';

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  shouldHideUnenrolled,
  setShouldHideUnenrolled,
  enrollInCourse,
  unenrollInCourse,
  enrollments,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  shouldHideUnenrolled: boolean;
  setShouldHideUnenrolled: (shouldHideUnenrolled: boolean) => void;
  enrollInCourse: (courseId: string) => void;
  unenrollInCourse: (courseId: string) => void;
  enrollments: any[];
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) return <h1>Sign in to view Dashboard</h1>;

  const isEnrolled = (courseId: any) => {
    return enrollments.some(
      (enrollment: { user: any; course: any }) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <ProtectedContent role="FACULTY">
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            {' '}
            Add{' '}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <hr />
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </ProtectedContent>
      <ProtectedContent role="STUDENT">
        <button
          className="btn btn-primary float-end"
          onClick={() => setShouldHideUnenrolled(!shouldHideUnenrolled)}
          id="wd-toggle-enrollments-click"
        >
          {shouldHideUnenrolled
            ? 'Show All Courses'
            : 'Show Enrolled Courses Only'}
        </button>
      </ProtectedContent>
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{' '}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) =>
            shouldHideUnenrolled && !isEnrolled(course._id) ? (
              <></>
            ) : (
              <div
                className="wd-dashboard-course col"
                style={{ width: '300px' }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img
                      src={require(`../../public/images/${
                        course.imageName
                          ? course.imageName
                          : 'GenericCourseImage'
                      }.jpg`)}
                      width="100%"
                      height={160}
                      alt="Course logo"
                    />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}{' '}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}{' '}
                      </p>
                      <button className="btn btn-primary"> Go </button>
                      <ProtectedContent role="FACULTY">
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </ProtectedContent>

                      <ProtectedContent role="STUDENT">
                        {isEnrolled(course._id) ? (
                          <button
                            className="btn btn-danger float-end"
                            id="wd-unenroll-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              unenrollInCourse(course._id);
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success float-end"
                            id="wd-enroll-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              enrollInCourse(course._id);
                            }}
                          >
                            Enroll
                          </button>
                        )}
                      </ProtectedContent>
                    </div>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
