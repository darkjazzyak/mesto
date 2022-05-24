export default class Api {
  constructor(options) {
    this._options = options;
  }
  getUserData() {
    return fetch(this._options.userInfoUrl , {
      headers: {
        authorization: this._options.token,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch ((error) => console.log(`Ошибка: ${error}`));
  }

  getCards() {
    return fetch(this._options.cardsUrl , {
      headers: {
        authorization: this._options.token,
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch ((error) => console.log(`Ошибка: ${error}`));
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch ((error) => console.log(`Ошибка: ${error}`));
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch ((error) => console.log(`Ошибка: ${error}`));
  }

  deleteCard(id) {
    return fetch(this._options.cardsUrl + '/' + id , {
      method: 'DELETE',
      headers: {
        authorization: this._options.token,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch ((error) => console.log(`Ошибка: ${error}`));
  }

}
