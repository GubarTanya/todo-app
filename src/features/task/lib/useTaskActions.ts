import { useQueryClient } from '@tanstack/react-query';
import { ITask, getTasksFromStorage, saveTasksToStorage } from "../model";

export const useTaskActions = (date: string) => {
    const queryClient = useQueryClient();

    const updateTasksInStorageAndCache = async (updatedTasks: ITask[]) => {
        saveTasksToStorage(date, updatedTasks);
        queryClient.setQueryData(['tasks', date], updatedTasks);
    };

    const addTask = async (text: string) => {
        const tasks = getTasksFromStorage(date);
        const newTask: ITask = {
            id: Date.now().toString(),
            text,
            completed: false,
            date,
        };
        const updatedTasks = [...tasks, newTask];
        await updateTasksInStorageAndCache(updatedTasks);
    };

    const deleteTask = async (taskId: string) => {
        const tasks = getTasksFromStorage(date);
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        await updateTasksInStorageAndCache(updatedTasks);
    };

    const updateTask = async (taskId: string, updatedText: string) => {
        const tasks = getTasksFromStorage(date);
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, text: updatedText } : task
        );
        await updateTasksInStorageAndCache(updatedTasks);
    };

    const toggleTaskCompleted = async (taskId: string) => {
        const tasks = getTasksFromStorage(date);
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        await updateTasksInStorageAndCache(updatedTasks);
    };

    return { addTask, deleteTask, updateTask, toggleTaskCompleted };
};