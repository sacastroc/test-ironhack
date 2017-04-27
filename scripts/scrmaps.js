//ZWSID
//X1-ZWz1fqgaxkx98r_2ca3z

$(document).ready(function(){

});

var map;
var latLng;
var arrayt;
var infowindow;
var html;
var houses;
var temp = {location: []};
var urls;
var max,min,rain;

var rent,bath,bed;
var tempadd;

function getRent(data,data1) {
    tempadd = data.address.replace(/ /g , '+');
    $.ajax({
        type: 'GET',
        url: 'https://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address='+tempadd+'&citystatezip=Chicago+IL&rentzestimate=true',
        // url: 'https://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=3604+S.+State+St&citystatezip=Chicago+IL&rentzestimate',
        contentType: 'text/plain',
        xhrFields: { ithCredentials: false },
        headers: {'Accept':'application/xml'},
        dataType: 'xml  ',
        success: function (dataRent) {
            // console.log(dataRent);
            // Data of Zillow
            rent = $(dataRent).find('rentzestimate:first').find('amount:first').text();
            bath = $(dataRent).find('bathrooms:first').text().split('.')[0];
            bed = $(dataRent).find('bedrooms:first').text().split('.')[0];
            // Data of Weather
            min = $(data1).find('temperature').eq(0).find('value:first').value();
            max = $(data1).find('temperature').eq(1).find('value:first').value();
            rain = $(data1).find('probability-of-precipitation').eq(0).find('value:first').text();

            // Data of places from Chicago DataSet
            latLng = new google.maps.LatLng(data.latitude,data.longitude)
            marker = createMarker(latLng,data.property_name,data.address,'rentHouse',map,true);
            html = '<p><h4>'+data.property_name+'</h4><b>Type: </b>'
                +data.property_type+'<br /><b>Adrress: </b>'+data.address+'<br/><b>Community Area: </b>'
                +data.community_area+' N° '+data.community_area_number+'<br /><b>Management Company: </b>'
                +data.management_company+'<br /><b>Phone: </b>'+data.phone_number+'<br/><b>Bathrooms: </b>'
                +bath+'<br/><b>Bedrooms: </b>'+bed+'<h4>Rent $'+rent
                +'</h4><h5>Weather Today for the next 12 hours</h5><b>Minimum: </b>'
                +min+'F°<br/><b>Maximum: </b>'+max+'F°<br/><b>Chance of rain: </b>'+rain+'%</p>';
            bindInfoWindow(marker,map,infowindow,html);
        }
    });
}

function getWeather(data) {
    if (data.latitude != undefined || data.longitude != undefined) {
        urls = "http://forecast.weather.gov/MapClick.php?lat="+data.latitude+"&lon="+data.longitude+"&unit=0&lg=english&FcstType=dwml";
        $.ajax({
            url: urls,
            type: "GET",
            dataType: 'xml',
            success: function(data1) {
                getRent(data,data1);
            }
        });
    }
}

