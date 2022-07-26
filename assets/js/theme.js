/* select language */
var langDropdown = document.querySelector('.lang-list');
var langOptions = document.querySelector('.lang-options');
var langCurrent = document.querySelector('.lang-current');
var langLinks = document.querySelectorAll('.lang-link');
var langLength = langLinks.length;
var langValue;
var activeItem = null;

langDropdown.addEventListener('click', function() {
    langOptions.classList.toggle('show');
    langLinks.forEach(function(link) {
        link.textContent === langCurrent.textContent ? link.classList.add("active-page") : link.classList.remove("active-page");

    });
});
langOptions.addEventListener('click', function(e) {
    var langItem = e.target;
    langValue = langItem.dataset.lang;
    langCurrent.textContent = langValue;
});

/* menu */
var mq = window.matchMedia("(min-width: 1365px)");
if (mq.matches) {
    $(".nav-middle").css("display", "flex");
    $(".select-lang").css("display", "flex");
    $(".nav-middle-list").css("display", "flex");
} else {
    $(".nav-middle").css("display", "none");
    $(".nav-middle-list").css("display", "none");
    $(".select-lang").css("display", "none");
    $("#hide-content").css("display", "none");
    $("#add-morecontent").css("display", "flex");
}

$(window).resize(function() {
    if (mq.matches) {
        $(".nav-middle").css("display", "flex");
        $(".select-lang").css("display", "flex");
        $(".nav-middle-list").css("display", "flex");
    } else {
        $(".nav-middle").css("display", "none");
        $(".nav-middle-list").css("display", "none");
        $(".select-lang").css("display", "none");
        $("#hide-content").css("display", "none");
        $("#add-morecontent").css("display", "flex");
    }
    $(".column1").css("padding-top", "0px");
    $(".footer-img").css("margin-top", "0px");
    $(".rekveziti").css("display", "none");
});


/* close and open hamburger */

function add_morecontent() {
    $(".nav-middle").css("display", "flex");
    $("#add-morecontent").css("display", "none");
    $("#hide-content").css("display", "flex");
    $(".nav-middle-list").css("display", "flex");
    $(".select-lang").css("display", "flex");
}

function hide_content() {
    $("#add-morecontent").css("display", "flex");
    $("#hide-content").css("display", "none");
    $(".nav-middle").css("display", "none");
    $(".nav-middle-list").css("display", "none");
    $(".select-lang").css("display", "none");
}

/* "go to top" button */

