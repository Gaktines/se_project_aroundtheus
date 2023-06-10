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
    }
    getAppInfo() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
    
    getInitialCards() {
      return this._request("https://around.nomoreparties.co/v1/group-12/cards", {
        method: "GET",
            headers: {
          authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
        }});
        
}

    
    
  getUserInfo() {
 return this._request("https://around.nomoreparties.co/v1/group-12/users/me", {
        method: "GET",
            headers: {
          authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
          "Content-Type": "application/json"
        }});
  }
  updateUserInfo(name, about) {
      return this._request("https://around.nomoreparties.co/v1/group-12/users/me", {
        method: "GET",
            headers: {
          authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
          "Content-Type": "application/json"},
           body: JSON.stringify({
            name,
            about
            })
        });
  }
  
  addCard({name, link}) {

    return this._request("https://around.nomoreparties.co/v1/group-12/cards", {
        method: "POST",
            headers: {
          authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
          "Content-Type": "application/json"},
           body: JSON.stringify({
            name,
            link
            })
        });
  }
  deleteCard(id) {
    return this._request(`https://around.nomoreparties.co/v1/group-12/cards/${id}`, {
      method: "DELETE",
          headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
      }});
      
  }
  handleDeleteButton() {
    this.deleteBtnModal = document.querySelector("#modal-delete");
    this.deleteBtnModal.classList.add(".modal_opened");
  }
  handleCardLikes() {
    return Promise.all([this.addCardLike(), this.removeCardLike()])
  }
  addCardLike(id) {
    return this._request(`https://around.nomoreparties.co/v1/group-12/cards/likes/${id}`, {
      method: "PUT",
          headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
      }});
        
  }
  removeCardLike(id) {
    return this._request(`https://around.nomoreparties.co/v1/groupId/cards/likes/${id}`, {
      method: "DELETE",
          headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
      }});
    
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
  