import { nanoid } from 'nanoid'
import React, {useState } from 'react';
import FieldChecklist from './FieldChecklist'
import classTasks from './CheckList.module.css'

function Checklist(){
    const taskList = [];
    const [tasks, setTasks] = useState(taskList);
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [valueRedact1, setValueRedact1] = useState();
    const [valueRedact2, setValueRedact2] = useState();
    const [editId, setEditId] = useState(null);

    let result = tasks.map(task => {
        const taskClass = task.completed ? classTasks.completeTask : '';
        if (editId === task.id) {
            return (
                <li class={classTasks.inpRedact} key={task.id}>
                    <p>Redact Task Name</p>
                    <input 
                        value={valueRedact1} 
                        onChange={event => setValueRedact1(event.target.value)} 
                        maxLength={30}
                    />
                    <p>Redact Description</p>
                    <input 
                        value={valueRedact2} 
                        onChange={event => setValueRedact2(event.target.value)} 
                        maxLength={150}
                    />
                    <br/>
                    <button onClick={() => saveTask(task.id)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                </li>
            );
        }
        return <li key={task.id} >
            <h3 className={taskClass}>Task: {task.taskName}</h3>
            <p className={taskClass}>Description: {task.description}</p>
            <button class={classTasks.btnDelete} onClick={() => deleteTask(task.id)}>&#10006;</button>
            <button class={classTasks.btnRedact} onClick={() => startEditing(task)}>Redact</button>
            <button class={classTasks.btnComplete} onClick={() => checkComplete(task.id)}>{task.completed ? 'Not completed' : 'Completed'}</button>
        </li>
    })

    function createTask(){
        const newTask = {
            id: nanoid(),
            taskName: value1,
            description: value2,
            completed: false

        }
        if(value1 !== ''  && value2 !== '' ){
                let copy = [...tasks, newTask];
                setTasks(copy);
                setValue1('');
                setValue2('');
        }
    }

    function deleteTask(id){
        setTasks(tasks.filter(elem => elem.id !== id))
    }

    function startEditing(task) {
        setEditId(task.id);
        setValueRedact1(task.taskName);
        setValueRedact2(task.description);
    }

    function saveTask(id) {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, taskName: valueRedact1, description: valueRedact2 } : task
        ));
        setEditId(null);
    }

    function checkComplete(id){
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    return (
        <FieldChecklist 
            result      ={result}
            value1      ={value1}
            value2      ={value2}
            setValue1   ={setValue1}
            setValue2   ={setValue2}
            createTask  ={createTask}
        />
    )
}

export default Checklist;