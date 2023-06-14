export default class UserInfo {
  constructor({ name, about }) {
    this.name = document.querySelector(name);
    this.about = document.querySelector(about);
  }
  getUserInfo() {
    // return the text properties of this.name and this.job
    return { name: this.name.textContent, about: this.about.textContent };
  }
  setUserInfo({ name, about }) {
    // When form is submitted, set the profile info
    this.name.textContent = name;
    this.about.textContent = about;
  }
}
