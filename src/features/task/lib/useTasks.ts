import { getTasksFromStorage, ITask } from "../model";
import { useQuery } from '@tanstack/react-query';

export const useTasks = (date: string) => {
    return useQuery<ITask[], Error>({
        queryKey: ['tasks', date], // Ключ запроса
        queryFn: () => getTasksFromStorage(date),
        initialData: getTasksFromStorage(date),
        staleTime: 1000 * 60 * 5, // Данные считаются свежими в течение 5 минут
    });
};

export default useTasks;