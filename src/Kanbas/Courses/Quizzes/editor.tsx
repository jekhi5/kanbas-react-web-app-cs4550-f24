import { format } from 'date-fns';
import { SetStateAction, useEffect, useState } from 'react';
import ThreeDotsElement from './ThreeDotsElement';
import NotPublishedElement from './NotPublishedElement';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { quizzes } from '../../Database';
import { addQuiz, deleteQuiz, updateQuiz, editQuiz } from './reducer';
import { Link } from 'react-router-dom';

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const creatingNewQuiz = pathname.includes('new');

  // Tab management
  const [activeTab, setActiveTab] = useState('details');
  const switchTab = (tab: SetStateAction<string>) => setActiveTab(tab);

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('');
  const [quizType, setQuizType] = useState('');
  const [description, setDescription] = useState('');
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [submissionType, setSubmissionType] = useState('');
  const [displayGradeAs, setDisplayGradeAs] = useState('');
  const [onlineEntryOptions, setOnlineEntryOptions] = useState<string[]>([]);
  const [assignTo, setAssignTo] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');
  const [assignmentGroup, setAssignmentGroup] = useState('');
  const [timeLimitInMinutes, setTimeLimitInMinutes] = useState('');
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [viewResponses, setViewResponses] = useState('');
  const [showCorrectAnswers, setShowCorrectAnswers] = useState('');
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState('');
  const [requireLockdownBrowser, setRequireLockdownBrowser] = useState('');
  const [requireToViewResults, setRequireToViewResults] = useState('');
  const [requireWebcam, setRequireWebcam] = useState('');
  const [lockAfterAnswering, setLockAfterAnswering] = useState('');
  const [questions, setQuestions] = useState('');

  useEffect(() => {
    if (!creatingNewQuiz && quiz) {
      setTitle(quiz.title);
      setCourse(quiz.course);
      setReleaseDate(quiz.releaseDate);
      setDueDate(quiz.dueDate);
      setPoints(quiz.points);
      setQuizType(quiz.quizType);
      setDescription(quiz.description);
      setShuffleAnswers(quiz.shuffleAnswers);
      setSubmissionType(quiz.submissionType);
      setDisplayGradeAs(quiz.displayGradeAs);
      setOnlineEntryOptions(quiz.onlineEntryOptions);
      setAssignTo(quiz.assignTo);
      setAvailableUntil(quiz.availableUntil);
      setAssignmentGroup(quiz.assignmentGroup);
      setTimeLimitInMinutes(quiz.timeLimitInMinutes);
      setMultipleAttempts(quiz.multipleAttempts);
      setViewResponses(quiz.viewResponses);
      setShowCorrectAnswers(quiz.showCorrectAnswers);
      setOneQuestionAtATime(quiz.oneQuestionAtATime);
      setRequireLockdownBrowser(quiz.requireLockdownBrowser);
      setRequireToViewResults(quiz.requireToViewResults);
      setRequireWebcam(quiz.requireWebcam);
      setLockAfterAnswering(quiz.lockAfterAnswering);
      setQuestions(quiz.questions);
    } else {
      setCourse(cid ?? '');
    }
  }, [creatingNewQuiz, quiz, cid]);

  const saveQuiz = () => {
    const newQuiz = {
      title: title.length > 0 ? title : 'Untitled Assignment',
      course,
      releaseDate,
      dueDate,
      points,
      quizType,
      description,
      shuffleAnswers,
      submissionType,
      displayGradeAs,
      onlineEntryOptions,
      assignTo,
      availableUntil,
      assignmentGroup,
      timeLimitInMinutes,
      multipleAttempts,
      viewResponses,
      showCorrectAnswers,
      oneQuestionAtATime,
      requireLockdownBrowser,
      requireToViewResults,
      requireWebcam,
      lockAfterAnswering,
      questions,
    };

    if (creatingNewQuiz) {
      dispatch(addQuiz(newQuiz));
    } else {
      dispatch(updateQuiz({ ...quiz, ...newQuiz }));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const assignmentGroupOptions = [
    'ASSIGNMENTS',
    'QUIZZES',
    'EXAMS',
    'PROJECTS',
  ];
  const quizTypeOptions = [
    'GRADED QUIZ',
    'PRACTICE QUIZ',
    'UNGRADED QUIZ',
  ];
  const gradeDisplayOptions = ['Percentage', 'Points', 'Letter'];
  const submissionTypeOptions = ['Online', 'In person', 'Gradescope'];
  const onlineSubmissionOptions = [
    'Text Entry',
    'Website URL',
    'Media Recordings',
    'Student Annotation',
    'File Uploads',
  ];

  return (
    <div id="wd-quiz-editor" className="container p-4">
      {quiz ? (
        <>
          <div className="row mb-1 justify-content-end">
            <div className="col-auto">
              <h4 className="mb-0">Points</h4>
            </div>
            <div className="col-auto">
              <h4 className="mb-0">{quiz.points}</h4>
            </div>
            <div className="col-auto">
              <h6 className="mb-0">
                <NotPublishedElement /> <ThreeDotsElement />{' '}
              </h6>
            </div>
          </div>
          <hr />
          <div className="row mb-3">
            <div className="col-auto">
              <button
                className={`btn ${activeTab === 'details'
                  ? 'btn-danger'
                  : 'btn-outline-secondary'
                  }`}
                onClick={() => switchTab('details')}
              >
                Details
              </button>
            </div>
            <div className="col-auto">
              <button
                className={`btn ${activeTab === 'questions'
                  ? 'btn-danger'
                  : 'btn-outline-secondary'
                  }`}
                onClick={() => switchTab('questions')}
              >
                Questions
              </button>
            </div>
          </div>
          <hr />
          {activeTab === 'details' ? (
            <>
              <div className="row mb-3">
                <div className="col-6">
                  <input
                    id="wd-quiz-title"
                    placeholder="Name"
                    className="form-control narrow-box"
                    value={quiz.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 col-6">
                <div className="col-6">Quiz Instrunctions</div>
              </div>
              <div className="row mb-4">
                <div className="col-8">
                  <textarea
                    id="wd-quiz-description"
                    className="form-control narrow-box tall-box"
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    {quiz.description}
                  </textarea>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2 d-flex justify-content-end">
                  <label htmlFor="wd-quiz-type">Quiz Type</label>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                  <select
                    id="wd-quiz-type"
                    className="form-select"
                    value={assignmentGroup}
                    onChange={(e) => setQuizType(e.target.value)}
                  >
                    {quizTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2 d-flex justify-content-end">
                  <label htmlFor="wd-quiz-points">Points</label>
                </div>
                <div className="col-md-2 d-flex justify-content-end">
                  <input
                    id="wd-quiz-points"
                    placeholder="Points"
                    className="form-control narrow-box"
                    value={quiz.points}
                    onChange={(e) => setPoints(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2 d-flex justify-content-end">
                  <label htmlFor="wd-quiz-group">Assignment Group</label>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                  <select
                    id="wd-quiz-group"
                    className="form-select"
                    value={assignmentGroup}
                    onChange={(e) => setAssignmentGroup(e.target.value)}
                  >
                    {assignmentGroupOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2 d-flex justify-content-end"> </div>
                <div className="col-md-3 d-flex flex-column align-items">
                  <div className="mb-3 fw-bold">Options</div>
                  <div className="row mb-3">
                    <div className="col-md-1">
                      <input
                        type="checkbox"
                        id="wd-shuffle-answers"
                        className="form-check-input"
                        checked={quiz.shuffleAnswers}
                        onChange={(e) => setShuffleAnswers(e.target.checked)}
                      />
                    </div>
                    <div className="col d-flex justify-content-start">
                      <label htmlFor="shuffle-answers">Shuffle Answers</label>
                    </div>
                  </div>
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-1">
                      <input
                        type="checkbox"
                        id="wd-time-limit"
                        className="form-check-input"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="time-limit">Time Limit</label>
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                      <input
                        type="text"
                        id="wd-time-limit-minutes"
                        className="form-control"
                        value={quiz.timeLimitInMinutes}
                        onChange={(e) => setTimeLimitInMinutes(e.target.value)}
                      />
                      <span className="ms-2">Minutes</span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-1">
                      <input
                        type="checkbox"
                        id="wd-multiple-attempts"
                        className="form-check-input"
                        checked={quiz.allowMultipleAttempts}
                        onChange={(e) => setMultipleAttempts(e.target.checked)}
                      />
                    </div>
                    <div className="col d-flex justify-content-start">
                      <label htmlFor="wd-multiple-attempts">
                        Allow Multiple Attempts
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2 d-flex justify-content-end">
                  <label htmlFor="wd-assign">Assign</label>
                </div>
                <div className="col-md-4 border p-3 rounded">
                  <label htmlFor="wd-assign-to">
                    <strong>Assign To</strong>
                  </label>
                  <input id="wd-assign-to" className="form-control mb-3" />

                  <label htmlFor="wd-due">Due</label>
                  <input
                    type="date"
                    id="wd-due-date"
                    value={
                      quiz.dueDate
                        ? format(new Date(quiz.dueDate), 'yyyy-MM-dd')
                        : ''
                    }
                    onChange={(e) => setDueDate(e.target.value)}
                    className="form-control mb-3"
                  />

                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="wd-available-from">Available from</label>
                      <input
                        type="date"
                        id="wd-available-from"
                        value={
                          quiz.releaseDate
                            ? format(
                              new Date(quiz.releaseDate),
                              'yyyy-MM-dd'
                            )
                            : ''
                        }
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="wd-available-until">Until</label>
                      <input
                        type="date"
                        id="wd-available-until"
                        value={
                          quiz.availableUntil
                            ? format(
                              new Date(quiz.availableUntil),
                              'yyyy-MM-dd'
                            )
                            : ''
                        }
                        onChange={(e) => setAvailableUntil(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-auto">
                  <button id="wd-details-cancel" className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
                <div className="col-auto">
                  <button id="wd-details-save" className="btn btn-danger">
                    Save
                  </button>
                </div>
              </div>
              <hr />
            </>
          ) : (
            <>
              <div className="row mb-3">
                <div className="col">
                  <button id="wd-new-question" className="btn btn-secondary">
                    + New Question
                  </button>
                </div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Link
                    to={`/Kanbas/Courses/${cid}/Quizzes`}
                    className="btn btn-secondary float-end me-2"
                  >
                    Cancel
                  </Link>
                </div>
                <div className="col-auto">
                  <button id="wd-questions-save" className="btn btn-danger" onClick={saveQuiz}>
                    Save
                  </button>
                </div>
              </div>
              <hr />
            </>
          )}
        </>
      ) : (
        <div className="row mb-1">
          <p>Quiz not found.</p>
        </div>
      )}
    </div>
  );
}


