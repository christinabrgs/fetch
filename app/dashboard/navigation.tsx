import { Grid, NavLink, Button, Center, Flex } from "@mantine/core"
import { useAuth } from "~/utilities/context/contextProvider"
import { useNavigate } from "react-router"

export function Navigation() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const logoutUser = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <Flex style={{height: '100%'}} align='center'>
      <Grid style={styles.gridContainer} justify="center">
        <Grid.Col style={styles.grid} span={{ base: 12, sm: 1, md: 1, lg: 1 }}>
          {/* <NavLink variant="subtle" color="gray" label="Text" /> */}
          <Button variant="transparent" color="#59362a">My Matches</Button>

        </Grid.Col>
        <Grid.Col style={styles.grid} span={{ base: 12, sm: 1, md: 1, lg: 1 }}>
        <Button variant='outline' onClick={logoutUser} color="#59362a"> {user?.name} logout </Button>
        </Grid.Col>
      </Grid>
      </Flex>
    </>
  )
}

const styles = {
  gridContainer: {
    padding: 0,
    width: '100%',
    height: '10%',
  },
  grid: {
    padding: 0,
    display: 'flex',
    justifyContent: "center",
    alignContent: 'center'
  },
}
