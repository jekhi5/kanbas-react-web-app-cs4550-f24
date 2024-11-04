import { IoEllipsisVertical } from "react-icons/io5";
export default function ThreeDotsElement() {
    return (
        <span className="me-1 position-relative">
            <button className="rounded">
                <IoEllipsisVertical className="fs-4" />
            </button>
        </span>
    );
}
