//Temporary string to represent seats
let seats = "fffttfffffftttf";




// Loads the information from the movie the customer wants to book by using localstorage.
loadTheInfo();

function loadTheInfo() {

    document.getElementById("detailedTitle").innerHTML = localStorage.getItem("movieToBook");
    document.getElementById("detailedSynopsis").innerHTML = localStorage.getItem("movieSynopsisToBook");
    document.getElementById("detailedDate").innerHTML = localStorage.getItem("movieDateToBook");
    document.getElementById("detailedLength").innerHTML = localStorage.getItem("movieLengthToBook");
    document.getElementById("detailedRating").innerHTML = localStorage.getItem("movieRatingToBook");

}

function loadSeats() {

    //Variable to hold the div containerSeats from booking.html
    let cont = document.getElementById("containerSeats");

    //Loop through all seats
    for (let i = 0; i < seats.length; ++i) {

        //Create a new div for each seat and set class: square & id: seat#i
        let div = document.createElement("div");
        div.setAttribute("class", "square");
        div.setAttribute("id", `seat${i}`);
        //div.setAttribute("id", "seat" + i);

        //Header for each seat
        let h1 = document.createElement("h1");
        h1.textContent = i + 1;
        div.appendChild(h1);

        //If char at i == t the seat is occupied, set div to red
        if (seats.charAt(i) == 't') {
            div.style.backgroundColor = 'red';

        } else {
            div.style.backgroundColor = 'green';
        }

        cont.appendChild(div);

        let seatDiv = document.getElementById("seat" + i);
        seatDiv.onclick = function() {

            if (this.style.backgroundColor === "green") {
                this.style.backgroundColor = "yellow";
                seats = markSeat(seats, i, 't')

            } else if (this.style.backgroundColor === "yellow") {
                this.style.backgroundColor = "green";
                seats = markSeat(seats, i, 'f')

            }
        }
    }
}

function markSeat(seatInfo, index, value) {
    seatInfo = seatInfo.substr(0, index) + value + seatInfo.substr(index + 1);

    return seatInfo
}
async function confirmBooking() {
    let result = {};

    try {
        result = await (await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seats)
        })).json();
    } catch (ignore) {}

    let danne;
    try {
        danne = await (await fetch('/api/danne/UNCHARTED')).json();
    } catch (ignore) {}
    console.log(danne);

}
async function refreshBooking() {

}