var weather;
function initMap(){
    infowindow = new google.maps.InfoWindow({
        content: ''
      });
    var mapDiv = document.getElementById('map-canvas');
    map = new google.maps.Map(mapDiv, {
    	center: {lat: 41.8708, lng: -87.6505},
    	zoom: 15
    });
    var marker = new google.maps.Marker({
    	position: {lat: 41.8708, lng: -87.6505},
    	map: map,
        icon: 'images/university.png',
    	title: 'Purdue University',
    })
    bindInfoWindow(marker,map,infowindow,'<h4>Purdeu University</h4>');
    //Change Affordable-Rental-Housing-Developments dataset dor online request
    //Because this information is important to be updated
    $.ajax({
        url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
        type: "GET",
        data: {
          "$$app_token" : "wbZqUswQcofi57XJ4Rp31eD2m"
        },
        success: function(data) {
            // console.log("Retrieved " + data.length + " records from the dataset!");
            $.each(data,function(index, val) {
                getWeather(val);

                // console.log(val);

            });
        }
    });
    $.ajax({
        url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
        type: "GET",
        data: {
          "$$app_token" : "wbZqUswQcofi57XJ4Rp31eD2m"
        },
        success: function(data) {
            // console.log("Retrieved " + data.length + " records from the dataset!");
            $.each(data,function(index, val) {
                // console.log(val);
                latLng = new google.maps.LatLng(val.latitude,val.longitude)
                marker = createMarker(latLng,val.primary_type,val.description,'crimes',map,false);
                html = '<p><b>Type: </b>'
                    +val.primary_type+'<br /><b>Date: </b>'+val.date+'<br/><b>Description: </b>'
                    +val.description+'<br /><b>Year: </b>'+val.year+'</p>';
                bindInfoWindow(marker,map,infowindow,html);
            });
        }
    });

    $.getJSON("data/Parks_Locations.txt", function(datajs) {
        $.each(datajs.data, function(key, data) {
            // console.log(data);
            var v = JSON.parse(data[82][0]);
            if (v != null) {
                latLng = new google.maps.LatLng(data[82][1],data[82][2]);
                marker = createMarker(latLng,data[15],v.address,'parks',map,false);
                html = '<p><h4>'+data[15]+'</h4><b>Type: </b>'
                    +data[14]+'<br /><b>Address: </b>'+data[10]+'</p>';
                bindInfoWindow(marker,map,infowindow,html);
            }
        });
    });

    $.getJSON("data/Police_Stations.txt", function(datajs) {
        $.each(datajs.data, function(key, data) {
            // console.log(data);
            latLng = new google.maps.LatLng(data[20],data[21]);
            marker = createMarker(latLng,data[9],data[10],'policeStations',map, false);
            html = '<p><h4>'+data[9]+'</h4><b>Station ID: </b>'
                +data[8]+'<br /><b>Address: </b>'+data[10]+'<br/><b><a target="_blank" href ="'
                +data[14][0]+'">Contact</a></b></p>';
            bindInfoWindow(marker,map,infowindow,html);;
        });
    });

    $.getJSON("data/Bike_Racks.txt", function(datajs) {
        $.each(datajs.data, function(key, data) {
            // console.log(data);
            latLng = new google.maps.LatLng(data[14],data[15]);
            marker = createMarker(latLng,"Bike Rack ID: "+data[8],data[9],'bikeRacks',map, false);
            html = '<p><h4>Bike Rack ID '+data[8]+'</h4><b>Ward: </b>'
                +data[10]+'<br /><b>Address: </b>'+data[9]+'</p>';
            bindInfoWindow(marker,map,infowindow,html);
        });
    });

    $.getJSON("data/Alternative_Fuel_Locations.txt", function(datajs) {
        $.each(datajs.data, function(key, data) {
            // console.log(data);
            latLng = new google.maps.LatLng(data[33],data[34]);
            var fuelType = "";
            if (data[9] == 'all') {
                fuelType = 'All'
            }else if (data[9] == 'BD') {
                fuelType = 'Biodiesel B20+';
            }else if (data[9] == 'E85') {
                fuelType = 'Ethanol E85';
            }else if (data[9] == 'ELEC') {
                fuelType = 'Electric';
            }else if (data[9] == 'HY') {
                fuelType = 'Hydrogen';
            }else if (data[9] == 'LNG') {
                fuelType = 'Liquefied Natural Gas';
            }else if (data[9] == 'LPG') {
                fuelType = 'Propane';
            }else {
                fuelType = data[9];
            }
            marker = createMarker(latLng,data[10],data[11],'alternativeFuel',map, false);
            html = '<p><h4>'+data[10]+'</h4><b>Type: </b>'
                +fuelType+'<br /><b>Address: </b>'+data[11]+'<br/><b>Access Time: </b>'+data[21]
                +'<br/><b>Phone: </b>'+data[17]+'</p>';
            bindInfoWindow(marker,map,infowindow,html);
        });
    });

    $.getJSON("data/Fire_Stations.txt", function(datajs) {
        $.each(datajs.data, function(key, data) {
            // console.log(data);
            latLng = new google.maps.LatLng(data[14][1],data[14][2]);
            marker = createMarker(latLng,data[8],data[9],'fireStations',map, false);
            html = '<p><h4>Fire Station '+data[8]+'</h4><b>Address: </b>'+data[9]+'</p>';
            bindInfoWindow(marker,map,infowindow,html);
        });
    });

    $.getJSON("data/Libraries.txt", function(datajs) {
        $.each(datajs.data, function(key, data) {
            // console.log(data);
            latLng = new google.maps.LatLng(data[18][1],data[18][2]);
            marker = createMarker(latLng,data[8],data[12],'libraries',map, false);
            html = '<p><h4>'+data[8]+'</h4>'+'<b>Hours Operation: </b>'
                +data[9]+'<br/><b>Cybernavigator: </b>'+data[10]+'<br/><b>Teacher in Library: </b>'
                +data[11]+'<br /><b>Address: </b>'+data[12]+'<br/><b>Phone: </b>'+data[19]
                +'<br/><b><a target="_blank" href ="'
                +data[17][0]+'">Contact</a></b></p>';
            bindInfoWindow(marker,map,infowindow,html);
        });
    });

    // console.log(markerGroups);

}
var chart;
var x;
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
$.ajax({
    url: 'http://forecast.weather.gov/MapClick.php?lat=41.85&lon=-87.65&unit=0&lg=english&FcstType=dwml',
    type: "GET",
    dataType: 'xml',
    success: function(data) {
        // console.log(data);
        max = ['Max'];
        min = ['Min'];
        xv = ['x']
        $(data).find('temperature').eq(0).find('value').each(function(index, el) {
            // console.log(Number($(el).text()));
            min.push(Number($(el).text()));
        });
        $(data).find('temperature').eq(1).find('value').each(function(index, el) {
            max.push(Number($(el).text()));
        });
        console.log($(data).find('time-layout').eq(1).find('start-valid-time').text());
        $(data).find('time-layout').eq(1).find('start-valid-time').each(function(index, el) {
            console.log(Date.parse($(el).text()));
            xv.push(Date.parse($(el).text()));
        });
        console.log(xv);
        chart = c3.generate({
            bindto: '#chart',
            data: {
              x: 'x',
              xFormat: '%Y',
              columns: [
                xv,
                max,
                min
              ]
            },
            axis: {
                y: {
                    tick: {
                        format: function (d) {return d + 'F°'}
                    }
                },
                x: {
                    type: 'timeseries',
                    tick: {
                        // format: '%Y-%m-%d %H:%M:%S'
                        format :function (d) {return days[d.getDay()]}
                    }
                }
            }
        });
    }
});

