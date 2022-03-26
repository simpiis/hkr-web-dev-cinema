let isLoggedIn = false;


async function getLoggedIn() {
    let user;
    try {
        user = await (await fetch('/api/login')).json();
    } catch (ignore) {}

    if (!user || user._error) {
        document.getElementById('buttons').style.display = 'inline';

    } else {
        renderHistory(user);
        document.getElementById('buttons').style.display = 'none';
        document.getElementById('booking-history-div').style.display = 'inline'
        isLoggedIn = true;
        console.log(user);
    }
}

function getIsLoggedIn() {
    return isLoggedIn;
}


async function renderHistory(user) {
  var today = new Date();

  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var dateTime = date + ' ' + time;
  
  let bookingHistory;
  let html = "";
  let doc = document.getElementById('booking-history-div');

    try {
        bookingHistory = await (await fetch('/api/bookings/' + user.username)).json();
    } catch (ignore) {}

  
  let oldBookings = [];
  let futureBookings = [];
  

  for (let item of bookingHistory) {
   
    if (new Date(item.start_time) > new Date(dateTime)) {
      futureBookings[futureBookings.length] = item;
    } else {
      oldBookings[oldBookings.length] = item;
    }
    
  }
 
  
  if (futureBookings.length >= 1) {
    html += "<h1>Upcoming bookings </h1>"
  

    for (let item of futureBookings) {
      html += `
    <p> ${item.movie_title} | Starts: ${item.start_time} | Ends: ${item.end_time} | Screening hall: ${item.room_name},  Seat Number: ${item.booked_seat}   </p>
    `
    
    }
  }

  if (oldBookings.length >= 1) {
    html += "<h1>Past bookings </h1>"
  
    for (let item of oldBookings) {
      html += `
    <p> ${item.movie_title} | Starts: ${item.start_time} | Ends: ${item.end_time} | Screening hall: ${item.room_name},  Seat Number: ${item.booked_seat}   </p>
    `
    }
  }
  doc.innerHTML = html;

}