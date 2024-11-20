import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";

// Define the Task interface to ensure consistent structure for tasks
export interface Task {
  id: string; // Unique identifier for each task
  title: string; // Title of the task
  description: string; // Description of the task
  status: "Pending" | "In Progress" | "Completed"; // Status to track task progress
}

// Define the context interface to describe the shape of the data and methods provided
interface TaskContextType {
  tasks: Task[]; // Array of tasks
  addTask: (task: Omit<Task, "id">) => void; // Function to add a new task (without ID)
  updateTask: (id: string, updatedTask: Partial<Task>) => void; // Function to update an existing task
  deleteTask: (id: string) => void; // Function to delete a task
}

// Create the TaskContext using React's createContext function
// Initially, the context is undefined and will be provided later
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// TaskProvider Component: Responsible for managing and providing task data to the entire application
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store the list of tasks

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5001/tasks") // API endpoint to fetch tasks
      .then((response) => setTasks(response.data)) // Update state with fetched tasks
      .catch((error) => console.error("Error fetching tasks:", error)); // Handle errors
  }, []);

  // Function to add a new task
  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await axios.post("http://localhost:5001/tasks", task); // Post new task to server
      setTasks((prevTasks) => [...prevTasks, response.data]); // Add the new task to the state
    } catch (error) {
      console.error("Error adding task:", error); // Handle errors
    }
  };

  // Function to update an existing task
  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      await axios.patch(`http://localhost:5001/tasks/${id}`, updatedTask); // Update task on server
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)) // Update the task in state
      );
    } catch (error) {
      console.error("Error updating task:", error); // Handle errors
    }
  };

  // Function to delete a task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${id}`); // Delete task from server
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Remove task from state
    } catch (error) {
      console.error("Error deleting task:", error); // Handle errors
    }
  };

  // Provide the task data and methods to the application via context
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children} {/* Render child components */}
    </TaskContext.Provider>
  );
};

// Custom Hook: Simplifies access to the TaskContext in child components
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    // Throw an error if the hook is used outside of a TaskProvider
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context; // Return the context
};