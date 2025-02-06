import React, { useEffect, useState } from "react";
import useTasks from "../lib/useTasks";
import '../../../App.css';
import DropDownMenu from "../../drop-down/DropDownMenu";
import Button from "../../../general/components/Button.tsx";
import { TableHeader } from "../../../general/components/Header.tsx";

interface ITaskListItem {
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string, updatedText: string) => void;
    onUpdateCompleted: (taskId: string) => void;
    onDateChange: (date: string) => void;
}

const TaskList: React.FC<ITaskListItem> = ({ onDelete, onUpdate, onUpdateCompleted, onDateChange }) => {
    const [currentDate, setCurrentDate] = useState(getCurrentDate());

    const { data: tasks, isLoading, isError, error } = useTasks(currentDate);

    useEffect(() => {
        onDateChange(currentDate);
    }, [currentDate, onDateChange]);

    const handleUpdate = (taskId: string) => {
        const updatedText = prompt('Введите новый текст задачи:');
        if (updatedText) {
            onUpdate(taskId, updatedText);
        }
    };

    if (isLoading) return <span>Загрузка...</span>;
    if (isError) return <span>Ошибка: {error.message}</span>;

    return (
        <div className="relative overflow-x-auto flex flex-col items-center w-full">
            <DropDownMenu onDateChange={setCurrentDate} />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#242424] dark:text-gray-400">
                <TableHeader />
                </thead>
                <tbody>
                {tasks.map(task => (
                    <TaskRow
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onUpdateCompleted={onUpdateCompleted}
                        onUpdate={handleUpdate}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

const getCurrentDate = () => new Date().toISOString().split('T')[0];

interface TaskRowProps {
    task: any;
    onDelete: (taskId: string) => void;
    onUpdateCompleted: (taskId: string) => void;
    onUpdate: (taskId: string) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onDelete, onUpdateCompleted, onUpdate }) => (
    <tr className="bg-white border-b dark:bg-[#242424] dark:border-gray-900 border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {task.text}
        </th>
        <td className="px-6 py-4">
            <Button onClick={() => onUpdateCompleted(task.id)}>
                {task.completed ? "Выполнено" : "Выполняется"}
            </Button>
        </td>
        <td className="px-6 py-4">{task.date}</td>
        <td className="px-6 py-4">
            <Button onClick={() => onDelete(task.id)}>Удалить</Button>
        </td>
        <td className="px-6 py-4">
            <Button onClick={() => onUpdate(task.id)}>Обновить</Button>
        </td>
    </tr>
);

export default TaskList;