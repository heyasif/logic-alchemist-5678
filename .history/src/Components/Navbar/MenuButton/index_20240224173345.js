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

const MenuButton = () => {
  const { loggedIn, currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Your logout function should handle the state and localStorage updates
    } catch {
      alert("Error during logout.");
    }
  };

  return (
    <div className="justify-content-center mx-auto text-center">
      <Menu as="div" className={styles.menu}>
        <Menu.Button className={styles.menuButton}>
          <UserCircleIcon
            className={styles.userCircleIcon}
            aria-hidden="true"
          />
          {loggedIn ? (
            <>
              {/* Displayed when the user is logged in */}
              <span className="flex flex-col">
                <strong>Hello, {currentUser.firstName || "User"}</strong>
                <ChevronDownIcon
                  className={styles.chevronDownIcon}
                  aria-hidden="true"
                />
              </span>
            </>
          ) : (
            <>
              {/* Displayed when no user is logged in */}
              <span className="flex flex-col">
                <strong>Login</strong>
                <span>or Sign Up</span>
                <ChevronDownIcon
                  className={styles.chevronDownIcon}
                  aria-hidden="true"
                />
              </span>
            </>
          )}
        </Menu.Button>

        <Transition
          as={Fragment}
          {
            ...{
              /* Transition props here */
            }
          }
        >
          <Menu.Items className={styles.menuItems}>
            {loggedIn ? (
              // Menu items for logged-in users
              <>
                <Menu.Item as="div">
                  <Link to="/profile" className={styles.menuItem}>
                    Profile
                  </Link>
                </Menu.Item>
                {/* Add more logged-in user menu items here */}
                <Menu.Item as="div">
                  <button onClick={handleLogout} className={styles.menuItem}>
                    <LogoutIcon
                      className="mr-2 my-auto h-5 w-5"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                </Menu.Item>
              </>
            ) : (
              // Menu items for users who are not logged in
              <>
                <Menu.Item as="div">
                  <Link to="/login" className={styles.menuItem}>
                    Login
                  </Link>
                </Menu.Item>
                <Menu.Item as="div">
                  <Link to="/signup" className={styles.menuItem}>
                    Sign Up
                  </Link>
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuButton;
