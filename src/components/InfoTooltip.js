import PopupWithForm from "./PopupWithForm";
import successfulRegistration from "../images/Union.png";
import unSuccessfulRegistration from "../images/Union---.png";

function InfoTooltip(props) {
  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose}>
      <img src={successfulRegistration} className="popup__infotooltip-image" alt="успешная регистрация"/>
      <h2 className="popup__infotooltip-text">Вы успешно зарегистрировались!</h2>
    </PopupWithForm>
  )

  // return (
  //   <PopupWithForm isOpen={props.isOpen} onClose={props.onClose}>
  //     <img src={unSuccessfulRegistration} className="popup__infotooltip-image" alt="ошибка при регистрации"/>
  //     <h2 className="popup__infotooltip-text">Что-то пошло не так! Попробуйте еще раз.</h2>
  //   </PopupWithForm>
  // )
}

export default InfoTooltip;