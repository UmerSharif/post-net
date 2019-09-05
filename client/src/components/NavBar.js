import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function MenuExampleSecondaryPointing() {
  const pathname = window.location.pathname; //get the path like /, /login, /register

  const path = pathname === "/" ? "home" : pathname.substr(1); // use substr just to get login instead of /login

  const [activeItem, setState] = useState(path);
  const handleItemClick = (e, { name }) => setState(name);
  const context = useContext(AuthContext);

  const { user, logout } = context;
  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={logout} //contex.logout
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="register"
        />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
}
