<template>
    <div class="map-wrap">
        <div id="houzez-map-loading" class="houzez-map-loading">
            <div class="mapPlaceholder">
                <div class="loader-ripple spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        </div>

        <div class="map-arrows-actions">
            <button id="listing-mapzoomin" class="map-btn"><i class="houzez-icon icon-add"></i></button>
            <button id="listing-mapzoomout" class="map-btn"><i class="houzez-icon icon-subtract"></i></button>
            <input type="text" id="google-map-search" placeholder="Google Map Search" class="map-search">
        </div>

        <div class="map-next-prev-actions">
            <ul class="dropdown-menu" aria-labelledby="houzez-gmap-view">
                <li class="dropdown-item"><a href="" class="homeyMapType" data-maptype="roadmap"><span>Roadmap</span></a></li>
                <li class="dropdown-item"><a href="" class="homeyMapType" data-maptype="satellite"><span>Satelite</span></a></li>
                <li class="dropdown-item"><a href="" class="homeyMapType" data-maptype="hybrid"><span>Hybrid</span></a></li>
                <li class="dropdown-item"><a href="" class="homeyMapType" data-maptype="terrain"><span>Terrain</span></a></li>
            </ul>
            <button id="houzez-gmap-view" class="map-btn dropdown-toggle" type="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="true"><i class="houzez-icon icon-earth-1 mr-1"></i>
                <span>View</span></button>
            <button id="houzez-gmap-prev" class="map-btn"><i class="houzez-icon icon-arrow-left-1 mr-1"></i>
                <span>Prev</span></button>
            <button id="houzez-gmap-next" class="map-btn"><span>Next</span> <i
                    class="houzez-icon icon-arrow-right-1 ml-1"></i></button>
        </div>

        <div class="map-zoom-actions">
            <div id="houzez-gmap-full" class="map-btn">
                <i class="houzez-icon icon-expand-3 mr-1"></i> <span>Fullscreen</span>
            </div>
        </div>

        <div id="map"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

let map;
let marker;

const initMap = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 25.9063344, lng: -80.1406093 },
        disableDefaultUI: true,
        zoom: 13,
        styles: [
            {
                "elementType": "labels.text",
                "stylers": [{ "weight": 5 }]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#f5f7ff" }]
            },
            {
                "featureType": "road",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#84dcff" }]
            }
        ]
    });

    const contentString = '<div id="map-info-window" class="map-info-window">' +
        '<div class="item-wrap">' +
        '<div class="item-header">' +
        '<a href="#" class="hover-effect">' +
        '<img class="img-fluid" src="https://placehold.co/592x444" alt="">' +
        '</a>' +
        '</div>' +
        '<div class="item-body flex-grow-1">' +
        '<h2 class="item-title">' +
        '<a href="#">Renovated Apartment With Ocean View</a>' +
        '</h2>' +
        '<ul class="list-unstyled item-info">' +
        '<li class="item-price">$1,990,000</li>' +
        '<li class="item-type">Apartment</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    const iconBase = './img/';
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        icon: iconBase + 'map-marker.png',
        animation: google.maps.Animation.DROP,
        position: { lat: 25.838706, lng: -80.131114 },
    });

    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });
};

const toggleBounce = () => {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
};

onMounted(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBek2XjpiEzDMPxnCw6_WJOpzp7Lv4pMN0&callback=initMap';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
});
</script>

<style scoped>
/* Add your styles here */
.map-wrap {
    position: relative;
    height: 100%;
    width: 100%;
}

#map {
    height: 100%;
    width: 100%;
}

.houzez-map-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-ripple {
    display: flex;
    justify-content: center;
    align-items: center;
}

.bounce1, .bounce2, .bounce3 {
    width: 18px;
    height: 18px;
    background-color: #333;
    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.bounce1 {
    animation-delay: -0.32s;
}

.bounce2 {
    animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
    0%, 80%, 100% { 
        transform: scale(0);
    } 
    40% { 
        transform: scale(1.0);
    }
}
</style>