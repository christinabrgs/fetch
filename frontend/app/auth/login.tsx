import { Container, Text, Input, CloseButton, Button } from "@mantine/core";
import { IconAt } from '@tabler/icons-react';
import { useState } from "react";
import { Form } from "react-router-dom";
import { useAuth } from "~/utilities/context/contextProvider";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import '../app.css';

export default function Login() {
  const { login } = useAuth()
  const [name, setName] = useState<string>('chris')
  const [email, setEmail] = useState<string>('christina.brgs@gmail.com')

  const navigate = useNavigate()

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Attempting login with:", name, email);

    if (name && email) {
      login(name, email)
      navigate("/dashboard")
    }
  }

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: 'column'
      }}
      fluid
    >
      <Text>
        Welcome
      </Text>

      <Form onSubmit={handleLogIn}>

        <Input
          type='email'
          placeholder="Your email"
          leftSection={<IconAt size={16} />}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />


        <Input
          placeholder="Your name"
          value={name}
          type='text'
          onChange={(event) => setName(event.currentTarget.value)}
          rightSectionPointerEvents="all"
          mt="md"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setName('')}
              style={{ display: name ? undefined : 'none' }}
            />
          }
        />

        <Button type="submit">
          Sign In
        </Button>

      </Form>
    </Container>
  );
}
