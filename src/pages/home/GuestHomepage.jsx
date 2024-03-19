import { useNavigate } from "react-router-dom";
import Hero from "../../components/home/hero/Hero";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const GuestHomepage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate, user]);
  return (
    <>
      <Hero />
    </>
  );
};

export default GuestHomepage;
