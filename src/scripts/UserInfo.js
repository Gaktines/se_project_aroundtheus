export default class UserInfo {
  constructor({ title, job }) {
    this.title = document.querySelector(title);
    this.job = document.querySelector(job);
  }
  getUserInfo() {
    // return the text properties of this.name and this.job
    return { name: this.title.textContent, job: this.job.textContent };
  }
  setUserInfo({ title, job }) {
    this.title.textContent = title.value;
    this.job.textContent = job.value;
  }
}
