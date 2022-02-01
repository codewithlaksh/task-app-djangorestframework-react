import React, { useEffect, useState } from 'react';
import AddTask from '../components/AddTask';
import { useNavigate } from 'react-router-dom';

const Tasks = (props) => {
    let navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    })

    const getTasks = async () => {
        let response = await fetch("/api/getTasks");
        let data = await response.json();
        setTasks(data.tasks)
    }

    const handleEdit = (e) => {
        navigate(`/edit/task/${e.target.id}`)
    }

    const handleDelete = async (e) => {
        if (window.confirm("Are you sure, you want to delete this task ?")) {   
            let response = await fetch(`/api/deleteTask/${e.target.id}`, {
                method: "POST"
            })
            let data = await response.json()
            props.showAlert(`${data.message}`, `${data.msg_category}`)
        } else {
            return false;
        }
    }

    return (
        <div className="container my-3">
            <AddTask showAlert={props.showAlert} />
            <hr />
            <h3>Your Tasks</h3>
            <div className="row">
                {tasks.length===0?<h5>No tasks to be display. Please add your first task.</h5>:tasks.map((task) => {
                    return <div className="col-md-3" key={task.sno}>
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Note</h5>
                                <p className="card-text">{task.body}</p>
                                <button className="edit btn btn-sm btn-danger" id={`${task.sno}`} onClick={handleEdit}>Edit</button>
                                <button className="delete btn btn-sm btn-danger mx-1 my-1" id={`${task.sno}`} onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Tasks;
