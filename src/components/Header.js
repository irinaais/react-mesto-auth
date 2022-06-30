import logo from '../images/Vector.svg';

function Header() {
  return (
      <header className="header page__section">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип проекта Место"
        />
      </header>
  );
}

export default Header;