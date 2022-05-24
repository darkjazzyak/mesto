class Card {
  constructor ({item, user, handleCardClick, handleDeleteClick}, cardTemplate) {
    this._item = item;
    this._user = user;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardTemplate = cardTemplate;
  }

  //takes the template from the DOM
  _getTemplate() {
    const templateElement = document.querySelector(this._cardTemplate).content
    const cardElement = templateElement.querySelector('.gallery__grid-list-item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__grid-item-like').addEventListener('click', () => {
      this._toggleLikeStatus();
      });
    this._element.querySelector('.gallery__grid-item-delete').addEventListener('click', () => {
      this._handleDeleteClick(this._item._id);
      });
    this._element.querySelector('.gallery__grid-item-image').addEventListener('click', (event) => {
      this._handleCardClick(event);
      });
  }

  _toggleLikeStatus() {
    this._element.querySelector('.gallery__grid-item-like').classList.toggle('gallery__grid-item-like_liked');
  }
  deleteCard() {
    this._element.remove();
    this._element = '';
  }

  isLiked() {
    const likedCard = this._item.likes.find((likeEl) => {
      if (likeEl._id === this._item.userId) {
        return true;
      }
    });
    return likedCard;
  }

  _fillLikeStatus() {
    this._element.querySelector('.gallery__grid-item-like').classList.add('gallery__grid-item-like_liked');
  }
  _eraseLikeStatus() {
    this._element.querySelector('.gallery__grid-item-like').classList.remove('gallery__grid-item-like_liked');
  }

  handleLikeFill() {
    if (this.isLiked()) {
      this._fillLikeStatus();
    } else {
      this._eraseLikeStatus();
    }
  }

//public method returns comlete card filled with data + listeners
  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.gallery__grid-item-image').src = this._item.link;
    this._element.querySelector('.gallery__grid-item-image').alt = this._item.name;
    this._element.querySelector('.gallery__grid-item-text').textContent = this._item.name;
    this._element.querySelector('.gallery__grid-item-like-count').textContent = this._item.likes.length;
    this.handleLikeFill();
    if (this._item.owner._id !== this._user._id) {
       this._element.querySelector('.gallery__grid-item-delete').classList.add('gallery__grid-item-delete_invisible');
     }

    this._setEventListeners();
  return this._element;
  };
}

export default Card;
