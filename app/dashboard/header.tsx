import { IconBone, IconSearch } from "@tabler/icons-react"
import { Grid, Button, Autocomplete, Text, Flex, Burger } from "@mantine/core"
import { useMediaQuery, useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { Navigation } from "./navigation"
import { useAuth } from "~/context/contextProvider"
import { useNavigate } from "react-router"
import '~/app.css'


export function Header() {

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


  return isMobile ? (
    <Flex style={styles.flex} direction="column" justify="center" align='center'>
      <Grid style={styles.mobileGrid} justify="space-around" align="center">
        <Grid.Col style={[styles.mobileGrid, { justifyContent: "left" }]} span={{ base: 6, md: 6, lg: 6 }}>
          <IconBone style={{ paddingRight: 5 }} />
          <Text style={styles.text}>Fetch</Text>
        </Grid.Col>
        <Grid.Col style={[styles.mobileGrid, { justifyContent: "right" }]} span={{ base: 6, md: 6, lg: 6 }}>
          <Burger
            opened={opened}
            lineSize={3}
            onClick={() => {
              toggle();
              setIsVisible(!isVisible);
            }}
            aria-label="Toggle navigation"
          />
        </Grid.Col>
      </Grid>
      {isVisible && <div style={styles.navContainer}><Navigation /></div>}
      <Autocomplete
        style={styles.autocomplete}
        placeholder="Search by breed"
        data={[
          "Vegan Mac and Cheese",
          "Chickpea Salad",
          "Peanut Butter Cookies",
          "Avocado Toast",
        ]}
        leftSection={<IconSearch size={16} stroke={1.5} />}
      />
    </Flex>
  ) : (
    <div style={styles.flex}>
      <Grid style={styles.grid} justify="space-around">
        <Grid.Col style={[styles.grid, { justifyContent: "center" }]} span={{ base: 12, md: 6, lg: 2 }}>
          <IconBone style={{ paddingRight: 5 }} />
          <Text style={styles.text} size='xl' c=''>Fetch</Text>
        </Grid.Col>
        <Grid.Col style={styles.grid} span={{ base: 12, md: 6, lg: 2 }}>
        </Grid.Col>
        <Grid.Col style={[styles.grid, { justifyContent: "space-evenly" }]} span={{ base: 12, md: 6, lg: 6 }}>
          {/* <SearchAndFilter/> */}
        </Grid.Col>
        <Grid.Col style={styles.grid} span={{ base: 12, md: 6, lg: 2 }}>
          <Button variant="transparent" color="brown">My Matches</Button>

          <Button variant='outline' onClick={logoutUser} color="brown"> {user?.name} logout </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    padding: 10,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  flex: {
    position: 'sticky',
    height: 80,
    background: 'white'
  },
  mobileGrid: {
    padding: 15,
    display: "flex",
    justifyContent: "space-evenly",
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
