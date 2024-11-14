import { FaPlus } from 'react-icons/fa6';
import GreenCheckmark from '../GreenCheckmark';
import { CiNoWaitingSign } from 'react-icons/ci';
import ModuleEditor from './ModuleEditor';
export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button
        className="btn btn-lg btn-danger me-1 float-end"
        id="wd-add-module-btn"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-module-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: '1px' }} />
        Module
      </button>
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="Kanbas/Courses/1234/Modules#/Kanbas/Courses/1234/Modules"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="Kanbas/Courses/1234/Modules#/Kanbas/Courses/1234/Modules"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-all-modules-and-items"
              className="dropdown-item"
              href="Kanbas/Courses/1234/Modules#/Kanbas/Courses/1234/Modules"
            >
              <CiNoWaitingSign />
              Unpublish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-unpublish-modules-only"
              className="dropdown-item"
              href="Kanbas/Courses/1234/Modules#/Kanbas/Courses/1234/Modules"
            >
              <CiNoWaitingSign />
              Unpublish modules only
            </a>
          </li>
        </ul>
        <ModuleEditor
          dialogTitle="Add Module"
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={addModule}
        />
      </div>
      <button
        id="wd-view-progress"
        className="btn btn-lg btn-secondary float-end me-1"
        type="button"
      >
        View Progress
      </button>
      <button
        id="wd-collapse-all"
        className="btn btn-lg btn-secondary float-end me-1"
        type="button"
      >
        Collapse All
      </button>
    </div>
  );
}
