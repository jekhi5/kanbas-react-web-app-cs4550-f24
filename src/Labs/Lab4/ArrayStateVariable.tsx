import React, { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <div className="mb-3">
                <button onClick={addElement} className="btn btn-success me-2">Add Element</button>
            </div>
            <ul className="list-group">
                {array.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {item}
                        <button onClick={() => deleteElement(index)} className="btn btn-danger btn-sm">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <hr />
        </div >
    );
}
