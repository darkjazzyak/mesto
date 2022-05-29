class Card {
  constructor ({item, user, handleCardClick, handleDeleteClick, handleLikeClick}, cardTemplate) {
    this._item = item;
    this._user = user;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardTemplate = cardTemplate;
  }

  //takes the template from the DOM
  _getTemplate() {
    const templateElement = document.querySelector(this._cardTemplate).content
    const cardElement = templateElement.querySelector('.gallery__grid-list-item').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this._item._id);
    });
    this.cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._item._id);
    });
    this._cardImage.addEventListener('click', (event) => {
      this._handleCardClick(event);
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = '';
  }

  isLiked() {
    const likedCard = this._item.likes.find((likeEl) => {
      if (likeEl._id === this._user._id) {
        return true;
      }
    });
    return likedCard;
  }

  _fillLikeStatus() {
    this.cardLikeButton.classList.add('gallery__grid-item-like_liked');
  }
  _eraseLikeStatus() {
    this.cardLikeButton.classList.remove('gallery__grid-item-like_liked');
  }

  _handleLikeFill() {
    if (this.isLiked()) {
      this._fillLikeStatus();
    } else {
      this._eraseLikeStatus();
    }
  }

  setLikesQty(likedCardData) {
    this._item = likedCardData;
    this.likeCount.textContent = this._item.likes.length;
    this._handleLikeFill();
  }

//public method returns comlete card filled with data + listeners
  generateCard () {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__grid-item-image');
    this.cardDeleteButton = this._element.querySelector('.gallery__grid-item-delete');
    this.cardLikeButton = this._element.querySelector('.gallery__grid-item-like');
    this.likeCount = this._element.querySelector('.gallery__grid-item-like-count');
    this.cardText = this._element.querySelector('.gallery__grid-item-text');

    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.name;
    this.cardText.textContent = this._item.name;
    this.likeCount.textContent = this._item.likes.length;
    this._handleLikeFill();
    if (this._item.owner._id !== this._user._id) {
      this.cardDeleteButton.classList.add('gallery__grid-item-delete_invisible');
     }

    this._setEventListeners();
  return this._element;
  };
}

export default Card;
