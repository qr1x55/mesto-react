import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import '../index.css';
import { useState } from 'react';

function App() {
  const [isEditPopupOpen, setEditPopupOpen] = useState(false)
  const [isAddPopupOpen, setAddPopupOpen] = useState(false)
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false)
  // const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopupOpen] = useState(false)

  function handleEditClick () {
    setEditPopupOpen(true)
  }
  
  function handleAddClick () {
    setAddPopupOpen(true)
  }

  function handleAvatarClick () {
    setAvatarPopupOpen(true)
  }

  function handleImageClick (card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups () {
    setEditPopupOpen(false);
    setAddPopupOpen(false);
    setAvatarPopupOpen(false);
    // setDeletePopupOpen(false);
    setImagePopupOpen(false);
  }

  return (
    <>
      <Header />
      <Main 
        onEdit={handleEditClick}
        onAdd={handleAddClick}
        onAvatar={handleAvatarClick}
        onImageClick={handleImageClick}
      />
      <Footer />
      <PopupWithForm 
        name='edit' 
        title='Редактировать профиль' 
        titleButton='Сохранить' 
        isOpen = {isEditPopupOpen} 
        onClose= {closeAllPopups}
      >
        <label className="popup__input-field">
          <input id="name-input" type="text" name="editName" placeholder="Имя" className="popup__input popup__input_type_name" required minLength="2" maxLength="40"/>
          <span id="name-input-error" className="popup__input-error"></span>
        </label>
        <label className="popup__input-field">
          <input id="job-input" type="text" name="editJob" placeholder="О себе" className="popup__input popup__input_type_job" required minLength="2" maxLength="200"/>
          <span id="job-input-error" className="popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm 
        name='add' 
        title='Новое место' 
        titleButton='Создать' 
        isOpen = {isAddPopupOpen} 
        onClose= {closeAllPopups}
      >
        <label className="popup__input-field">
          <input id="place-input" type="text" name="name" placeholder="Название" className="popup__input popup__input_type_place" required minLength="2" maxLength="30"/>
          <span id="place-input-error" className="popup__input-error"></span>
        </label>
        <label className="popup__input-field">
          <input id="picture-input" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_picture" required/>
          <span id="picture-input-error" className="popup__input-error"></span>
        </label> 
      </PopupWithForm>
      <PopupWithForm 
        name='avatar' 
        title='Обновить аватар' 
        titleButton='Сохранить' 
        isOpen = {isAvatarPopupOpen} 
        onClose= {closeAllPopups}
      >
        <label className="popup__input-field">
          <input id="avatar-input" type="url" name="avatar" placeholder="Ссылка на аватар" className="popup__input popup__input_type_avatar" required/>
          <span id="avatar-input-error" className="popup__input-error"></span>
        </label> 
      </PopupWithForm>
      <PopupWithForm 
        name='delete' 
        title='Вы уверены?' 
        titleButton='Да' 
        // isOpen = {isDeletePopupOpen} 
        // onClose= {closeAllPopups}
      />
      <ImagePopup 
        card = {selectedCard} 
        isOpen = {isImagePopup} 
        onClose = {closeAllPopups}
      />
    </>
  );
}

export default App;
