import { Task } from "../models/Task";
import { Card, Button } from "@mantine/core";
import axios from "axios";

export const TaskCard = (task: Task) => {
    const edit = () => {
        axios.put("http://10.31.35.227:3000/1", {
          title: "ifrin",
          description: "description",
          state: "todo",
          priority: "5",
        });
        console.log("edit");
    }

    const deleteTask = () => {
        axios.delete("http://10.31.35.227:3000/1");
        console.log("delete");}


    
    return (
        <Card>
            {task.title}
            {task.description}
            {task.state}
            <Button onClick={() => edit()} color="blue">Edit</Button>
            <Button onClick={() => deleteTask()} color="red">Delete</Button>
        </Card>
    );
    };