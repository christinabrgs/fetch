import { IconBone, IconSearch } from "@tabler/icons-react"
import { Grid, Button, Autocomplete, Text, Flex, Burger } from "@mantine/core"
import { useMediaQuery, useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { Navigation } from "./navigation"
import { useAuth } from "~/utilities/context/contextProvider"
import { useNavigate } from "react-router"
import '~/app.css'


export function Header() {

  const navigate = useNavigate()

  const [opened, { toggle }] = useDisclosure()
  const [isVisible, setIsVisible] = useState(false)
  const { user, logout, isMobile } = useAuth()

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


  const logoutUser = () => {
    logout()
    navigate('/')
  }


  return isMobile ? (
    <Flex style={styles.mobileflex} direction="column" align='center'>
      <Flex direction="row" justify="space-between" align="center" style={{ width: "100%", padding: 20 }}>
        <Flex align="center">
          <IconBone style={{ paddingRight: 5 }} size={30} />
          <Text>Fetch</Text>
        </Flex>

        <Burger
          opened={opened}
          lineSize={3}
          onClick={() => {
            toggle();
            setIsVisible(!isVisible);
          }}
          aria-label="Toggle navigation"
        />
      </Flex>
      {isVisible && <div style={styles.navContainer}><Navigation /></div>}
    </Flex>
  ) : (
    <div style={styles.flex}>
      <Grid style={styles.grid} justify="space-around" >
        <Grid.Col style={[styles.grid, { justifyContent: "center" }]} span={{ base: 12, md: 6, lg: 2 }}>
          <IconBone color='#59362a' style={{ paddingRight: 5 }} />
          <Text style={styles.text} size='xl' c=''>Fetch</Text>
        </Grid.Col>
        <Grid.Col style={styles.grid} span={{ base: 12, md: 6, lg: 2 }}>
        </Grid.Col>
        <Grid.Col style={[styles.grid, { justifyContent: "space-evenly" }]} span={{ base: 12, md: 6, lg: 6 }}>
          {/* <SearchAndFilter/> */}
        </Grid.Col>
        <Grid.Col style={styles.grid} span={{ base: 12, md: 6, lg: 2 }}>
          <Button variant="transparent" color="#59362a">My Matches</Button>

          <Button variant='outline' onClick={logoutUser} color="#59362a"> {user?.name} logout </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    padding: 13,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: '#59362a'
  },
  flex: {
    position: 'sticky',
    height: 80,
    background: 'white',
    top: 0,
    zIndex: 100
  },
  mobileflex: {
    position: 'sticky',
    width: '100%'
  },
  mobileGrid: {
    padding: 15,
    display: "flex",
    alignItems: "center",
  },
  navContainer: {
    height: "100vh",
    zIndex: 1,
  },
  autocomplete: {
    width: "90%",
    margin: "auto",
  },
  text: {
    fontFamily: 'Arvo',
  }
}
