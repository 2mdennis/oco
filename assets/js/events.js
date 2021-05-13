
const eventListeners = () => {
    //OPEN RESPONSIVE NAVIGATION
    if (document.getElementById('burger')) {
		var clickBurger = document.getElementById('burger');
		clickBurger.addEventListener('click', function(e) {
            e.preventDefault();
            var sidenav = document.querySelector(".navigation__cms");
            sidenav.classList.add("navactive");
            document.documentElement.classList.add('navigation__open');
            document.body.classList.add("navigation__open");
        });
    }
    //CLOSE RESPONSIVE NAVIGATION
    if (document.getElementById('close')) {
		var clickClose = document.getElementById('close');
		clickClose.addEventListener('click', function(e) {
            e.preventDefault();
            var sidenav = document.querySelector(".navigation__cms");
            sidenav.classList.remove("navactive");
            document.documentElement.classList.remove('navigation__open');
            document.body.classList.remove("navigation__open");
        });
    }
    //TOGGLE FILTER DROPDOWN
    if (document.getElementById('filterButton')) {
		var filterButton = document.getElementById('filterButton');
		filterButton.addEventListener('click', function(e) {
            e.preventDefault();
            var dropdown = document.querySelector("#toggleFilter");
            dropdown.classList.toggle("active");
        });
    }
    //TOGGLE FILTER DROPDOWN
    if (document.getElementById('addevent')) {
		var filterEventButton = document.getElementById('addevent');
		filterEventButton.addEventListener('click', function(e) {
            e.preventDefault();
            var dropdown = document.querySelector("#toggleAddFilter");
            dropdown.classList.toggle("active");
        });
    }
    //TOGGLE TOOLS FILTER DROPDOWN
    if (document.getElementById('filterTools')) {
      var filterToolsButton = document.getElementById('filterTools');
      filterToolsButton.addEventListener('click', function(e) {
              e.preventDefault();
              var dropdown = document.querySelector("#toggleToolsFilter");
              dropdown.classList.toggle("active");
          });
      }
      if (document.getElementById('closeTools')) {
        var closeToolsButton = document.getElementById('closeTools');
        closeToolsButton.addEventListener('click', function(e) {
              e.preventDefault();
              var dropdown = document.querySelector("#toggleToolsFilter");
              dropdown.classList.remove("active");
          });
      }
    //GOOGLE MAP
    if (document.getElementById('map')) {
        const location = { lat: 54.59690937624456, lng: -5.93963706715575 };
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: location,
        });
        const marker = new google.maps.Marker({
          position: location,
          map: map,
        });
    }
};

export default eventListeners;