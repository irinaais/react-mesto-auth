import '../index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

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

  React.useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(err => console.log(err));
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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
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
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardConfirmDelete() {
    setIsConfirmDeletePopupOpen(true);
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardForDelete._id && c));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userData) {
    api.saveUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api.editAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/*<Header />*/}
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/cards"/> : <Navigate to="/sign-in"/>}/>
          <Route path="/sign-up" element={<><Header link={"/sign-in"} linkText={"Войти"}/><Register /></>}/>
          <Route path="/sign-in" element={<><Header link={"/sign-up"} linkText={"Регистрация"}/><Login /></>}/>
          <Route path="/cards" element={<Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                                              onEditAvatar={handleEditAvatarClick} onCardClick={onCardClick}
                                              onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick} cards={cards}/>}/>
          {/*<ProtectedRoute exact path="/"*/}
          {/*                loggedIn={loggedIn}*/}
          {/*                component={Main}*/}
          {/*                onEditProfile={handleEditProfileClick}*/}
          {/*                onAddPlace={handleAddPlaceClick}*/}
          {/*                onEditAvatar={handleEditAvatarClick}*/}
          {/*                onCardClick={onCardClick}*/}
          {/*                onCardLike={handleCardLike}*/}
          {/*                onCardDelete={handleCardDeleteClick}*/}
          {/*                cards={cards}>*/}
          {/*</ProtectedRoute>*/}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
