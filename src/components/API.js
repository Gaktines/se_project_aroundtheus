/*fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });*/

  export default class Api {
    constructor(name, link) {
      this.name = name;
      this.link = link;
      this._baseURL = "https://around.nomoreparties.co/v1/group-12";
      this._headers = {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
        "Content-Type": "application/json",
      };
    }
    getAppInfo() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }
  
    getInitialCards() {
      return this._request(`${this._baseURL}/cards`, {
        method: "GET",
        headers: this._headers,
      });
    }
    updateProfileImage(data) {
      return this._request(
        `${this._baseURL}/users/me/avatar`,
        {
          method: "PATCH",
         headers: this._headers,
          body: JSON.stringify({
            avatar: data.link,
          }),
        }
      );
    }
  
    getUserInfo() {
      return this._request(
        `${this._baseURL}/users/me`,
        {
          method: "GET",
          headers: this._headers,
        }
      );
    }
    updateUserInfo(name, about) {
      return this._request(
        `${this._baseURL}/users/me`,
        {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name,
            about,
          }),
        }
      );
    }
  
    addCard({ name, link }) {
      return this._request(`${this._baseURL}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      });
    }
    deleteCard(id) {
      return this._request(
        `${this._baseURL}/cards/${id}`,
        {
          method: "DELETE",
          headers: this._headers,
        }
      );
    }
    handleDeleteButton() {
      this.deleteBtnModal = document.querySelector("#modal-delete");
      this.deleteBtnModal.classList.add(".modal_opened");
    }
    handleCardLikes() {
      return Promise.all([this.addCardLike(), this.removeCardLike()]);
    }
    addCardLike(id) {
      return this._request(
        `${this._baseURL}/cards/likes/${id}`,
        {
          method: "PUT",
          headers: this._headers,
        }
      );
    }
    removeCardLike(id) {
      return this._request(
        `${this._baseURL}/cards/likes/${id}`,
        {
          method: "DELETE",
          headers: this._headers,
        }
      );
    }
    // other methods for working with the API
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${JSON.stringify(res)}`);
    }
  
    _request(url, options) {
      return fetch(url, options).then(this._checkResponse);
    }
  }
  