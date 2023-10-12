import { useEffect, useState } from "react";
import { User } from "./models/User";
import { Button, Box, Group, Modal, Grid, Stack, TextInput } from "@mantine/core";
import { Auth } from "./components/Auth";
import { Task } from "./models/Task";
import axios from "axios";
import { TaskCard } from "./components/Task";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [openAuthModal, setOpenAuthModal] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState(false);

  useEffect(() => {
    axios.get("http://10.31.35.227:3000/tasks").then((response) => {
      setTasks(response.data);
      console.log(response.data);
    });
  }, []);

  const handleNewTask = () => {
    axios
      .post("http://10.31.35.227:3000/new", {
        title: "title",
        description: "description",
        state: "todo",
        priority: "1",
      })
      .then((response) => {
        console.log(response);
      })
    };

  return (
    <>
      <Box pb={120} m={16}>
        <Group justify="flex-end" h="100%">
          {user && (
            <Group visibleFrom="sm">
              <Button
                variant="default"
                onClick={() => {
                  setUser(null);
                  setOpenAuthModal(true);
                }}
              >
                Log out
              </Button>
            </Group>
          )}
        </Group>
      </Box>
      
      <Button onClick={() => setNewTask(true)} color="blue">New Task</Button> 
      <Grid>
        <Grid.Col span={4}>
          Todo
          <Stack h={300} bg="var(--mantine-color-blue-light)">
            {tasks.filter((task) => task.state === "todo").map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          InProgess
          <Stack h={300} bg="var(--mantine-color-blue-light)">
            {tasks.filter((task) => task.state === "inprogress").map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          Done
          <Stack h={300} bg="var(--mantine-color-blue-light)">
            {tasks.filter((task) => task.state === "done").map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </Stack>
        </Grid.Col>
      </Grid>

      <Modal
        opened={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        size="sm"
        withCloseButton={!user}
      >
        {/* <Auth setUser={setUser()} /> */}
      </Modal>

      <Modal
        opened={newTask}
        onClose={() => setNewTask(false)}
        size="sm"
      >
        <TextInput label="Title" placeholder="Title" />
        <TextInput label="Description" placeholder="Description" />
        <Button
          onClick={() => {
            handleNewTask();
          }}
        
        >New Task</Button>
      </Modal>
    </>
  );
}

export default App;
