import { IoEllipsisVertical } from "react-icons/io5";
import { HiPlusSmall } from "react-icons/hi2";
export default function AssignmentHeadingControlButtons() {
    return (
        <div className="float-end">
            <HiPlusSmall />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
