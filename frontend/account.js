async function getLoggedIn() {
  let user;
  try {
    user = await (await fetch('/api/login')).json();
  }
  catch (ignore) { }

  if (!user || user._error) {
    document.getElementById('buttons').style.display = 'inline';
    
  } else {
    renderHistory(user);
    document.getElementById('buttons').style.display = 'none';
    document.getElementById('booking-history-div').style.display = 'inline'
  }
}


async function renderHistory(user) {
  let bookingHistory;
  let html;
  let doc = document.getElementById('booking-history-div');

  try {
    bookingHistory = await (await fetch('/api/bookings/' + user.username)).json();
  } catch (ignore) { }
  
  console.log(bookingHistory);

}