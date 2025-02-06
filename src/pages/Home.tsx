import React, { useState } from 'react';
import AddTaskForm from "../features/task/ui/AddTaskForm";
import TaskList from "../features/task/ui/TaskList";
import useTasks from "../features/task/lib/useTasks";
import { useTaskActions } from "../features/task/lib/useTaskActions";
import { taskStore } from "../general/store.ts";

const HomePage: React.FC = () => {
    const [selectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [currentDate, setCurrentDate] = useState(selectedDate);
    const taskActions = useTaskActions(currentDate);
    const { state } = taskStore;
    const { isLoading, isError } = useTasks(state.date);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error loading tasks</span>;
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <AddTaskForm date={selectedDate} onAddTask={taskActions.addTask} />
            <TaskList
                onDateChange={setCurrentDate}
                onDelete={taskActions.deleteTask}
                onUpdate={taskActions.updateTask}
                onUpdateCompleted={taskActions.updateTaskCompleted}
            />
        </div>
    );
};

export default HomePage;