var scrollBtn = document.querySelector('#top-button');
var footer = document.querySelector('.footer');
var footerHeight = footer.getBoundingClientRect().height;
window.onscroll = function() {
    var scrollBtn = document.querySelector('#top-button');
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? scrollBtn.style.display = 'block' : scrollBtn.style.display = 'none';
    stopBeforeFooter();
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function stopBeforeFooter() {
    function getTopDistance(el) {
        var btn = el.getBoundingClientRect();
        return btn.top;
    }

    if (getTopDistance(scrollBtn) + document.body.scrollTop + scrollBtn.offsetHeight >= getTopDistance(footer) + document.body.scrollTop - 10) {
        scrollBtn.style.position = 'absolute';
        scrollBtn.style.bottom = footerHeight + "px";
    }

    if (document.body.scrollTop + window.innerHeight < getTopDistance(footer) + document.body.scrollTop + 30) {
        scrollBtn.style.position = 'fixed';
        scrollBtn.style.bottom = "30px";
    }
}


/* rekveziti footer */
function rekveziti() {
    $(".rekveziti").css("display", "block");
    if ($(window).width() < 767) {
        $(".column1").css("padding-top", "40px");
        $(".footer-img").css("margin-top", "-40px");
    } else if ($(window).width() < 1365 && $(window).width() >= 767) {
        $(".column1").css("padding-top", "0px");
        $(".footer-img").css("margin-top", "0px");
    } else if ($(window).width() >= 1365) {
        $(".rekveziti").css("display", "none");
    }


}
if (document.querySelector("body").getAttribute("data-title") === "sapnus-atbalsta") {

    /* map */

    const evt = new Event('customChange');

    // select location
    const locationDropdown = document.getElementById('js-location-dropdown');
    const locationOptions = document.getElementById('js-location-options');
    const currentLocation = document.getElementById('js-current-location');
    const locationItems = document.querySelectorAll('.location-item');

    locationDropdown.addEventListener('click', () => {
        locationOptions.classList.toggle('show');
    });

    locationOptions.addEventListener('click', e => {
        if (e.target.hasAttribute('data-loc')) {
            const locItem = e.target.dataset.loc;
            currentLocation.textContent = locItem;
            currentLocation.setAttribute('data-current', locItem);
            currentLocation.dispatchEvent(evt);
            currentLocation.style.fontWeight = '700';
        }

        locationItems.forEach(locItem => {
            locItem.textContent === currentLocation.textContent ?
                locItem.style.display = 'none' : locItem.style.display = 'block'
        });
    });

    // select type
    const typeDropdown = document.getElementById('js-type-dropdown');
    const typeOptions = document.getElementById('js-type-options');
    const currentType = document.getElementById('js-current-type');
    const typeItems = document.querySelectorAll('.type-item');

    typeDropdown.addEventListener('click', () => {
        typeOptions.classList.toggle('show');

    });

    typeOptions.addEventListener('click', e => {
        if (e.target.hasAttribute('data-type')) {
            const typeItem = e.target.dataset.type;
            currentType.textContent = typeItem;
            currentType.setAttribute('data-current', typeItem);
            currentType.dispatchEvent(evt);
            currentType.style.fontWeight = '700';
        }

        typeItems.forEach(item => {
            item.textContent === currentType.textContent ?
                item.style.display = 'none' : item.style.display = 'block'
        });

    })

    // Google map
    const activeMarkerIcon = './assets/img/grey-marker.png';
    const inactiveMarkerIcon = './assets/img/orange-marker.png';
    let googleMarkers = [];
    let infowindow = new google.maps.InfoWindow({ content: '' });
    let activeWindow;
    let activeMarker;
    let activeContent;
    let map;
    let marker;

    // add companies data
    const markers = [
        ['AUCH beauty home', '56.96535', '24.14054', 'Cēsu iela 20', 'Rīga', 'Skaistumkopšana', './assets/img/logo-auch.png', '+371 28361686, +371 23202079', 'auchbeauty@gmail.com'],
        ['PURCH restaurant', '56.95822', '24.19111', 'Dzelzavas iela 51A', 'Rīga', 'Ēdināšana', './assets/img/logo-purch.png', '+371 25425254', 'factoryriga@gmail.com'],
        ['Kurts coffee', '56.95130', '24.12071', 'Tērbatas iela 2i', 'Rīga', 'Ēdināšana', './assets/img/logo-kurts.png', '+371 23202079', '']

    ];

    // initiate the map
    function initMap() {
        let center = new google.maps.LatLng(56.9496, 24.1052);

        let mapOptions = {
            zoom: 12,
            center: center,
            mapId: '8058aa890d3d916'
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        for (let i = 0; i < markers.length; i++) {
            addMarker(markers[i]);
        }
    }

    //add markers to the map
    function addMarker(marker) {
        let title = marker[0];
        let streetName = marker[3];
        let locationName = marker[4];
        let companyType = marker[5];
        let logo = marker[6];
        let phoneNumber = marker[7];
        let email = marker[8] ? `<p class="paragraph-small marker-email">${marker[8]}</p>` : '';
        let pos = new google.maps.LatLng(marker[1], marker[2]);
        let content =
            `<div class='marker-container'>
      <div class="marker-logo-container">
        <img class='marker-logo' src='${logo}' alt='${title}'>
      </div>
      <div class="marker-content">
        <h3 class='marker-name'>${title}</h3>
        <div class='marker-contact-info'>
          <p class="paragraph-small">${phoneNumber}</p>
          ${email}
          <p class="paragraph-small">${streetName}, ${locationName}</p>
        </div>
      </div>
    </div>`;

        let updatedMarker = new google.maps.Marker({
            content: content,
            title: title,
            position: pos,
            streetName: streetName,
            locationName: locationName,
            logo: logo,
            phoneNumber: phoneNumber,
            email: email,
            companyType: companyType,
            map: map,
            icon: inactiveMarkerIcon
        });

        googleMarkers.push(updatedMarker);

        google.maps.event.addListener(updatedMarker, 'click', ((updatedMarker, content) => {
            return function() {
                closeWindow();
                infowindow.setContent(content);
                infowindow.open(map, updatedMarker);
                map.panTo(this.getPosition());
                map.setZoom(12);
                updatedMarker.setIcon(activeMarkerIcon);
                activeWindow = infowindow;
                activeMarker = updatedMarker;
            }
        })(updatedMarker, content));

        google.maps.event.addListener(infowindow, 'closeclick', (() => {
            return function() { closeWindow(); }
        })(infowindow));
    }

    function closeWindow() {
        if (activeWindow) {
            activeWindow.close();
            activeMarker.setIcon(inactiveMarkerIcon);
        }
    }

    function renderActiveCompanyData(activeCompanyData) {
        let selectedCompanies = document.querySelector('.selected-companies');
        let result = '';

        activeCompanyData.forEach(item => {
            result += `${item.content}`;
        });

        selectedCompanies.innerHTML = result;
    }

    let filterMarkers = function() {
        let locationName = currentLocation.dataset.current;
        let companyType = currentType.dataset.current;
        let activeCompanyData = [];

        for (i = 0; i < markers.length; i++) {
            marker = googleMarkers[i];

            if ((
                    marker.locationName == locationName ||
                    locationName.length === 0
                ) && (
                    marker.companyType == companyType ||
                    companyType.length === 0
                )) {
                marker.setVisible(true);
                activeCompanyData.push(marker);
            } else {
                marker.setVisible(false);
            }
        }

        renderActiveCompanyData(activeCompanyData);
    };

    // init map
    initMap();

    currentLocation.addEventListener('customChange', () => filterMarkers());
    currentType.addEventListener('customChange', () => filterMarkers());


}
var slideIndex = 1;

$(document).ready(function() {

    /* modal */
    $('button.modal-button').click(function(event) {
        event.preventDefault();
        $('#modal-overlay').fadeIn(297, function() {
            $('#modal')
                .css('display', 'block')
                .animate({ opacity: 1 }, 198);
        });
        $('#video').css('display', 'flex');
    });

    $('#modal-close, #modal-overlay').click(function() {
        $('#modal').animate({ opacity: 0 }, 198,
            function() {
                $(this).css('display', 'none');

                $('#modal-overlay').fadeOut(297);
            });
        $('#modal').css('display', 'none');
        $('#video').css('display', 'none');
    });
    /* footer rekveziti */
    $(".column1").css("padding-top", "0px");
    $(".footer-img").css("margin-top", "0px");
    $(".rekveziti").css("display", "none");
    /* slider */
    showDivs(slideIndex);

});
/* submit text (form) */
var form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    $('#success-submit').css('display', 'block');
    $('#submit').css('display', 'none');
    $('.after-form').css('display', 'none');

});

/* play video */
function playvideo() {
    myVideo = document.getElementById("video");
    if (myVideo.paused) {
        myVideo.play();
        myVideo.setAttribute("controls", "controls");
        $('#vidbutton').css('display', 'none');

    } else {
        myVideo.pause();
        myVideo.removeAttribute("controls");

    }
}

function stopvideo() {
    myVideo = document.getElementById("video");
    myVideo.pause();
}
/* more stasti (page: 99 iedvesmas stasti) */
function morestories() {
    $('.hidden-stories').css('cssText', 'display: inline-flex !important');
    $('.more-stories').css('visibility', 'hidden');
}

/* slider */
function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length };
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}