let showingsId = {};
let seats;
var userSeats = [];
var totalPrice = 0;
//Priceclass 1 = adult, 2 = child, 3 = retired
let seatPriceClass = 1;

// Loads the information from the movie the customer wants to book by using localstorage.
loadTheInfo();

function loadTheInfo() {

    document.getElementById("detailedTitle").innerHTML = localStorage.getItem("movieTitleToBook");
    document.getElementById("detailedSynopsis").innerHTML = localStorage.getItem("movieSynopsisToBook");
    document.getElementById("detailedDate").innerHTML = localStorage.getItem("movieDateToBook");
    document.getElementById("detailedLength").innerHTML = localStorage.getItem("movieLengthToBook");
    document.getElementById("detailedRating").innerHTML = localStorage.getItem("movieRatingToBook");

}

async function loadSeats() {

    let temp = {};
    temp["title"] = localStorage.getItem("movieTitleToBook");
    temp["time"] = localStorage.getItem("movieDateToBook");

    try {
        showingsId = await (await fetch(`/api/dannep/${temp.title}/${temp.time}`)).json();

    } catch (ignore) { }

    console.log(showingsId);

    seats = showingsId[0].seat_list;


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
        seatDiv.onclick = function () {

            if (this.style.backgroundColor === "green") {

                seats = markSeat(seats, i, 't')
                userSeats[i] = `${i + 1}`;
                switch (seatPriceClass) {
                    case 1: totalPrice += 85;
                        this.style.backgroundColor = "yellow";
                        break;
                    case 2: totalPrice += 65;
                        this.style.backgroundColor = "gold";
                        break;
                    case 3: totalPrice += 75;
                        this.style.backgroundColor = "goldenrod";
                        break;
                }
            } else if (this.style.backgroundColor === "yellow") {
                this.style.backgroundColor = "green";
                seats = markSeat(seats, i, 'f')
                userSeats[i] = null;
                totalPrice -= 85;
            } else if (this.style.backgroundColor === "gold") {
                this.style.backgroundColor = "green";
                seats = markSeat(seats, i, 'f')
                userSeats[i] = null;
                totalPrice -= 65;
            } else if (this.style.backgroundColor === "goldenrod") {
                this.style.backgroundColor = "green";
                seats = markSeat(seats, i, 'f')
                userSeats[i] = null;
                totalPrice -= 75;
            }
            document.getElementById("totalPrice").innerHTML = "Total: SEK " + totalPrice;
        }

    }
}

function markSeat(seatInfo, index, value) {
    seatInfo = seatInfo.substr(0, index) + value + seatInfo.substr(index + 1);

    return seatInfo
}
async function confirmBooking() {

    //Cant book 0 seats
    if (totalPrice >= 0) return;

    //Only add elements which are not null/undefined to userSeat array
    let temp = []
    let i = 0
    for (let element of userSeats) {
        if (element != null || element != undefined) {
            temp[i] = element
            i++
        }
    }
    userSeats = temp;

    let result = {};
    showingsId[0].seat_list = seats;

    let user;
    try {
        user = await (await fetch('/api/login')).json();
    } catch (ignore) { }

    //Create an object to hold the booking information
    let bookingInfo = { userName: user.username, id: showingsId[0].id, bookedSeats: userSeats.toString() };
    console.log(bookingInfo);

    //POST booking info
    try {
        result = await (await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingInfo)
        })).json();
    } catch (ignore) { }


    //PUT seats
    try {
        result = await (await fetch(`/api/showings/${showingsId[0].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(showingsId[0])
        })).json();
    } catch (ignore) { }

    window.confirm("Seats: " + userSeats + " booked - Total: " + totalPrice + " SEK")

}

function setPriceClass(priceClass) {

    switch (priceClass) {
        case 1: document.getElementById("priceClass").innerHTML = "Booking seat for: Adult"
            seatPriceClass = 1;
            break;
        case 2: document.getElementById("priceClass").innerHTML = "Booking seat for: Child"
            seatPriceClass = 2;
            break;
        case 3: document.getElementById("priceClass").innerHTML = "Booking seat for: Retired"
            seatPriceClass = 3;
            break;
    }


}
async function refreshBooking() {

}