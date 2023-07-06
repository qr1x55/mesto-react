function Card ({ card, onImageClick}) {
  return(
    <>
      <img 
        className="elements__picture" 
        src={card.link} 
        alt={`Изображение ${card.name}`} 
        onClick={() => onImageClick({link: card.link, name: card.name})}
      />
      <div className="elements__caption-block">
        <h2 className="elements__caption">{card.name}</h2>
        <div className="elements__like-container">
          <button type="button" className="elements__like-button"></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button type="button" className="elements__remove-button"/>
    </>
  )
}

export default Card;