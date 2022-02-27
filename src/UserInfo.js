export default class UserInfo {
  constructor ({userNameElement, aboutMeElement}) {
    this._userNameElement = userNameElement;
    this._aboutMeElement = aboutMeElement;
  }

  getUserInfo() {
    this._userName = this._userNameElement.textContent;
    this._aboutMe = this._aboutMeElement.textContent;
    this._userInfoObject = {
      name: this._userName,
      aboutMe: this._aboutMe
    };
    return this._userInfoObject;
  }

  setUserInfo(formData) {
    this._userNameElement.textContent = formData.name;
    this._aboutMeElement.textContent = formData.aboutMe;
  }

}