var customIcons = {
    'rentHouse': {
        icon: ''
    },
    'crimes': {
        icon: 'images/crime.png'
    },
    'parks': {
        icon: 'images/park.png'
    },
    'policeStations': {
        icon: 'images/policeStation.png'
    },
    'bikeRacks': {
        icon: 'images/bikeRack.png'
    },
    'alternativeFuel': {
        icon: 'images/alternativeFuel.png'
    },
    'fireStations': {
        icon: 'images/fireStation.png'
    },
    'libraries': {
        icon: 'images/library.png'
    }
};

var markerGroups = {
    'rentHouse': [],
    'crimes': [],
    'parks': [],
    'policeStations': [],
    'bikeRacks': [],
    'alternativeFuel': [],
    'fireStations': [],
    'libraries': [],
};

function createMarker(point, name, address, type, map, onMap) {
    var icon = customIcons[type] || {};
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon: icon.icon,
        type: type,
        title: name + "\n" + address,
        visible: onMap
    });
    if (!markerGroups[type]) markerGroups[type] = [];
    markerGroups[type].push(marker);
    return marker;
}

function printConsole(result) {
    console.log(result);
}

function toggleGroup(type) {
    var idname = '#btn-' + type
    for (var i = 0; i < markerGroups[type].length; i++) {
        var marker = markerGroups[type][i];
        if (!marker.getVisible()) {
            marker.setVisible(true);

            $(idname).attr('class','btn btn-success btn-xs btn-toggle')
        } else {
            marker.setVisible(false);
            $(idname).attr('class','btn btn-danger btn-xs btn-toggle')
        }
    }
}

function bindInfoWindow(marker, map, infowindow, html) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(html);
        infowindow.open(map, marker);
    });
}

// It doesnt work with dynamic data :(
// function checkButtons(type) {
//     var idname = '#btn-' + type;
//     console.log(type);
//     console.log(markerGroups[type]);
//     var marker = markerGroups[type];
//
//     if (!marker.getVisible()) {
//         $(idname).attr('class','btn btn-danger')
//     } else {
//         $(idname).attr('class','btn btn-success')
//     }
// }

// function map__SetZoom() {
//    map.setZoom( +this.value );
// }
//
