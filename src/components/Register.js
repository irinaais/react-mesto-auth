import React from "react";
import {Link} from "react-router-dom";

function Register () {
  return (
    <div className="registration page__section">
      <h2 className="registration__title">Регистрация</h2>
      <form className="registration__form">
        <fieldset className="registration__info">
          <input className="registration__input registration__input_email" type="email"
                 id="email-input" required size="14" placeholder="Email" />
          <span className="registration__input-error email-input-error"/>
          <input className="registration__input registration__input_password" type="password"
                 id="password-input" required size="14" placeholder="Пароль" />
          <span className="registration__input-error password-input-error"/>
        </fieldset>
        <button className="button registration__button registration__submit" type="submit"
                aria-label="Зарегистрироваться">Зарегистрироваться</button>
        <p className="registration__text">Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="registration__link">Войти</Link>
        </p>
      </form>
    </div>
  )
}

export default Register;