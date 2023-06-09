import Navbar from "../Components/Navbar";
import Cards from "../Components/Card";
import Jumbotron from "../Components/Jumbotron";
import Contents from "../Components/Group";
import Footer from "../Components/Footer";
import Button from "../Components/Button";
import { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar />
      <Jumbotron />
      <Button onSearch={handleSearch} />
      <Cards />
      <Contents searchTerm={searchTerm} />
      <Footer />
    </>
  );
};

export default Home;
