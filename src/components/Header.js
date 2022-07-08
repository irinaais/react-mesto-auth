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
      <div className={"header__container"}>
        {props.loggedIn ?
          <>
            <p className={"header__container_user-email"}>{props.email}</p>
            <button className={"button header__container_button"} onClick={props.onLogout}>{props.text}</button>
          </>
        : <Link to={props.link} className="button header__container_link-text">{props.text}</Link>}
      </div>
    </header>
  );
}

export default Header;