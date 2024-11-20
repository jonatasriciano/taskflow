import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";

// Definir localmente a interface Task para evitar conflitos

// Adicione esta exportação no topo do arquivo:
export interface Task {
    id: string; // IDs gerados como strings
    title: string;
    description: string;
    status: "Pending" | "Completed";
}

// Resto do código TaskContext permanece igual
interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, "id">) => void;
    updateTask: (id: string, updatedTask: Partial<Task>) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks from backend
    useEffect(() => {
        axios
            .get("http://localhost:5001/tasks")
            .then((response) => {
                console.log("Tasks loaded:", response.data);
                setTasks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    const addTask = async (task: Omit<Task, "id">) => {
        try {
            const response = await axios.post("http://localhost:5001/tasks", task);
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (id: string, updatedTask: Partial<Task>) => {
        try {
            await axios.patch(`http://localhost:5001/tasks/${id}`, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5001/tasks/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};