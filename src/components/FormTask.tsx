import { useState, useEffect } from "react";
import { Task } from "../models/Task";
import { Button, TextInput, SegmentedControl, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import.meta.env?.VITE_API_URL;

type PropsForm = {
  setOpen: (open: boolean) => void;
  task?: Task;
  action: "edit" | "create";
};

export const FormTask = (props: PropsForm) => {
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (props.task) {
      setTask(props.task);
      form.setFieldValue("title", props.task.title);
      form.setFieldValue("description", props.task.description);
      form.setFieldValue("state", props.task.state);
      form.setFieldValue("priority", props.task.priority);
    }
  }, []);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      state: "todo",
      priority: "",
    },

    validate: {
      title: (val) => (val ? null : "Invalid title"),
      description: (val) => (val ? null : "Invalid description"),
      state: (val) => (val ? null : "Invalid state"),
      priority: (val) => (val ? null : "Invalid priority"),
    },
  });

  const create = () => {
    axios
      .post(import.meta.env?.VITE_API_URL + "new", {
        title: form.values.title,
        description: form.values.description,
        state: form.values.state,
        priority: form.values.priority,
      })
      .then((response) => {
        notifications.show({
          title: "Successfull creation !",
          message: "Your task has been created !",
        });
        props.setOpen(false);
      });
  };

  
  const edit = () => {
    axios
      .put(import.meta.env?.VITE_API_URL + task?.id, {
        title: form.values.title,
        description: form.values.description,
        state: form.values.state,
        priority: form.values.priority,
      })
      .then((response) => {
        notifications.show({
          title: "Successfull edit !",
          message: "Your task has been edited !",
        });
        props.setOpen(false);
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
    <>
      <Stack mb={16}>
        <TextInput
          label="Title"
          placeholder="Title"
          value={form.values.title}
          onChange={(event) =>
            form.setFieldValue("title", event.currentTarget.value)
          }
        />
        <TextInput
          label="Description"
          placeholder="Description"
          value={form.values.description}
          onChange={(event) =>
            form.setFieldValue("description", event.currentTarget.value)
          }
        />
        <TextInput
          label="Priority"
          placeholder="Priority"
          value={form.values.priority}
          onChange={(event) =>
            form.setFieldValue("priority", event.currentTarget.value)
          }
        />
        <SegmentedControl  value={form.values.state} onChange={(value) => form.setFieldValue("state", value)} data={[
            { value: "todo", label: "🟤 Todo" },
            { value: "inprogress", label: "🔵 In Progress" },
            { value: "done", label: "🟢 Done" },
          ]} />
      </Stack>
      <Button
        onClick={() => {
          props.action === "create" ? create() : edit();
        }}
      >
        {props.action === "create" ? "Create" : "Edit"}
      </Button>
    </>
  );
};
