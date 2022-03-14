async function startSignIn() {
  document.getElementById('buttons').style.display = 'none';
  document.getElementById('login-div').innerHTML = createSignInForm();
  document.getElementById('login-div').style.display = 'inline';

}


function createSignInForm() {
  return `
    <h1>Sign in</h1>
    <form name="signIn">
      <label>
        <span>Username:</span><input required name="username" type="text">
      </label>
      <label>
        <span>Password:</span><input required name="password" type="password">
      </label>
      <input type="submit" value="Sign In">
    </form>
  `;
}


function assignSignIn() {

  document.getElementById('login-div').addEventListener('submit', async (event) => {
    if (!event.target.closest('form[name="signIn"]')) { return };

    event.preventDefault();

    let formElements = document.forms.signIn.elements;
    let reqBody = {};

    for (let element of formElements) {
      if (element.type === 'submit') { continue; }
      reqBody[element.name] = element.value;
    }

    let result;
    try {
      result = await (await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })).json();
    }
    catch (ignore) { }

    if (!result || result._error) {
      alert("invalid credentials");
      return;
    }

    document.getElementById('login-div').style.display = 'none';

    getLoggedIn();

  });


}