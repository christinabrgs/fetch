import { IconBone } from "@tabler/icons-react"
import { Grid, Button, Text } from "@mantine/core"
import { useAuth } from "~/utilities/context/contextProvider"
import '~/app.css'


export function Footer() {

  const { user, logout } = useAuth()

  const logoutUser = () => {
    logout()
  }


  return  (
    <div style={styles.flex}>
      <Grid style={styles.grid} justify="space-around">
        <Grid.Col style={[styles.grid, { justifyContent: "left" }]} span={{ base: 12, xs: 6, sm: 6, md: 6, lg: 2 }}>
          <IconBone style={{ paddingRight: 5 }} />
          <Text style={styles.text} size='xl' c=''>Fetch</Text>
        </Grid.Col>
        <Grid.Col style={[styles.grid, { justifyContent: "right" }]} span={{ base: 12, xs: 6, sm: 6, md: 6, lg: 2 }}>
          <Button variant="transparent" color="white">Favorites</Button>

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
    clear: 'both',
    position: 'relative',
    width: '100%'
  },
  text: {
    fontFamily: 'Arvo',
  }
}
