import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import Detailtour from "./Pages/DetailTour";
import Profile from "./Pages/Profile";
import Waiting from "./Pages/Waiting";
import Admin from "./Pages/Admin/Admin";
import WaitingApprove from "./Pages/WaitingApprove";
import IncomingTrip from "./Pages/Admin/IncomingTrip";
import AddTrip from "./Pages/Admin/AddTrip";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "./utils/context/userContext";
import { API, setAuthToken } from "./config/api";
import {
  PrivateRouteAdmin,
  PrivateRouteLogin,
  PrivateRouteUser,
  PublicRoute,
} from "./config/privateRoute";

function App() {
  const NotFoundPage = () => {
    const location = useLocation();

    useEffect(() => {
      Swal.fire({
        title: "Halaman tidak ditemukan",
        text: `Halaman "${location.pathname}" tidak ditemukan.`,
        icon: "error",
      });
    }, [location]);

    return <Navigate to="/" />;
  };

  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        <Navigate to="/" />;
      }
    }
  }, [isLoading, state.isLogin]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("check-auth");

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <>
        {isLoading ? null : (
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/Detail/:id" element={<Detailtour />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<PrivateRouteLogin />}>
              <Route element={<PrivateRouteUser />}>
                <Route path="/Waiting" element={<Waiting />} />
                <Route path="/WaitingPayment" element={<WaitingApprove />} />
                <Route path="/Profile" element={<Profile />} />
              </Route>
              <Route element={<PrivateRouteAdmin />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/trip" element={<IncomingTrip />} />
                <Route path="/AddTrip" element={<AddTrip />} />
              </Route>
            </Route>

            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </>
    </Router>
  );
}

export default App;
