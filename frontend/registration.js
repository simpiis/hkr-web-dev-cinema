function createRegistrationForm() {
  return `
    <h1>Register</h1>
    <form name="registration">
      <label>
        <span>Username:</span><input name="username" type="text">
      </label>
      <label>
        <span>Password:</span><input name="password" type="password">
      </label>
      <label>
        <span>Repeat password:</span><input name="passwordRepeated" type="password">
      </label>
      <input type="submit" value="Register">
    </form>
  `;
}


function startReg() {
  document.getElementById('registration').innerHTML = createRegistrationForm();
  document.getElementById('form[name="registration"]').addEventListener('submit', (event) => {
    event.preventDefault();

    let fElements = document.forms.registration.elements;

    let reqBody = {};

    for (let element of fElements) {
      if (element.type === 'submit') {
        continue;
      }
      reqBody[element.name] = element.value;
    }

    console.log(reqBody);


  });
}