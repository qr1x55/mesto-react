function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_picture ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container popup__container_type_picture" onClick={e => e.stopPropagation()}>
        <img 
          className="popup__picture" 
          src={card.link} 
          alt={`Иллюстрация ${card.name}`} 
        />
        <h2 className="popup__caption">{card.name}</h2>
        <button type="button" className="popup__exit-button button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;