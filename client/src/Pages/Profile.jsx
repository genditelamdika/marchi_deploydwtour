import { Container } from "react-bootstrap";
import DetailProfile from "../Components/DetailProfile";
import NavProfile from "../Components/Navbar";
import CardHistory from "../Components/CardTripHistory";
import Footer from "../Components/Footer";
import { useCustomQuery } from "../config/query";
import { User } from "../utils/profile";
import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState();
  let { data, refetch } = useCustomQuery("profile", User);
  console.log(data);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  console.log(profile, " ini terbaru");

  return (
    <>
      <NavProfile />
      <DetailProfile data={profile} />
      <Container className="historyTrip">
        <h1 style={{ position: "relative", left: "120px", marginTop: "140px" }}>
          History Trip
        </h1>
      </Container>
      <CardHistory data={profile} />

      <Footer />
    </>
  );
};

export default Profile;
