import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingAnimation from "./LoadingAnimation";

function Main({onEdit, onAdd, onAvatar, onImageClick, onDelete, cards, isLoading}) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button type="button" className="profile__avatar-button" onClick={onAvatar}>
            {isLoading? <LoadingAnimation />:<img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="Фото профиля"/>}
          </button>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : '#'}</h1>
              <button type="button" className="profile__edit-button button" onClick={onEdit}></button>
            </div>
            <p className="profile__job">{currentUser.about ? currentUser.about : '#'}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button button" onClick={onAdd}></button>
      </section>
      <section className="elements">
        {isLoading? <LoadingAnimation />: cards.map(item => {
          return (
            <div className="elements__element" key = {item._id}>  
              <Card card={item} onImageClick={onImageClick} onDelete={onDelete}/>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Main;