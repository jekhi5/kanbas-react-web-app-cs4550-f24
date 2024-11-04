import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo, updateTodo } from "./todosReducer";

export default function TodoForm() {

    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();


    return (
        <li className="list-group-item">
            <div className="d-flex align-items-center">
                <input value={todo.title}
                    onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                    className="form-control me-3"
                    style={{ width: "12.5%" }} />
                <button onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click"
                    className="btn btn-warning me-2"> Update </button>
                <button onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click"
                    className="btn btn-success"> Add </button>
            </div>
        </li >
    );
}

