import React, { useEffect, useState } from 'react';
import { FaCheck, FaPenAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';
import './TaskManager.css'
function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            //update api call
            console.log("update api call");
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if (updateTask === null && input) {
            //create api call
            console.log("create api call");
            handleAddTask();
        }
        setInput('');
    };

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        };
        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                //success toast
                notify(message, 'success');
            } else {
                //error toast
                notify(message, 'error');
            }

            fetchAllTasks();
        } catch (error) {
            console.error(error);
            notify("Failed to create task", 'error');
        }
    };

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
            setCopyTasks(data);
        } catch (error) {
            console.error(error);
            notify("Failed to create task", 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);

            if (success) {
                //success toast
                notify(message, 'success');
            } else {
                //error toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (error) {
            console.error(error);
            notify("Failed to create task", 'error');
        }
    };

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        };
        try {
            const { success, message } = await UpdateTaskById(_id, obj);

            if (success) {
                //success toast
                notify(message, 'success');
            } else {
                //error toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (error) {
            console.error(error);
            notify("Failed to create task", 'error');
        }
    };

    const handleUpdateItem = async (item) => {
        const { _id, isDone } = updateTask; //in place of item
        const obj = {
            taskName: input, //in place of nothing
            isDone: isDone
        };
        try {
            const { success, message } = await UpdateTaskById(_id, obj);

            if (success) {
                //success toast
                notify(message, 'success');
            } else {
                //error toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch (error) {
            console.error(error);
            notify("Failed to create task", 'error');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    };

    return (
        <div className='d-flex flex-column align-items-center w-75 m-auto mt-5' style={{
            backgroundColor: '#fce4ec', fontFamily: 'Arial, sans-serif', padding: '20px', borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease-in-out'
        }}>
            <h1 className='mb-4' style={{
                color: 'green', textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px',
                fontWeight: 'bold',
            }}>
                TASK MANAGER WEB APPLICATION
            </h1>
            <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
                <div className='input-group flex-grow-1 me-2'>
                    <input type='text' className='form-control me-1' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Add a new task' style={{
                        padding: '12px 15px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc',
                        transition: 'all 0.3s ease'
                    }} />
                    <button onClick={handleTask} className='btn btn-success btn-sm me-2' style={{
                        backgroundColor: 'pink', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none',
                        cursor: 'pointer'
                    }}>
                        <FaPlus className='m-2 ' />
                    </button>
                </div>
                <div className='input-group flex-grow-1'>
                    <span className='input-group-text' style={{
                        backgroundColor: 'pink', color: 'white', borderRadius: '8px 0 0 8px', transition: 'background-color 0.3s ease'
                    }}>
                        <FaSearch style={{ color: '#fff' }} />
                    </span>
                    <input onChange={handleSearch} className='form-control' type='text' placeholder='Search tasks' style={{
                        padding: '12px 15px', fontSize: '1rem', borderRadius: '0 8px 8px 0', border: '1px solid #ccc', transition: 'all 0.3s ease'
                    }} />
                </div>
            </div>

            <div className='d-flex flex-column w-100'>
                {
                    tasks.map((item) => (
                        <div key={item._id} className='p-2 m-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center' style={{
                            margin: '15px 0', padding: '15px', backgroundColor: '#a5d6a7', borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
                        }}>
                            <span className={item.isDone ? 'text-decoration-line-through' : ''}>{item.taskName}</span>
                            <div>
                                <button onClick={() => handleCheckAndUncheck(item)} className='btn btn-info btn-sm me-2' type='button' style={{
                                    borderRadius: 'none', padding: '8px'
                                }}>
                                    <FaCheck />
                                </button>
                                <button onClick={() => setUpdateTask(item)} className='btn btn-secondary btn-sm me-2' type='button' style={{
                                    borderRadius: 'none', padding: '8px'
                                }}>
                                    <FaPenAlt style={{ color: '#fff' }} />
                                </button>
                                <button className='btn btn-black btn-sm me-2' onClick={() => { handleDeleteTask(item._id) }} type='button' style={{
                                    borderRadius: '50%', padding: '8px'
                                }}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <ToastContainer />
        </div>
    );
}

export default TaskManager;
