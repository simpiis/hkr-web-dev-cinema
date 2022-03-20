const movies = [];

function makeTable() {
    const x = document.getElementById("mySelect").value;
    const z = document.getElementById("dateIn").value;

    resetTable();
    loadMov();

    let table = document.querySelector(".moviestable");

    for (const obj of movies) {
        if (x == 'all' && obj.start_time.includes(z)) {
            const tr = table.insertRow();
            tr.insertCell().textContent = obj.title;
            tr.insertCell().textContent = obj.length;
            tr.insertCell().textContent = obj.rating;
            tr.insertCell().textContent = obj.start_time;
        }
        if ((x == 'pg-13' && obj.rating == 'PG-13') && obj.start_time.includes(z)) {
            const tr = table.insertRow();
            tr.insertCell().textContent = obj.title;
            tr.insertCell().textContent = obj.length;
            tr.insertCell().textContent = obj.rating;
            tr.insertCell().textContent = obj.start_time;
        }

        if ((x == 'r' && obj.rating == 'R') && obj.start_time.includes(z)) {
            const tr = table.insertRow();
            tr.insertCell().textContent = obj.title;
            tr.insertCell().textContent = obj.length;
            tr.insertCell().textContent = obj.rating;
            tr.insertCell().textContent = obj.start_time;
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