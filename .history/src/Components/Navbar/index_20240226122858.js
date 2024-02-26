import React from "react";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton";
import CartButton from "./CartButton";
import TopToast from "./TopToast"; // Ensure this is correctly imported
import styles from "./styles.module.css";
import { useProduct } from "../../Context/ProductContext";
import { useAuth } from "../../Context/AuthContext";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/react/outline";
import NAVIGATION from "../../Config/navbarItemList";
import logo from "../../Assets/Screenshots/EpicBazzar-logos_black.png";

const Navbar = () => {
  const { categories, setCategory } = useProduct();
  const { loggedIn, logout, setIsSubmitting } = useAuth();

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      await logout();
    } catch {
      alert("Error");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between pt-3 pb-3 px-4 bg-sky-100">
              {/* Hamburger menu positioned to the extreme left for small screens */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-9 w-9" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-9 w-9" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo and "Epic Bazaar" text centered */}
              <div
                className="flex-1 flex justify-center sm:justify-start"
                style={{ marginLeft: "90px" }}
              >
                <Link className={styles.link} to="/">
                  <p
                    style={{
                      fontFamily: "Protest Riot",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    <img src={logo} style={{ height: "40px" }} />
                  </p>
                </Link>
              </div>

              {/* Right-aligned items, including always visible CartButton and conditionally visible TopToast */}
              <div className="flex items-center">
                {/* TopToast visible on large screens */}
                <div
                  className="hidden lg:block"
                  style={{ marginRight: "160px" }}
                >
                  <TopToast />
                </div>

                {/* MenuButton hidden on small screens, visible on larger screens */}
                <div className="hidden sm:block">
                  <MenuButton />
                </div>

                {/* CartButton always visible */}
                <CartButton />
              </div>
            </div>

            <Disclosure.Panel className={styles.disclosurePanel}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {NAVIGATION.map(({ id, name, link, icon }) => (
                  <Link to={link} key={id}>
                    <Disclosure.Button
                      className={`${styles.disclosureButton} flex`}
                    >
                      {icon}
                      {name}
                    </Disclosure.Button>
                  </Link>
                ))}
                {loggedIn && (
                  <Link to="/" onClick={handleLogout}>
                    <Disclosure.Button className={styles.disclosureButton}>
                      <LogoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      Logout
                    </Disclosure.Button>
                  </Link>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <nav
        className={styles.categoryNav}
        style={{
          height: "auto",
          width: "100%",
          padding: "10px 0",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div>
          <Link
            className={styles.categoryLink}
            to="/"
            onClick={() => setCategory("")}
          >
            <h1
              className="truncate transition ease-in-out hover:scale-110 duration-300"
              style={{ fontWeight: "600" }}
            >
              Home
            </h1>
          </Link>
        </div>
        {categories &&
          categories.map((item, index) => (
            <div key={`${item}-${index}`}>
              <Link
                className={styles.categoryLink}
                to={`/${item.toLowerCase()}`}
                onClick={() => setCategory(item.toLowerCase())}
              >
                <h1
                  className="truncate transition ease-in-out hover:scale-110 duration-300"
                  style={{ fontWeight: "600" }}
                >
                  {item}
                </h1>
              </Link>
            </div>
          ))}
      </nav>
    </>
  );
};

export default Navbar;
