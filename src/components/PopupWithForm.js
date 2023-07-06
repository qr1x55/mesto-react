function PopupWithForm({isOpen, onClose, name, title, titleButton, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`${name}Form`}>
          {children}
          <button type="submit" className="popup__submit-button">{titleButton||'Сохранить'}</button>
        </form>
        <button type="button" name="submitButton" className="popup__exit-button button" onClick={onClose}/>
      </div>
    </div>
  )
}

export default PopupWithForm;