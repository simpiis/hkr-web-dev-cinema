const movies = [];

async function makeTable() {
    const x = document.getElementById("mySelect").value;
    const z = document.getElementById("dateIn").value;
    resetTable();
    loadMov();

    let table = document.querySelector(".moviestable");

    for (const obj of movies) {

        const dateSubstring = obj.start_time.substring(0, 10);

        //If the date filter textfield is empty, just apply the normal filters
        if (!z) {
            if (x == 'all') {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {

                    localStorage.setItem("movieTitleToBook", obj.title);
                    localStorage.setItem("movieSynopsisToBook", obj.synopsis);
                    localStorage.setItem("movieDateToBook", obj.start_time);
                    localStorage.setItem("movieRatingToBook", obj.rating);
                    localStorage.setItem("movieLengthToBook", obj.length);


                    moveOntoBooking();
                });
            }
            if ((x == 'pg-13' && obj.rating == 'PG-13')) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {

                    localStorage.setItem("movieTitleToBook", obj.title);
                    localStorage.setItem("movieSynopsisToBook", obj.synopsis);
                    localStorage.setItem("movieDateToBook", obj.start_time);
                    localStorage.setItem("movieRatingToBook", obj.rating);
                    localStorage.setItem("movieLengthToBook", obj.length);


                    moveOntoBooking();
                });
            }

            if ((x == 'r' && obj.rating == 'R')) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {

                    localStorage.setItem("movieTitleToBook", obj.title);
                    localStorage.setItem("movieSynopsisToBook", obj.synopsis);
                    localStorage.setItem("movieDateToBook", obj.start_time);
                    localStorage.setItem("movieRatingToBook", obj.rating);
                    localStorage.setItem("movieLengthToBook", obj.length);


                    moveOntoBooking();
                });
            }
            //If date textfield has text in it, apply the normal filters AND the date filter
        } else {
            if ((x == 'all') && z == dateSubstring) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {

                    localStorage.setItem("movieTitleToBook", obj.title);
                    localStorage.setItem("movieSynopsisToBook", obj.synopsis);
                    localStorage.setItem("movieDateToBook", obj.start_time);
                    localStorage.setItem("movieRatingToBook", obj.rating);
                    localStorage.setItem("movieLengthToBook", obj.length);

                    moveOntoBooking();
                });
            }
            if ((x == 'pg-13' && obj.rating == 'PG-13') && z == dateSubstring) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {

                    localStorage.setItem("movieTitleToBook", obj.title);
                    localStorage.setItem("movieSynopsisToBook", obj.synopsis);
                    localStorage.setItem("movieDateToBook", obj.start_time);
                    localStorage.setItem("movieRatingToBook", obj.rating);
                    localStorage.setItem("movieLengthToBook", obj.length);

                    moveOntoBooking();
                });
            }

            if ((x == 'r' && obj.rating == 'R') && z == dateSubstring) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {
                    localStorage.setItem("movieTitleToBook", obj.title);
                    localStorage.setItem("movieSynopsisToBook", obj.synopsis);
                    localStorage.setItem("movieDateToBook", obj.start_time);
                    localStorage.setItem("movieRatingToBook", obj.rating);
                    localStorage.setItem("movieLengthToBook", obj.length);



                    moveOntoBooking();
                });
            }
        }

    }

}

async function moveOntoBooking() {
    let user;
    try {
        user = await(await fetch('/api/login')).json();
    } catch (ignore) { }
    if (!user || user._error) {
        alert("You have to be logged in to book a movie.");
        
    } else {
        document.getElementById("continueToBookingPage").style.visibility = "visible";
    }
}

function resetTable() {
    for (const tr of document.querySelectorAll(".moviestable tr")) {
        for (const child of[...tr.children]) {
            if (child.tagName !== "TH") {
                child.remove();
            }
        }
    }
}


async function loadMov() {
    let url = 'http://localhost:3000/api/movielist';

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

(async() => {
    const arr = await loadMov();
    movies.push(...arr);
})();