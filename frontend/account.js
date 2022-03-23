async function getLoggedIn() {
  let user = getUser();
  

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
  let html = "";
  let doc = document.getElementById('booking-history-div');

  try {
    bookingHistory = await (await fetch('/api/bookings/' + user.username)).json();
  } catch (ignore) { }

  console.log(user.username);
  console.log(bookingHistory);
  let counter = 0;

  for (let item of bookingHistory) {
    html += `
    <p> ${counter++}                           ${item.movie_title}  ${item.start_time}  ${item.end_time}  ${item.room_name}   </p>
    `
    
  }
  doc.innerHTML = html;

}


async function getUser() {
  let user;
  try {
    user = await (await fetch('/api/login')).json();
  }
  catch (ignore) { }
  return user;
}