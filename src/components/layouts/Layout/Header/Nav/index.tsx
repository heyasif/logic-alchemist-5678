import { NavLink, Link } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import styles from "./index.module.scss";
import { navData } from "../../../../../data/navItems";
import CartIcon from "./CartIcon";
import { useEffect, useState } from "react";

interface NavBarProps {
  handleShow: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ handleShow }) => {
  const [hasScrolled, setHasSrolled] = useState(false);

  const resizeHeaderOnScroll = () => {
    setHasSrolled((hasScrolled) => {
      if (
        !hasScrolled &&
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
      ) {
        return true;
      }

      if (
        hasScrolled &&
        document.body.scrollTop < 4 &&
        document.documentElement.scrollTop < 4
      ) {
        return false;
      }

      return hasScrolled;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);

  console.log(hasScrolled);
  console.log(navData);
  
  

  const navStyles = hasScrolled
    ? `${styles.nav} ${styles.hasScrolled}`
    : styles.nav;

  return (
    <nav className={navStyles} style={{width: "100%"}} >
      <div className={styles.container_bottom}>
        <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src="https://pics.craiyon.com/2023-06-13/0fafb09f06ec4bfdb40cbb9c103cd7d6.webp" alt="logo" />
        <ul className={styles.links} style={{margin: "auto 0"}} >
          {navData.map((option, index) => {
            return (
              <li key={index} style={{fontSize: "20px"}}>
                <NavLink to={`/catalog/${option.name}`} className={styles.link} style={{color: "white",  fontFamily: "Montserrat"}} >
                  {option.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul className={styles.icons_menu}>
          <li>
            <NavLink to={"/"} className={styles.link}>
              <RiSearch2Line />
            </NavLink>
          </li>
          <li>
            <div className={styles.link} onClick={handleShow}>
              <CartIcon />
            </div>
          </li>
          <li>
            <NavLink to={`/login`} className={styles.link}>
              <RiUserLine />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
