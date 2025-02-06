import React from 'react';
import {ITask} from "../model";

interface TaskItemProps {
    task: ITask;
    onDeleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = () => {
    return (
        <div>
            <button>Delete</button>
        </div>
    );

};


export default TaskItem;