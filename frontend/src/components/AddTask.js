import React, { useState } from 'react';

const AddTask = (props) => {
    const [task, setTask] = useState({ body: "" });

    const handleOnChange = (e) => {
        setTask(task => ({...task, [e.target.name]: `${e.target.value}`}))
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
        let response = await fetch('/api/createTask', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": getCookie('csrftoken'),
            },
            body: JSON.stringify(task),
        })
        let data = await response.json()
        props.showAlert(`${data.message}`, `${data.msg_category}`)
        document.getElementById("task-form").reset();
        setTask({ body: "" })
    }

    return (
        <>
            <h3>Add Your Task</h3>
            <form id="task-form">
                <div className="mb-3">
                    <label htmlFor="body">Task Description</label>
                    <textarea name="body" id="body" rows="4" className="form-control" placeholder="Enter your task description" onChange={handleOnChange}></textarea>
                </div>
                <button disabled={task.body.length < 10} className="btn btn-sm btn-danger" type="button" onClick={handleSubmit}>Add</button>
            </form>
        </>
    );
};

export default AddTask;
