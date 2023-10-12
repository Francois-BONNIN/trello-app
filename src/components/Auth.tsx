import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import axios from "axios";
import { User } from "../models/User";
import { notifications } from "@mantine/notifications";


export function Auth(
  {setUser, setOpenAuthModal}: {setUser: (user: User) => void, setOpenAuthModal: (open: boolean) => void},
) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  const submit = () => {
    if (type === "login"){
      axios.post("http://localhost:3000/login", {
        email: form.values.email,
        password: form.values.password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        notifications.show({
          title: "Successfull login !",
          message: "Hey there, welcome back !",
        });
        setOpenAuthModal(false);
      })
      .catch((error) => {
        notifications.show({
          title: "Error !",
          message: "Wrong email or password",
          color: "red",
        });
      });
    } else {
      axios
      .post("http://localhost:3000/signup", {
        email: form.values.email,
        password: form.values.password,
      })
      .then((response) => {
        setUser(response.data);
        setOpenAuthModal(false);
        localStorage.setItem("user", JSON.stringify(response.data));
        notifications.show({
          title: "Successfull registration !",
          message: "Hey there, welcome to Trello !",
        });
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Error !",
          message: "Aie aie aie, something went wrong",
          color: "red",
        });
      });
    }
  }

  return (
        <Paper radius="md" p="xl">
      <Text size="lg" fw={500}>
        Welcome to Trello, {type} with
      </Text>
      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@trello.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            radius="md"
          />
        </Stack>
        

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" onClick={submit}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
