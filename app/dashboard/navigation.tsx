import { Grid, NavLink, Button, Center, Flex } from "@mantine/core"
import { useAuth } from "~/utilities/context/contextProvider"
import { useNavigate, Link } from "react-router"

export function Navigation() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const logoutUser = () => {
    logout()
    navigate('/')
  }

  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      style={styles.container}
    >
      <Button variant="transparent" color="#59362a">
        <Link style={styles.link} to={'/match'} reloadDocument>
          My Matches
        </Link>
      </Button>

      <Button variant='outline' onClick={logoutUser} color="#59362a">
        {user?.name} logout
      </Button>
    </Flex>
  )
}


const styles = {
  container: {
    height: '100vh',  // Centers content vertically in full screen
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: '#59362a'
  }
}
