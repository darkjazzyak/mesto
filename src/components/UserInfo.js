export default class UserInfo {
  constructor ({userNameElement, aboutMeElement}) {
    this._userNameElement = userNameElement;
    this._aboutMeElement = aboutMeElement;
  }

  getUserInfo() {
    this._name = this._userNameElement.textContent;
    this._about = this._aboutMeElement.textContent;
    this._userInfoObject = {
      name: this._name,
      about: this._about
    };
    return this._userInfoObject;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._aboutMeElement.textContent = data.about;
  }

}
