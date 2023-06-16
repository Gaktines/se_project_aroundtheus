export default class UserInfo {
  constructor({ name, about, avatar }) {
    this.name = document.querySelector(name);
    this.about = document.querySelector(about);
    this.avatar = document.querySelector(".profile__image");
  }
  getUserInfo() {
    // return the text properties of this.name and this.job
    return { name: this.name.textContent, about: this.about.textContent, avatar: this.avatar.src };
  }
  setUserInfo({ name, about, avatar }) {
    // When form is submitted, set the profile info
    this.name.textContent = name;
    this.about.textContent = about;
  this.avatar.src = avatar;
  }
}
