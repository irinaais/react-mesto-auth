import successfulRegistration from "../images/Union.png";
import unSuccessfulRegistration from "../images/Union---.png";
import React from 'react';

function InfoTooltip(props) {
  function handleOverlayClick(evt) {
    if (evt.target===evt.currentTarget) {props.onClose()}
  }

  if (props.isInfoTooltipOk) {
    return (
      <div className={`popup popup_infotooltip ${props.isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
        <div className="popup__infotooltip">
          <img src={successfulRegistration} className="popup__infotooltip-image" alt="успешная регистрация"/>
          <h2 className="popup__infotooltip-text">Вы успешно зарегистрировались!</h2>
          <button className="button popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть попап"/>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`popup popup_infotooltip ${props.isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
        <div className="popup__infotooltip">
          <img src={unSuccessfulRegistration} className="popup__infotooltip-image" alt="ошибка при регистрации"/>
          <h2 className="popup__infotooltip-text">Что-то пошло не так! Попробуйте еще раз.</h2>
          <button className="button popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть попап"/>
        </div>
      </div>
    )
  }
}

export default InfoTooltip;