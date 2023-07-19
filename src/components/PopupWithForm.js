function PopupWithForm({isOpen, onClose, name, title, titleButton, children, onSubmit, isSending, isValid=true}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`${name}Form`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`popup__submit-button ${isValid ? '' : 'popup__submit-button_inactive'}`} disabled={isSending}>
            {isSending ? 'Обработка...' : titleButton||'Сохранить'}
          </button>
        </form>
        <button type="button" name="submitButton" className="popup__exit-button button" onClick={onClose}/>
      </div>
    </div>
  )
}

export default PopupWithForm;