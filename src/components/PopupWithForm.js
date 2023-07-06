function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={`${props.name}Form`} noValidate>
          {props.children}
          <button type="submit" className="popup__submit-button">{props.titleButton||'Сохранить'}</button>
        </form>
        <button type="button" name="submitButton" className="popup__exit-button button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;