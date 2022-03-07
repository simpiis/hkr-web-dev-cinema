import {verifyLogin} from './database.js'

export function accountMain() {

  if (checkLogin()) {
    displayAccountInfo();
    
  } else {
    displayLogin();
  }

}



// check of user is logged in
function checkLogin() {
  if (sessionStorage.getItem("user")) {
    console.log("user found")
    return true;
  }
  console.log("user not logged in")
  return false;
}


// shows booking history
function displayAccountInfo() {

  getBookingHistory(sessionStorage.getItem('user'));
  
}

function displayLogin() {
  let body = document.getElementById("login-form-div");

  body.innerHTML += `
  <p> Create an account or log in. Enter your credentials, if the account exists you will be logged in, otherwise we will create an account for you with the provided details</p>
  <p> (this is unencrypted so please do not use real passwords) </p><br>
  <div id="sign-in>
  <label for="username-field" required> Username: </label> <br>
  <input type="text" id="username-field" name="username-field"> <br>
  <label for="password-field">Password: </label> <br>
  <input type="password" id="password-field" name="password-field" required</input> <br>
  <button id="user-sign-in" type="button" onclick="verifySignIn()"> Sign in </button>
  </div>
  `
}


function verifySignIn() {
  let username = document.getElementById("username-field").value;
  let password = document.getElementById("password-field").value;

  console.log("username: ",username)
  console.log("password: ",password)

  verifyLogin(username,password);

}

