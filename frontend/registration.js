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
        <span>Repeat password:</span><input name="repeatPassword" type="password">
      </label>
      <input type="submit" value="Register">
    </form>
  `;
}


async function startReg() {
  document.getElementById('buttons').style.display = 'none';
  document.getElementById('registration').innerHTML = createRegistrationForm();
  document.getElementById('registration').style.display = 'inline';
  document.getElementById('registration').addEventListener('submit', async (event) => {

    if (event.target.closest('form[name="registration]')) { return; }
    

    event.preventDefault();

    let fElements = document.forms.registration.elements;

    let reqBody = {};

    for (let element of fElements) {
      if (element.type === 'submit') {
        continue;
      }
      reqBody[element.name] = element.value;
    }

    if (reqBody.password !== reqBody.repeatPassword) {
      alert('Password mismatch');
      return;
    }

    delete reqBody.repeatPassword;


    let result = {};

    try {
      result = await (await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })).json();
    } catch (ignore) { }
    

    if (!result.changes) {
      alert("technical issues");
      return;
    }
  
    alert("you are now a member");

    document.getElementById('buttons').style.display = 'inline';
    document.getElementById('registration').style.display = 'none';


  });
  
  
}