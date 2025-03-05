import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "~/context/contextProvider";
import { Header } from "~/dashboard/header";
import '~/app.css'
import { Footer } from "~/dashboard/footer";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
};

export default ProtectedRoute;
