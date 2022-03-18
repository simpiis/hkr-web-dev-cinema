

// Event listener to handle clicks on a tag
document.querySelector('body').addEventListener('click', function (event) {

  let aTag = event.target.closest('a');

  // return if not a tag
  if (!aTag) { return; }

  let href = aTag.getAttribute('href');


  // prevent the default behavior of the browser when clicking links
  event.preventDefault();

  // Use HTML5 history and push a new state
  history.pushState(null, null, href);

  router();
});

function makeMenuChoiceActive(route) {
  // swap active status in the nav menu
  let aTagsInNav = document.querySelectorAll('nav a');
  for (let aTag of aTagsInNav) {
    aTag.classList.remove('active');
    let href = aTag.getAttribute('href');
    if (href === route) {
      aTag.classList.add('active');
    }
  }
}

let doOnce = false;

async function router() {
  let route = location.pathname;
  makeMenuChoiceActive(route);

  // transform the route to be path to partials
  route = route === '/' ? '/start' : route;
  route = '/partials' + route + '.html';

  // load the content from partial
  let content = await (await fetch(route)).text();

  // load start page if no content is found
  content.includes('<title>Error</title>') && location.replace('/');

  // replace the content of the main element
  document.querySelector('main').innerHTML = content;

  if (route === "/partials/account.html") {

    if (!doOnce) {
      doOnce = true;
      assignRegister();
      assignSignIn();
    }
    getLoggedIn(); 
    

  }

  if (route == "/partials/start.html") {
    onYouTubeIframeAPIReady();
  }

  if (route == "/partials/movies.html") {
    makeTable();
  }

  if (route == "/partials/booking.html") {
    loadSeats();
  }
}

router();
