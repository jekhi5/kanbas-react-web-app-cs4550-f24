import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../GreenCheckmark";
import { HiPlusSmall } from "react-icons/hi2";
export default function LessonControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <HiPlusSmall />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
