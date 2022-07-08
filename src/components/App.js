import '../index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Api from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as ApiAuth from "../utils/ApiAuth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({name:'',link:'',about:''});
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipOk, setIsInfoTooltipOk] = React.useState(false);
  const [isInfoTooltipFail, setIsInfoTooltipFail] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    Api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    Api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(err => console.log(err));
    handleLogin();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function openInfoTooltipOk() {
    setIsInfoTooltipOpen(true);
    setIsInfoTooltipOk(true);
    setIsInfoTooltipFail(false);
  }

  function openInfoTooltipFail() {
    setIsInfoTooltipOpen(true);
    setIsInfoTooltipOk(false);
    setIsInfoTooltipFail(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  //проверяем наличие у пользователя токена. Если он есть в localStorage, берем токен оттуда
  function handleLogin() {
    tokenCheck();
  }

  //если у пользователя есть токен в localStorage, проверяем действующий он или нет
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      ApiAuth.tokenCheck(token)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onLogin(email, password) {
    ApiAuth.authorise(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipFail();
      });
  }

  function onLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate("/sign-in");
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(cardForDelete) {
    setCardForDelete(cardForDelete);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardConfirmDelete() {
    setIsConfirmDeletePopupOpen(true);
    Api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardForDelete._id && c));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userData) {
    Api.saveUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    Api.editAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    Api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="/" element={<><Header email={email} text={"Выйти"} loggedIn={loggedIn} onLogout={onLogOut}/>
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick} onCardClick={onCardClick}
                    onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick}
                    cards={cards}/></>
            }/>
          </Route>
          <Route path="/sign-up" element={<><Header link={"/sign-in"} text={"Войти"} loggedIn={loggedIn}/>
                                            <Register onRegister={openInfoTooltipOk} onRegisterError={openInfoTooltipFail}/></>}/>
          <Route path="/sign-in" element={<><Header link={"/sign-up"} text={"Регистрация"} loggedIn={loggedIn}/>
                                            <Login onLogin={onLogin}/> </>}/>
        </Routes>
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}/>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}/>

      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardConfirmDelete}/>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}/>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}/>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isInfoTooltipOk={isInfoTooltipOk}
        isInfoTooltipFail={isInfoTooltipFail}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
