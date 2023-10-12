import { useEffect, useState } from "react";
import { User } from "./models/User";
import {
  Button,
  Box,
  Group,
  Modal,
  Grid,
  Stack,
  Container,
} from "@mantine/core";
import { Auth } from "./components/Auth";
import { Task } from "./models/Task";
import axios from "axios";
import { TaskCard } from "./components/Task";
import { FormTask } from "./components/FormTask";
import { io } from "socket.io-client";
import.meta.env?.VITE_API_URL;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState(false);

  useEffect(() => {
    // const socket = io('http://localhost:3000');
    // socket.on("connect", () => {
    //   console.log("connected");
    // })
    axios.get(import.meta.env.VITE_API_URL + "tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  useEffect(() => {
    const isConnected = localStorage.getItem("user");
    if (isConnected) {
      setUser(JSON.parse(isConnected));
    } else {
      setOpenAuthModal(true);
    }
  }, []);

  return (
    <>
      <Box pb={20} m={16}>
        <Group justify="flex-end" h="100%">
          <Group>
            {user ? (
              <Button
                variant="default"
                onClick={() => {
                  setUser(null);
                  setOpenAuthModal(true);
                  localStorage.removeItem("user");
                }}
              >
                Log out
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  setOpenAuthModal(true);
                }}
              >
                Log in
              </Button>
            )}
          </Group>
        </Group>
      </Box>

      <Stack justify="center">
        <Button onClick={() => setNewTask(true)} color="blue" leftSection="+" w={300} ml={30}>
          Add a new task
        </Button>
        <Grid m={24}>
          <Grid.Col span={4}>
            🟤 Todo
            <Stack>
              {tasks
                .filter((task) => task.state === "todo")
                .map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={4}>
            🔵 In Progress
            <Stack>
              {tasks
                .filter((task) => task.state === "inprogress")
                .map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={4}>
            🟢 Done
            <Stack>
              {tasks
                .filter((task) => task.state === "done")
                .map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>

      <Modal
        opened={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        size="sm"
        withCloseButton={user ? true : false}
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Auth setUser={setUser} setOpenAuthModal={setOpenAuthModal} />
      </Modal>

      <Modal
        opened={newTask}
        onClose={() => setNewTask(false)}
        size="sm"
        title="Create a new Task"
      >
        <FormTask setOpen={setNewTask} action="create" />
      </Modal>
    </>
  );
}

export default App;
