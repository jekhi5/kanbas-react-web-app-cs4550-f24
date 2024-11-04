import { format } from "date-fns";
import { SetStateAction, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import ThreeDotsElement from "./ThreeDotsElement";
import NotPublishedElement from "./NotPublishedElement";
import QuizTypeSelector from "./QuizTypeSelector";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const quizzes = db.default.quizzes;

    console.log(qid);

    const quiz = quizzes.find((quiz) => quiz._id === qid);

    // Tab management
    const [activeTab, setActiveTab] = useState("details");
    const switchTab = (tab: SetStateAction<string>) => setActiveTab(tab);

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
                            <h6 className="mb-0"><NotPublishedElement /> <ThreeDotsElement /> </h6>
                        </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                        <div className="col-auto">
                            <button
                                className={`btn ${activeTab === "details" ? "btn-danger" : "btn-outline-secondary"}`}
                                onClick={() => switchTab("details")}
                            >
                                Details
                            </button>
                        </div>
                        <div className="col-auto">
                            <button
                                className={`btn ${activeTab === "questions" ? "btn-danger" : "btn-outline-secondary"}`}
                                onClick={() => switchTab("questions")}
                            >
                                Questions
                            </button>
                        </div>
                    </div>
                    <hr />
                    {activeTab === "details" ? (
                        <>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input
                                        id="wd-quiz-title"
                                        placeholder="Name"
                                        className="form-control narrow-box"
                                        value={quiz.title}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3 col-6">
                                <div className="col-6">
                                    Quiz Instrunctions
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-8">
                                    <textarea id="wd-quiz-description" className="form-control narrow-box tall-box">
                                        {quiz.description}
                                    </textarea>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 d-flex justify-content-end">
                                    <label htmlFor="wd-quiz-type">Quiz Type</label>
                                </div>
                                <div className="col-md-3 d-flex justify-content-end">
                                    <select id="wd-quiz-type" className="form-select" >
                                        <option value="">Graded Quiz</option>
                                        <option value="multiple-choice">Practice Quiz</option>
                                        <option value="true-false">Graded Survey</option>
                                        <option value="short-answer">Ungraded Survey</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 d-flex justify-content-end">
                                    <label htmlFor="wd-quiz-points">Points</label>
                                </div>
                                <div className="col-md-2 d-flex justify-content-end">
                                    <input id="wd-quiz-points" placeholder="Points" className="form-control narrow-box" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 d-flex justify-content-end">
                                    <label htmlFor="wd-quiz-group">Assignment Group</label>
                                </div>
                                <div className="col-md-3 d-flex justify-content-end">
                                    <select id="wd-quiz-group" className="form-select" >
                                        <option value="">Quizzes</option>
                                        <option value="multiple-choice">Exams</option>
                                        <option value="true-false">Assignments</option>
                                        <option value="short-answer">Project</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 d-flex justify-content-end"> </div>
                                <div className="col-md-3 d-flex flex-column align-items">
                                    <div className="mb-3 fw-bold">
                                        Options
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-1">
                                            <input
                                                type="checkbox"
                                                id="wd-shuffle-answers"
                                                className="form-check-input"
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
                                            />
                                        </div>
                                        <div className="col d-flex justify-content-start">
                                            <label htmlFor="wd-multiple-attempts">Allow Multiple Attempts</label>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-2 d-flex justify-content-end">
                                    <label htmlFor="wd-assign">Assign</label>
                                </div>
                                <div className="col-md-4 border p-3 rounded">
                                    <label htmlFor="wd-assign-to"><strong>Assign To</strong></label>
                                    <input id="wd-assign-to" className="form-control mb-3" />

                                    <label htmlFor="wd-due">Due</label>
                                    <input type="date" id="wd-due-date" value={quiz.dueDate ? format(new Date(quiz.dueDate), 'yyyy-MM-dd') : ''} className="form-control mb-3" />

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="wd-available-from">Available from</label>
                                            <input type="date" id="wd-available-from" value={quiz.availableUntil ? format(new Date(quiz.availableUntil), 'yyyy-MM-dd') : ''} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="wd-available-until">Until</label>
                                            <input type="date" id="wd-available-until" className="form-control" />
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
                                    <button id="wd-questions-cancel" className="btn btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-auto">
                                    <button id="wd-questions-save" className="btn btn-danger">
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
            )
            }
        </div >

    );
}
