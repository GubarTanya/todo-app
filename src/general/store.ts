import { Store } from '@tanstack/store';

export interface ITask {
    id: string
    text: string
    completed: boolean
    date: string
}

interface TaskState {
    tasks: ITask[]
    date: string
}

const initialState: TaskState = {
    tasks: [] as ITask[],
    date: new Date().toISOString().split('T')[0],
};

export const taskStore = new Store<TaskState>(initialState);

export const taskActions = {
    addTask(task: ITask) {
        taskStore.setState((state) => ({
            ...state,
            tasks: [...state.tasks, task],
        }));
    },
    deleteTask(taskId: string) {
        taskStore.setState((state) => ({
            ...state,
            tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
    },
    updateTask(updatedTask: ITask) {
        taskStore.setState((state) => ({
            ...state,
            tasks: state.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            ),
        }));
    },
    updateTaskCompleted(taskId: string) {
        taskStore.setState((state) => ({
            ...state,
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
        }));
    },
    setDate(date: string) {
        taskStore.setState((state) => ({
            ...state,
            date,
        }));
    },
};