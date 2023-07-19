import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from "../utils/api";
import '../index.css';
import { useState, useCallback, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditPopupOpen, setEditPopupOpen] = useState(false)
  const [isAddPopupOpen, setAddPopupOpen] = useState(false)
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopupOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const [currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')

  const isOpen = isEditPopupOpen || isAddPopupOpen || isAvatarPopupOpen || isDeletePopupOpen || isImagePopup

  const statesForCloseAllPopups = useCallback (() => {
    setEditPopupOpen(false);
    setAddPopupOpen(false);
    setAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopupOpen(false);
  },[])

  const closeAllPopups = useCallback (() => {
    statesForCloseAllPopups()
  },[statesForCloseAllPopups])

  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    function closeByOverlayClick(e) {
      if (e.target.classList.contains('popup')) {
        closeAllPopups()
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEsc);
      document.addEventListener('mousedown', closeByOverlayClick);
      return () => {
        document.removeEventListener('keydown', closeByEsc);
        document.addEventListener('mousedown', closeByOverlayClick)
      }
    }
  }, [isOpen, closeAllPopups])

  function handleEditClick () {
    setEditPopupOpen(true);
  }
  
  function handleAddClick () {
    setAddPopupOpen(true);
  }

  function handleAvatarClick () {
    setAvatarPopupOpen(true);
  }

  function handleImageClick (card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleDeleteClick (cardId) {
    setDeleteCardId(cardId)
    setDeletePopupOpen(true);
  }

  function handleDeleteCard(evt) {
    evt.preventDefault()
    setIsSending(true)
    api.removeCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(item => {
          return item._id !== deleteCardId
        }))
        closeAllPopups()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      cardsData.forEach(item => item.userId = userData._id);
      setCards(cardsData)
      setIsLoading(false)
    })
    .catch((error => console.error(`Ошибка при загрузке ${error}`)))
  }, [])

  function handleUpdateUser(userData, reset) {
    setIsSending(true)
    api.setUserData(userData)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  function handleUpdateAvatar(userData, reset) {
    setIsSending(true)
    api.setAvatar(userData)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  function handleAddPlace(cardData, reset) {
    setIsSending(true)
    api.postCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error => console.error(`Ошибка при загрузке ${error}`)))
      .finally(() => setIsSending(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEdit={handleEditClick}
        onAdd={handleAddClick}
        onAvatar={handleAvatarClick}
        onDelete={handleDeleteClick}
        onImageClick={handleImageClick}
        cards={cards}
        isLoading={isLoading}
      />
      <Footer />
      <EditProfilePopup         
        onAddPlace = {handleUpdateUser}
        isOpen = {isEditPopupOpen} 
        onClose= {closeAllPopups}
        isSending = {isSending}
      /> 
      <AddPlacePopup
        onAddPlace = {handleAddPlace}
        isOpen = {isAddPopupOpen} 
        onClose= {closeAllPopups}
        isSending = {isSending}
      />
      <EditAvatarPopup
        onUpdateAvatar = {handleUpdateAvatar}
        isOpen = {isAvatarPopupOpen} 
        onClose= {closeAllPopups}
        isSending = {isSending}
      />
      <PopupWithForm 
        name='delete' 
        title='Вы уверены?' 
        titleButton='Да' 
        isOpen = {isDeletePopupOpen} 
        onClose = {closeAllPopups}
        onSubmit = {handleDeleteCard}
        isSending = {isSending}
      />
      <ImagePopup 
        card = {selectedCard} 
        isOpen = {isImagePopup} 
        onClose = {closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
