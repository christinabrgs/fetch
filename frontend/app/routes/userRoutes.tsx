import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "~/utilities/context/contextProvider";
import { Header } from "~/components/header";
import '~/app.css'
import { Footer } from "~/components/footer";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/')
  //   }
  // }, [user])

  return (
    <div style={styles.flex}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
};

export default ProtectedRoute;


const styles: Record<string, React.CSSProperties>  = {
  flex: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    flex: '1'
  }
}
