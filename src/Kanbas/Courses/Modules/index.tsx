import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule }
    from "./reducer";
import { useSelector, useDispatch } from "react-redux";
export default function Modules() {
    const { cid } = useParams();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();

    return (
        <div>
            <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
                addModule={() => {
                    dispatch(addModule({ name: moduleName, course: cid }));
                    setModuleName("");
                }} />
            <br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules
                    .filter((module: any) => module.course === cid)
                    .map((module: any) => (
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                {currentUser.role
                                    && currentUser.role === 'FACULTY'
                                    && < BsGripVertical className="me-2 fs-3" />}
                                {((currentUser.role && currentUser.role !== 'FACULTY') || !module.editing) && module.name}
                                {(currentUser.role && currentUser.role === 'FACULTY') && module.editing && (
                                    <input className="form-control w-50 d-inline-block"
                                        onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                dispatch(updateModule({ ...module, editing: false }));
                                            }
                                        }}
                                        defaultValue={module.name} />
                                )}
                                {currentUser.role
                                    && currentUser.role === 'FACULTY'
                                    && <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={(moduleId) => {
                                            dispatch(deleteModule(moduleId));
                                        }}
                                        editModule={(moduleId) => dispatch(editModule(moduleId))} />}
                            </div>
                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (

                                        <li className="wd-lesson list-group-item p-3 ps-1">
                                            <div className="wd-title">
                                                {currentUser.role
                                                    && currentUser.role === 'FACULTY' &&
                                                    <BsGripVertical className="me-2 fs-3" />}
                                                {lesson.name}
                                                {currentUser.role
                                                    && currentUser.role === 'FACULTY'
                                                    && <LessonControlButtons />}
                                            </div>
                                        </li>
                                    ))}
                                </ul>)}
                        </li>))}
            </ul>
        </div>
    );
}
