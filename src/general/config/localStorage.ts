import { getTasksFromStorage, ITask, saveTasksToStorage } from "../../features/task/model.ts";

interface QueryContext {
    data?: ITask[];
}

interface QueryKey {
    queryKey: [string, string];
}

const localStoragePlugin = {
    onHydrate: (state: string, { queryKey }: QueryKey) => {
        const [key, date] = queryKey;
        if (key === 'tasks') {
            const tasks = getTasksFromStorage(date);
            return { data: tasks };
        }
        return state;
    },
    onSuccess: (
        _data: unknown,
        _variables: unknown,
        _context: unknown,
        context: QueryContext,
        { queryKey }: QueryKey
    ) => {
        const [key, date] = queryKey;
        if (key === 'tasks' && context?.data) {
            saveTasksToStorage(date, context.data);
        }
    },
};

export default localStoragePlugin;
