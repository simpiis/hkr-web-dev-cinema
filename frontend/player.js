var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

const playlist = [];
loadArr();

async function loadArr() {
    const url = 'http://localhost:3000/api/trailers';

    const response = await fetch(url);
    const data = await response.json();
    return data.map(el => el.link);
}

(async() => {
    const arr = await loadArr();
    playlist.push(...arr);
})();

function onYouTubeIframeAPIReady() {
    player = new YT.Player('trailerPlayer', {
        height: '390',
        width: '640',

        playerVars: {
            playlist: playlist.join(','),
            'autoplay': 1,
        },

    });
}