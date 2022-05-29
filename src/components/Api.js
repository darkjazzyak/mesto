export default class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserData() {
    return fetch(this._options.userInfoUrl , {
      headers: {
        authorization: this._options.token,
      }
    })
      .then((res) => this._checkResponse(res))
  }

  getCards() {
    return fetch(this._options.cardsUrl , {
      headers: {
        authorization: this._options.token,
      }
    })
    .then((res) => this._checkResponse(res))
  }

  getInitialData() {
   return Promise.all([this.getCards(), this.getUserData()]);
  }

  editUserData(formData) {
    return fetch(this._options.userInfoUrl , {
      method: 'PATCH',
      headers: {
        authorization: this._options.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
      .then((res) => this._checkResponse(res))
  }

  postCard(formData) {
    return fetch(this._options.cardsUrl , {
      method: 'POST',
      headers: {
        authorization: this._options.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        link: formData.link,
      })
    })
      .then((res) => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(this._options.cardsUrl + '/' + id , {
      method: 'DELETE',
      headers: {
        authorization: this._options.token,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => this._checkResponse(res))
  }

  setLike(id) {
    return fetch(this._options.cardsUrl + '/' + id + '/likes', {
      method: 'PUT',
      headers: {
        authorization: this._options.token,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => this._checkResponse(res))
  }

  removeLike(id) {
    return fetch(this._options.cardsUrl + '/' + id + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: this._options.token,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => this._checkResponse(res))
  }

  setAvatar(formData) {
    return fetch(this._options.userInfoUrl + '/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._options.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: formData.link,
      })
    })
      .then((res) => this._checkResponse(res))
  }

}
