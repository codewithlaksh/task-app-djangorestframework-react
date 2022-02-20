import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = (props) => {
    document.title = "Edit Task - Task App"

    let params = useParams();
    let navigate = useNavigate();

    const [task, setTask] = useState('');
    
    useEffect(() => {
        getTask();
    }, [params.id])

    const getTask = async () => {
        let response = await fetch(`/api/getTask/${params.id}`);
        let data = await response.json()
        setTask(data.task)
        if (data.status === "not-found"){
            navigate("/404")
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    const handleSubmit = async () => {
        let response = await fetch(`/api/updateTask/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": getCookie('csrftoken'),
            },
            body: JSON.stringify(task),
        })
        let data = await response.json()
        props.showAlert(`${data.message}`, `${data.msg_category}`)
        document.getElementById("task-form").reset();
        setTask({ body: `${task?.body}` })
        navigate("/")
    }

    const handleOnChange = (e) => {
        setTask(task => ({...task, 'body': `${e.target.value}`}))
    }
    
    return (
        <div className="container my-3">
            <h3>Edit Your Task</h3>
            <form id="task-form">
                <div className="mb-3">
                    <label htmlFor="body">Task Description</label>
                    <textarea name="body" id="body" rows="4" className="form-control" placeholder="Enter your task description" onChange={handleOnChange} value={task?.body}></textarea>
                </div>
                <button className="btn btn-sm btn-danger" type="button" onClick={handleSubmit}>Update</button>
            </form>
        </div>
    );
};

export default EditTask;
