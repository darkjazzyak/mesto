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

}
