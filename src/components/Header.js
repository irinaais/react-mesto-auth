import logo from '../images/Vector.svg';
import {Link} from "react-router-dom";
import React from "react";

function Header(props) {
  return (
      <header className="header page__section">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип проекта Место"
        />
        <Link to={props.link} className="button header__link-text">{props.linkText}</Link>
      </header>
  );
}

export default Header;