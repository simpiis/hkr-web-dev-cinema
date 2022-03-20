const movies = [];

function makeTable() {
    loadMov();

    let table = document.querySelector(".moviestable");


    for (const obj of movies) {
        const tr = table.insertRow();
        tr.insertCell().textContent = obj.title;
        tr.insertCell().textContent = obj.length;
        tr.insertCell().textContent = obj.rating;
    }

}

function sortByRating() {
    alert("test");
}


async function loadMov() {
    let url = 'http://localhost:3000/api/movies';

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

(async() => {
    const arr = await loadMov();
    movies.push(...arr);
})();