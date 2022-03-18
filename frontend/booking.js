function loadSeats() {
  //Temporary string to represent seats
  var seats = "fffttfffffftttf";

  //Variable to hold the div containerSeats from booking.html
  var cont = document.getElementById("containerSeats");

  //Loop through all seats
  for (var i = 0; i < seats.length; ++i) {
    //Create a new div for each seat and set class: square & id: seat#i
    var div = document.createElement("div");
    div.setAttribute("class", "square");
    div.setAttribute("id", "seat" + i);

    //Header for each seat
    var h1 = document.createElement("h1");
    h1.textContent = i + 1;
    div.appendChild(h1);

    //If char at i == t the seat is occupied, set div to red
    if (seats.charAt(i) == 't') {
      div.style.backgroundColor = 'red';
      console.log("seat index " + i + " taken")
    }

    cont.appendChild(div);

  }
}