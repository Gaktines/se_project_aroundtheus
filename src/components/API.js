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
  
    getInitialCards() {
      return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
  }
})
  .then(res => res.json())
 
    .then((result) => {
      // process the result
      return result.json;
    })
    .catch((err) => {
      console.error(err); // log the error to the console
  });

  
    
    }
  postInitialCards() {
    fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  getProfileInfo() {

  }
  postProfileInfo() {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  method: "PATCH",
  headers: {
    authorization: "cbb2f5d86-90ca-441b-9ac8-a1ee02058df5",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "George Aktines",
    about: "Aspiring Software Engineer"
  })
});
  }
  deleteCard() {
    fetch("https://around.nomoreparties.co/v1/group-12/cards/likes/cardId", {
    method: "delete",  
    headers: {
        authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }
  cardLike() {
    fetch("https://around.nomoreparties.co/v1/group-12/cards/likes/cardId ", {
      method: "Put",  
      headers: {
          authorization: "bb2f5d86-90ca-441b-9ac8-a1ee02058df5"
        }
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
        });
  }
    // other methods for working with the API
  }
  
  