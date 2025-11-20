import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarComp.module.scss";
import Logo from "../../assets/images/logo.png";
import CustomButton from "../button/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  CONTACT_PAGE,
  HOMEPAGE,
  HOST_PAGE,
  PODCAST_PAGE,
} from "../../routes/RoutesNames";

const NavbarComp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Logo} alt="" className={styles.logo} />
      </div>

      <div className={styles.links}>
        <Link to={HOMEPAGE}>Home</Link>
        <Link to={PODCAST_PAGE}>Podcast</Link>
        <Link to={HOST_PAGE}>Hosts</Link>
        <Link to={CONTACT_PAGE}>Contact</Link>
        <CustomButton
          variant="contained"
          onClick={() => navigate("/login")}
          fontColor="#000"
          backgroundColor="#02C7AD"
          size="1rem"
          borderRadius="4px"
          disabled={false}
        >
          Login
        </CustomButton>
      </div>
    </nav>
  );
};

export default NavbarComp;
