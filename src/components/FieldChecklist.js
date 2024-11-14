import fieldClass from './FieldChecklist.module.css'


function FieldChecklist({value1, value2, setValue1, setValue2, createTask, result}){

    return (
        <div class={fieldClass.container}>
            <div class={fieldClass.field}>
                <input class={fieldClass.inpAddInfo} maxLength={30} placeholder='Task Name' value={value1} onChange={event => setValue1(event.target.value)}/>
                <input class={fieldClass.inpAddInfo} maxLength={150} placeholder='Description' value={value2} onChange={event => setValue2(event.target.value)}/>
                <button class={fieldClass.addTask} onClick={createTask}>Add Task</button>
                <ul className='ul'>
                    {result}
                </ul>
            </div>
        </div>
    )
}

export default FieldChecklist;