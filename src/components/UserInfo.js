export default class UserInfo {
  constructor({ name, subheading }) {
    this.name = document.querySelector(name);
    this.subheading = document.querySelector(subheading);
  }
  getUserInfo() {
    // return the text properties of this.name and this.job
    return { name: this.name.textContent, subheading: this.subheading.textContent };
  }
  setUserInfo({ name, subheading }) {
    // When form is submitted, set the profile info
    this.name.textContent = name.value;
    this.subheading.textContent = subheading.value;
  }
}
