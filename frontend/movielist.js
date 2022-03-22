const movies = [];

function makeTable() {
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
                    localStorage.setItem('movieToBook', obj);
                    location.href = '/partials/booking.html';
                });
            }
            if ((x == 'pg-13' && obj.rating == 'PG-13')) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {
                    localStorage.setItem('movieToBook', obj);
                    location.href = '/partials/booking.html';
                });
            }

            if ((x == 'r' && obj.rating == 'R')) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {
                    localStorage.setItem('movieToBook', obj);
                    location.href = '/partials/booking.html';
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
                    localStorage.setItem('movieToBook', obj);
                    location.href = '/partials/booking.html';
                });
            }
            if ((x == 'pg-13' && obj.rating == 'PG-13') && z == dateSubstring) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {
                    localStorage.setItem('movieToBook', obj);
                    location.href = '/partials/booking.html';
                });
            }

            if ((x == 'r' && obj.rating == 'R') && z == dateSubstring) {
                const tr = table.insertRow();
                tr.insertCell().textContent = obj.title;
                tr.insertCell().textContent = obj.length;
                tr.insertCell().textContent = obj.rating;
                tr.insertCell().textContent = obj.start_time;
                tr.addEventListener("click", () => {
                    localStorage.setItem('movieToBook', obj);
                    location.href = '/partials/booking.html';
                });
            }
        }

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