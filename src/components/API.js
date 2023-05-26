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
      return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
  method: "GET",
      headers: {
    authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
  }
})
  .then(res => res.json())
 
    /*.then((result) => {
      // process the result
      return result.json;
    })*/
    .catch((err) => {
      console.error(err); // log the error to the console
  });
    }
  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "PATCH",
      headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist"
      })
    }); 
  }
  addCard() {
    return fetch(`POST https://around.nomoreparties.co/v1/group-12/cards/${id}`, {
      method: "POST",
      headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
  }
  deleteCard(id) {
   return fetch(`POST https://around.nomoreparties.co/v1/group-12/cards/${id}`, {
    method: "DELETE",  
    headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
      }
    })
     .then(res => res.json())
      
  }
  handleDeleteButton() {
    this.deleteBtnModal = document.querySelector("#modal-delete");
    this.deleteBtnModal.classList.add(".modal_opened");
  }
  handleCardLikes() {
    return Promise.all([this.addCardLike(), this.removeCardLike()])
  }
  addCardLike(id) {
    return fetch(`https://around.nomoreparties.co/v1/group-12/cards/likes/${id}`, {
    method: "PUT",  
    headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
      }
    })
      .then(res => res.json())
        
  }
  removeCardLike() {
    return fetch(`https://around.nomoreparties.co/v1/groupId/cards/likes/${id}`, {
      method: "DELETE",  
      headers: {
          authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
        }
    })
    .then(res => res.json())
  }
    // other methods for working with the API
    handleLikeClick()  {
      //tell API to add like
      return fetch(`https://around.nomoreparties.co/v1/group-12/cards/likes/${id}`, {
    method: "PUT",  
    headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
      }
    })
      //get response from API
    
  }
  
  
}
  