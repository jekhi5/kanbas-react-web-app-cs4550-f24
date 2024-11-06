import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../GreenCheckmark";
import { FaTrash } from "react-icons/fa";
export default function AssignmentControlButtons({ assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void }) {
    return (
        <>
            <div className="float-end">
                <GreenCheckmark />
                <FaTrash className="text-danger me-2 mb-1" data-bs-toggle="modal" data-bs-target="#deleteModal" />
                <IoEllipsisVertical className="fs-4" />
            </div>

            <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Delete Assignment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this assignment?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteAssignment(assignmentId)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
