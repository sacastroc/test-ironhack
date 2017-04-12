//ZWSID
//X1-ZWz1fqgaxkx98r_2ca3z


function forprices(add){
  var xmlhttp = new XMLHttpRequest();
  var url = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=758+W+14th+Pl+APT+1A&citystatezip=Chicago+IL&rentzestimate";
  // xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
  // xmlhttp.setRequestHeader('Content-type', 'application/ecmascript');
  // xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlhttp.open("GET", url, true);

  xmlhttp.onreadystatechange = function() {
    var markers=[];
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      console.log(text);
    }
  };
  xmlhttp.send();
  // var o;
  // o = d3.request("http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=758+W+14th+Pl+APT+1A&citystatezip=Chicago+IL&rentzestimate")
  //   //.header("Access-Control-Allow-Headers")
  //   //.header("Content-type", "application/ecmascript")
  //   .header("Access-Control-Allow-Origin")
  //   //.mimeType("application/xml")
  //   //.response(function(xhr) { return xhr.responseXML; })
  //   //.get(resultsHandler);
  //   ;
  //   console.log(o);
}

$(document).ready(function(){
    //var xhr = createCORSRequest();
    // console.log($.support.cors);
	// $.ajax({
	// 	type:"GET",
    //     url: "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA",
    //     contentType: 'text/xml',
    //     xhrFields: {
    //         withCredentials: false
    //     },
    //     headers: {
    //         'Access-Control-Allow-Headers':'*',
    //         'Access-Control-Allow-Origin':'http://127.0.0.1',
    //     },
	// 	dataType: 'xml',
	// 	//jsonpCallback: 'resultsHandler',
    //
	// 	// complete: function(xmlResponse) {
	// 	//
	// 	// 	   // So you can see what was wrong...
	// 	// 	   console.log(xmlResponse);
	// 	// 	   console.log("Sepra");
	// 	// 	   console.log(xmlResponse.responseText);
	// 	//
	// 	// 	 $("#preForXMLResponse").text(xmlResponse.responseText);
	// 	// },
	// 	success: function( response ){
	// 		// parseXml(response);
    //         console.log(response);
    //     },
    //     error: function( error ){
    //         console.log( "ERROR:", error );
    //     }
    //
	// });
    $.ajax({
        type: 'GET',
        url: 'https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqgaxkx98r_2ca3z&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+W',
        contentType: 'text/plain',
        xhrFields: { ithCredentials: false },
        headers: {'Accept':'application/xml'},
        dataType: 'xml  ',
        success: function (data) {
            console.log(data);
        }
    });

    // $.ajax({
    //     url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
    //     type: "GET",
    //     data: {
    //         "$$app_token" : "YOURAPPTOKENHERE"
    //     },
    //     jsonpCallback: 'resultsHandler'
    // }).done(function(data) {
    //     alert("Retrieved " + data.length + " records from the dataset!");
    //     console.log(data);
    // });

});

function parseXml(xml) {
	var item = $(xml).find("result");
	$(item).each(function() {
		console.log(this);
		//Example: var Titles = $(this).find('Title').text();
	});
}

function resultsHandler(result){
	console.log(results);
}

var map;
var latLng;
var arrayt;

function initMap(){
		var mapDiv = document.getElementById('map-canvas');
		map = new google.maps.Map(mapDiv, {
			center: {lat: 41.8708, lng: -87.6505},
			zoom: 15
		});
		var marker = new google.maps.Marker({
			position: {lat: 41.8708, lng: -87.6505},
			map: map,
            icon: 'images/university.png',
			title: 'Purdue University'
		})
        $.getJSON("data/Affordable_Rental_Housing_Developments.txt", function(datajs) {
            $.each(datajs.data, function(key, data) {
                // console.log(data);
                latLng = new google.maps.LatLng(data[19],data[20]);
                createMarker(latLng,data[11],data[12],'rentHouse',map,true);
                });
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
                    createMarker(latLng,val.primary_type,val.description,'crimes',map,false);
                });
            }
        });

        $.getJSON("data/Parks_Locations.txt", function(datajs) {
            $.each(datajs.data, function(key, data) {
                // console.log(data);
                var v = JSON.parse(data[82][0]);
                if (v != null) {
                    latLng = new google.maps.LatLng(data[82][1],data[82][2]);
                    var strname = data[15] + '\n' + data[14];
                    createMarker(latLng,strname,v.address,'parks',map,false);
                }
            });
        });

        $.getJSON("data/Police_Stations.txt", function(datajs) {
            $.each(datajs.data, function(key, data) {
                // console.log(data);
                latLng = new google.maps.LatLng(data[20],data[21]);
                createMarker(latLng,data[9],data[10],'policeStations',map, false);
            });
        });

        $.getJSON("data/Bike_Racks.txt", function(datajs) {
            $.each(datajs.data, function(key, data) {
                // console.log(data);
                latLng = new google.maps.LatLng(data[14],data[15]);
                createMarker(latLng,"Bike Rack ID: "+data[8],data[9],'bikeRacks',map, false);
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
                createMarker(latLng,data[10]+'\n'+'Type: '+fuelType,data[11],'alternativeFuel',map, false);
            });
        });

        $.getJSON("data/Fire_Stations.txt", function(datajs) {
            $.each(datajs.data, function(key, data) {
                // console.log(data);
                latLng = new google.maps.LatLng(data[14][1],data[14][2]);
                createMarker(latLng,data[8],data[9],'fireStations',map, false);
            });
        });

        $.getJSON("data/Libraries.txt", function(datajs) {
            $.each(datajs.data, function(key, data) {
                // console.log(data);
                latLng = new google.maps.LatLng(data[18][1],data[18][2]);
                createMarker(latLng,data[8]+'\n'+"Hours Operation: "+data[9],data[12]+'\n'+data[16],'libraries',map, false);
            });
        });
        $.ajax({
            url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations",
            type: "GET",
            headers: {
                token:'GObOTHMIHXwtGMHygXiFlcAFGJKThoYE'
            },
            success: function(data) {
                // console.log("Retrieved " + data.length + " records from the dataset!");
                // console.log(data);
                // $.each(data,function(index, val) {
                //     latLng = new google.maps.LatLng(val.latitude,val.longitude)
                //     createMarker(latLng,val.primary_type,val.description,'crimes',map,false);
                // });
            }
        });
        // console.log(markerGroups);

}

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
