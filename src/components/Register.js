import React from "react";
import {Link, useNavigate} from "react-router-dom";
import * as ApiAuth from "../ApiAuth";

function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    ApiAuth.register(email, password)
      .then((res) => {
        if (res.data) {
          setEmail('');
          setPassword('');
          navigate('/sign-in');
          props.onRegister();
        } else {
          props.onRegisterError();
        }
      })
      .catch((err) => {
        console.log(err);
        props.onRegisterError();
      });
  }

  return (
    <section className="registration page__section">
      <h2 className="registration__title">Регистрация</h2>
      <form className="registration__form" onSubmit={handleSubmit}>
        <fieldset className="registration__info">
          <input className="registration__input registration__input_email" type="email"
                 id="email-input" required size="14" minLength="1" maxLength="30" placeholder="Email"
                 name="email" value={email || ''} onChange={handleChangeEmail}/>
          <span className="registration__input-error email-input-error"/>
          <input className="registration__input registration__input_password" type="password"
                 id="password-input" required size="14" placeholder="Пароль"
                 name="password" value={password || ''} onChange={handleChangePassword}/>
          <span className="registration__input-error password-input-error"/>
        </fieldset>
        <button className="button registration__button registration__submit" type="submit"
                aria-label="Зарегистрироваться">Зарегистрироваться</button>
        <p className="registration__text">Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="registration__link">Войти</Link>
        </p>
      </form>
    </section>
  )
}

export default Register;