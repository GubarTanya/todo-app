export interface ITask {
    id: string
    text: string
    completed: boolean
    date: string
}

export const getTasksFromStorage = (date: string): ITask[] => {
    const tasks = localStorage.getItem(`${date}`)
    return tasks ? JSON.parse(tasks) : []
}

export const saveTasksToStorage = (date: string, tasks: ITask[]): void => {
    localStorage.setItem(`${date}`, JSON.stringify(tasks))
}