import { Task } from "../models/Task";
import {
  Card,
  Button,
  Modal,
  TextInput,
  Select,
  ActionIcon,
  Text,
  Group,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { FormTask } from "./FormTask";
import.meta.env.VITE_API_URL;

export const TaskCard = (task: Task) => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      state: "",
      priority: "",
    },

    validate: {
      title: (val) => (val ? null : "Invalid title"),
      description: (val) => (val ? null : "Invalid description"),
      state: (val) => (val ? null : "Invalid state"),
      priority: (val) => (val ? null : "Invalid priority"),
    },
  });

  const deleteTask = () => {
    axios
      .delete(import.meta.env?.VITE_API_URL + task.id)
      .then((response) => {
        setConfirm(false);
        notifications.show({
          title: "Successfull delete !",
          message: "Your task has been deleted !",
        });
        console.log(response);
      })
      .catch((error) => {
        notifications.show({
          title: "Error !",
          message: "Something went wrong",
          color: "red",
        });
      });
  };

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="lg"
      m={5}
      bg={
        task.state === "todo"
          ? "#f0eceb"
          : task.state === "inprogress"
          ? "#cce3f1"
          : "#ccf6e1"
      }
    >
      <Stack>
        <Text size="lg" fw={800}>
          {task.title}
        </Text>
        <Text size="sm">{task.description}</Text>
        <Text size="sm">{task.priority}</Text>
      </Stack>

      <Group justify="flex-end">
        <ActionIcon
          variant="light"
          color="blue"
          size={40}
          radius={10}
          onClick={() => {
            setOpen(true);
          }}
        >
          <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="light"
          color="red"
          size={40}
          radius={10}
          onClick={() => {
            setConfirm(true);
          }}
        >
          <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Group>

      <Modal opened={open} onClose={() => setOpen(false)} title="Edit task">
        <FormTask setOpen={setOpen} action="edit" task={task} />
      </Modal>

      <Modal
        opened={confirm}
        onClose={() => setConfirm(false)}
        title="Are you sure ?"
      >
        <Group gap={10}>
          <Button
            onClick={() => setConfirm(false)}
            color="blue"
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={() => deleteTask()} color="red">
            Confirm
          </Button>
        </Group>
      </Modal>
    </Card>
  );
};
