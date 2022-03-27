

async function getLoggedIn() {
  
  let user;
  
    try {
        user = await (await fetch('/api/login')).json();
    } catch (ignore) {}

  if (!user || user._error || user === {}) {
      console.log("error")
        document.getElementById('buttons').style.display = 'inline';
    } else {
      console.log("logged in");
        renderHistory(user);
        document.getElementById('buttons').style.display = 'none';
        document.getElementById('booking-history-div').style.display = 'inline'
        
    }
}


async function renderHistory(user) {
  var today = new Date();

  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var dateTime = date + ' ' + time;
  
  let bookingHistory;
  let html = "";


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
  let info = document.createElement("p");
  info.innerHTML = "Click on an upcoming booking to unbook";
  document.getElementById("booking-history-div").appendChild(info);

  let button = document.createElement("button");
  button.innerHTML = "Sign out";
  button.setAttribute("class", "accButtons");
  button.addEventListener("click", () => {
    startSignOut();
  });
  
  document.getElementById("booking-history-div").appendChild(button);
 
  if (bookingHistory.length >= 1) {
    if (futureBookings.length >= 1) {
      let header = document.createElement("h1");
      header.innerHTML = "Upcoming bookings";
      document.getElementById("booking-history-div").appendChild(header);
  

      for (let item of futureBookings) {
        let obj = document.createElement("p");
        obj.innerHTML = ` ${item.movie_title} | Starts: ${item.start_time} | Ends: ${item.end_time} | Screening hall: ${item.room_name},  Seat Number: ${item.booked_seat}   `;
        obj.addEventListener("click", () => {
          cancelBooking(item);
        });
        document.getElementById("booking-history-div").appendChild(obj)
      }

    }

    if (oldBookings.length >= 1) {
      
      let header = document.createElement("h1");
      header.innerHTML = "Past bookings";
      document.getElementById("booking-history-div").appendChild(header);
  
      for (let item of oldBookings) {
        let obj = document.createElement("p");
        obj.innerHTML = ` ${item.movie_title} | Starts: ${item.start_time} | Ends: ${item.end_time} | Screening hall: ${item.room_name},  Seat Number: ${item.booked_seat}   `;
        document.getElementById("booking-history-div").appendChild(obj)
      }
    }
  } else {
    html += "<p>You have not made any bookings yet </p>"
  }
  
  

}

async function cancelBooking(item) {
  let result;
  let result2;
  console.log(item.seat_list)
  
  if (item.booked_seat.length > 1) { 
  for (let char of item.booked_seat) {
    if (char !== ",") {
      console.log("char",char)
      item.seat_list = markSeat(item.seat_list, parseInt(char) - 1, 'f');
      
    }
  }
} else {
    item.seat_list = markSeat(item.seat_list, parseInt(item.booked_seat)-1, 'f');
  }
  
  
  console.log(item.seat_list);
  
  try {
    result = await (await fetch('/api/bookings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })).json();
    
  } catch (ignore) { }

  
  console.log("item ID & start time")
  console.log(item.showings_id)
  console.log(item.start_time)
  try {
    result2 = await (await fetch(`/api/showings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })); 
  } catch (ignore) { }
  

  
    document.getElementById("booking-history-div").innerHTML = "";
    
    getLoggedIn();
 
  


}

async function startSignOut() {
  let result;
  console.log("clicked sign out")
  try {
    result = await (await fetch('/api/login', {
      method: 'DELETE'
    })).json();

    
  } catch (ignore) { }
  
  document.location.href = "/"
}