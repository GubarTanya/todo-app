import {getTasksFromStorage, ITask} from "../task/model";
import {useQuery} from "@tanstack/react-query";

export const fetchTasks = (date: string): ITask[] => {
    return getTasksFromStorage(date);
};

export const useDropDown = (date: string) => {
    return useQuery<ITask[], Error>({
        queryKey: ['tasks', date],
        queryFn: () => fetchTasks(date),
        initialData: getTasksFromStorage(date),
    });
};