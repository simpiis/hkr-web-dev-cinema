



function accountMain() {
  console.log("anders e cool")

  if (checkLogin()) {
    displayAccountInfo();
    
  } else {
    displayLogin();
  }

}



// check of user is logged in
function checkLogin() {
  if (window.sessionStorage.getItem("user")) {
    return true;
  }
}


// shows booking history
function displayAccountInfo() {
  
}

function displayLogin() {
  let body = document.getElementById("account-content");

  body.innerHTML += `
  <p> create or log in. Enter your credentials, if the account exists you will be logged in, otherwise we will create an account for you with the provided details</p> <br>
  <div id="sign-in>
  <label for="username-field" required> Username: </label> <br>
  <input type="text" id="username-field" name="username-field"> <br>
  <label for="password-field">Password: </label> <br>
  <input type="password" id="password-field" name="password-field" required</input>
  </div>
  `
}

