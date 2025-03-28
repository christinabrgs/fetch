import { Container, Text, Flex, Input, CloseButton } from "@mantine/core";
import { Button } from "@mantine/core";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useAuth } from "~/utilities/context/contextProvider";
import { useEffect, useState } from "react";
import "./dog.scss";
import { IconAt } from "@tabler/icons-react";
import { Form } from "react-router-dom";

export default function Landing() {
  const { login } = useAuth()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  // const navigate = useNavigate()

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Attempting login with:", name, email);

    if (name && email) {
      login(name, email)
      navigate("/dashboard")
    }
  }



  const [isVisible, setIsVisible] = useState<boolean>(false)



  const navigate: NavigateFunction = useNavigate()

  const { user } = useAuth();


  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user])


  function handleSubmit() {
    // navigate("/login")
    setIsVisible(prev => !prev)
  }


  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: 'column',
        background: '#573629'
      }}
      fluid
    >

      <Text
        style={{ color: 'white', marginRight: 10, fontFamily: 'Arvo', fontSize: 40 }}
      >
        ADOPT A DOG {" "} 

      </Text>

      {isVisible ? (
        // <div style={{ height: 380, width: '100%', display: 'block' }}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            flexDirection: 'column'
          }}
          fluid
        >
          <Form onSubmit={handleLogIn}>

            <Input
              type='email'
              placeholder="Your email"
              leftSection={<IconAt size={16} />}
              value={email}
              style={{width: 300}}
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

            <Flex
              direction="row"
              align="center"
              justify='center'
              style={{padding: 40}}
            >
              <Button type="submit" variant="light" size='xl' color="yellow">
                Sign In
              </Button>
            </Flex>

          </Form>
        </Container>
        // </div>
      ) : (
        <>
          <div style={{ height: 380, width: '100%', display: 'block', background: '#573629' }}>
            <div className="container">
              <div className="corgi">
                <div className="head">
                  <div className="ear ear--r"></div>
                  <div className="ear ear--l"></div>
                  <div className="eye eye--left"></div>
                  <div className="eye eye--right"></div>
                  <div className="face">
                    <div className="face__white">
                      <div className="face__orange face__orange--l"></div>
                      <div className="face__orange face__orange--r"></div>
                    </div>
                  </div>
                  <div className="face__curve"></div>
                  <div className="mouth">
                    <div className="nose"></div>
                    <div className="mouth__left">
                      <div className="mouth__left--round"></div>
                      <div className="mouth__left--sharp"></div>
                    </div>
                    <div className="lowerjaw">
                      <div className="lips"></div>
                      <div className="tongue test"></div>
                    </div>
                    <div className="snout"></div>
                  </div>
                </div>
                <div className="neck__back"></div>
                <div className="neck__front"></div>
                <div className="body">
                  <div className="body__chest"></div>
                </div>
                <div className="foot foot__left foot__front foot__1"></div>
                <div className="foot foot__right foot__front foot__2"></div>
                <div className="foot foot__left foot__back foot__3"></div>
                <div className="foot foot__right foot__back foot__4"></div>
                <div className="tail test"></div>
              </div>
            </div>
          </div>

          <Flex
            direction="row"
            align="center"
          >

            <Button type="submit" variant="light" size='xl' color="yellow" onClick={handleSubmit}>
              SIGN IN
            </Button>
          </Flex>
        </>
      )}


    </Container>
  );
}
