import { IconBone, IconSearch } from "@tabler/icons-react"
import { Grid, Button, Autocomplete, Text, Flex, Burger } from "@mantine/core"
import { useMediaQuery, useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { Navigation } from "./navigation"
import { useAuth } from "~/context/contextProvider"
import { useNavigate } from "react-router"
import '~/app.css'


export function Footer() {

  const navigate = useNavigate()

  const [opened, { toggle }] = useDisclosure()
  const [isVisible, setIsVisible] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden" // Disable scrolling
    } else {
      document.body.style.overflow = "" // Re-enable scrolling
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = ""
    }
  }, [isVisible])

  const isMobile = useMediaQuery("(max-width: 1199px)")

  const logoutUser = () => {
    logout()
    navigate('/')
  }


  return  (
    <div style={styles.flex}>
      <Grid style={styles.grid} justify="space-around">
        <Grid.Col style={[styles.grid, { justifyContent: "center" }]} span={{ base: 12, md: 6, lg: 2 }}>
          <IconBone style={{ paddingRight: 5 }} />
          <Text style={styles.text} size='xl' c=''>Fetch</Text>
        </Grid.Col>
        <Grid.Col style={styles.grid} span={{ base: 12, md: 6, lg: 2 }}>
        </Grid.Col>
        <Grid.Col style={[styles.grid, { justifyContent: "space-evenly" }]} span={{ base: 12, md: 6, lg: 6 }}>
        </Grid.Col>
        <Grid.Col style={styles.grid} span={{ base: 12, md: 6, lg: 2 }}>
          <Button variant="transparent" color="white">My Matches</Button>

          <Button variant='outline' onClick={logoutUser} color="white"> {user?.name} logout </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    padding: 20,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: 'center',
    color: 'white',
    height: '100%'
  },
  flex: {
    height: 160,
    background: '#58362a',
    bottom: 0,
    zIndex: 100,
  },
  text: {
    fontFamily: 'Arvo',
  }
}
