var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var playlist = loadArr();

function loadArr() {
  return ['5zdBG-iGfes', 'pGi3Bgn7U5U', '2Rxoz13Bthc'];
}

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