import { useEffect, useState } from "react";
import api from "./utils/api";
import Card from "./Card";

function Main({onEdit, onAdd, onAvatar, onImageClick}) {
  const [userName, setUserName] = useState('')
  const [userJob, setUserJob] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setUserName(userData.name)
      setUserJob(userData.about)
      setUserAvatar(userData.avatar)
      cardsData.forEach(item => item.userId = userData._id);
      setCards(cardsData)
    })
    .catch((error => console.error(`Ошибка при загрузке ${error}`)))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button type="button" className="profile__avatar-button" onClick={onAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Фото профиля"/>
          </button>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit-button button" onClick={onEdit}></button>
            </div>
            <p className="profile__job">{userJob}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button button" onClick={onAdd}></button>
      </section>
      <section className="elements">
        {cards.map(item => {
          return (
            <div className="elements__element" key = {item._id}>  
              <Card card={item} onImageClick={onImageClick}/>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Main;