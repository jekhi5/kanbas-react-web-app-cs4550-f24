import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ProtectedRoute from "../../Account/ProtectedRoute";

export default function AssignmentsControls() {
    const { cid } = useParams();
    return (
        <div id="wd-assignments">
            <div id="wd-assignments">
                <div className="row mb-4">
                    <div className="col-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white rounded-0 h-100 border-end-0" id="basic-addon1">
                                    <CiSearch className="fs-6" />
                                </span>
                            </div>
                            <input type="text" className="form-control py-2 border-start-0" placeholder="Search..." id="wd-search-assignment" />
                        </div>
                    </div>
                    <div className="col-6">
                        <ProtectedRoute requiredAttribute={{ key: 'role', val: 'FACULTY', altRoute: `Courses/${cid}/Assignments` }}>
                            <Link to={`new`} className="btn btn-lg btn-danger me-1 float-end">
                                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                                Assignment
                            </Link>
                        </ProtectedRoute>
                        <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Group</button>
                    </div>
                </div>
            </div>
        </div >
    );
}