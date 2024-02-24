import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import styles from "./styles.module.css";
import { useAuth } from "../../../Context/AuthContext";
import NAVIGATION from "../../../Config/navbarItemList";

const MenuButton = () => {
  const { loggedIn, currentUser, setIsSubmitting, logout } = useAuth();

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
    <div className="justify-content-center mx-auto text-center">
      <Menu as="div" className={styles.menu}>
        <div>
          <Menu.Button className={styles.menuButton}>
            <UserCircleIcon
              className={styles.userCircleIcon}
              aria-hidden="true"
            />
            <div className="flex flex-col">
              {loggedIn ? (
                <>
                  <div className="text-left">
                    <strong>Hello, {currentUser.firstName || "User"}</strong>
                  </div>
                  <ChevronDownIcon
                    className={styles.chevronDownIcon}
                    aria-hidden="true"
                  />
                </>
              ) : (
                <>
                  <div className="text-left">
                    <strong>Login</strong>
                  </div>
                  <div>or Sign Up</div>
                  <ChevronDownIcon
                    className={styles.chevronDownIcon}
                    aria-hidden="true"
                  />
                </>
              )}
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          {
            ...{
              /* Transition props */
            }
          }
        >
          <Menu.Items className={styles.menuItems}>
            {NAVIGATION.map(
              ({ id, name, link, icon, loggedIn: itemVisibleWhenLoggedIn }) => (
                <Menu.Item key={id}>
                  {({ active }) => (
                    <Link
                      to={link}
                      className={`${active ? "bg-zinc-400/10" : ""} ${
                        styles.link
                      }`}
                      onClick={name === "Logout" ? handleLogout : undefined}
                    >
                      {icon && <icon className="mr-2" aria-hidden="true" />}
                      {name}
                    </Link>
                  )}
                </Menu.Item>
              )
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuButton;
