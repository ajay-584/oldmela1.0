$(document).ready(function () {
    // url variable 
    const url = 'https://www.oldmela.com/';

    // Profile icon 
    $('#profileIcon').click(function (e) { 
        e.preventDefault();
        const x = document.getElementById('profile')
        if (x.className == 'profile-box') {
          x.classList.add('open-profile')
        } else {
          x.classList.remove('open-profile')
        }
    });

    // open sidebar action
    $('#sideBaron').click(function (e) { 
        e.preventDefault();
        $('.sidebar').addClass('open');
    });
    // Close sidebar action
    $('#closeSideBar').click(function (e) { 
        e.preventDefault();
        $('.sidebar').removeClass('open');
    });

    // search item action
    $('#openSearchBtn').click((e)=>{
        e.preventDefault();
        $('.search').addClass('search-open');
    }); 
    $('#closeseSearchBtn').click((e)=>{
        e.preventDefault();
        $('.search').removeClass('search-open');
    });
    
    // search city action
    $('#openCityBtn').click(function (e) { 
        e.preventDefault();
        $('.city').addClass('city-open');
    });
    $('#removecity').click(function (e) { 
        e.preventDefault();
        $('.city').removeClass('city-open');
    });

    // Cat data by fetch function
    $(function(){
        const catPath = `${url}cat_data`;
        fetch(catPath).then(res=>res.text()).then((data)=>{
            // console.log(data);
            $('#catData').html(data);
        });
    });

    $("#cat").change(function (e) { 
        e.preventDefault();
        $("#subcat").show("slow");
    });

    // map my India token
    $('#sellSearch').keyup(function (e) { 
        e.preventDefault();
        $('#sellDropdown').show();
        const add = $(this).val();
        if(add != ""){
            fetch(`http://localhost:3000/map_address?address=${add}`)
            .then( res=>res.json())
            .then((data)=>{
                if(data.length != 0 ){
                    $('#selldropdownList').html('');
                    let dropData = data.items.map((item)=>{
                        if ((item.position != undefined) & (item.position != "")){
                            // console.log(item);
                            $('#selldropdownList').append(`<li onClick="sellCity(${item.position.lat},${item.position.lng},'${item.title}')">${item.title}</li>`);
                        }
                    })
                } // end data length block
            }); //end of fetch
        } // end of add if block
    });

    // for header city search
    $('#CitySearch').keyup(function (e) { 
        e.preventDefault();
        $('#dropdown').show();
        const add = $(this).val();
        if(add != ""){
            fetch(`http://localhost:3000/map_address?address=${add}`)
            .then( res=>res.json())
            .then((data)=>{
                if(data.length != 0 ){
                    $('.rmcity').remove();
                    let dropData = data.items.map((item)=>{
                        if ((item.position != undefined) & (item.position != "")){
                            // console.log(item);
                            $('#dropdownList').append(`<li class="rmcity" onClick="searchCity(${item.position.lat},${item.position.lng},'${item.title}')">${item.title}</li>`);
                        }
                    })
                } // end data length block
            }); //end of fetch
        } // end of add if block
    });


    // user click on outside defined click
    $(document).click(function() {
        $('#dropdown').hide('slow');
        $('#sellDropdown').hide('slow');
      });
    
    $("#CitySearch").val(cityAddress);
}); //end of jquery

var cityAddress;
// sell city function
function sellCity(lat,lng,address){
    document.getElementById('sellDropdown').style.display = 'none';
    document.getElementById('sellSearch').value = address;
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
}
// header city function
function searchCity(lat,lng,address){
    document.getElementById('dropdown').style.display = 'none';
    sessionStorage.setItem("address", address);
    window.location = `/city_data?lat=${lat}&lng=${lng}`;

}
// set value in city search field after refresh the page
function saveAddress(){
    // console.log(localStorage);
    let address = sessionStorage.getItem("address");
    if(address){
        cityAddress = address;
    }
}
saveAddress();
// Getting user geo locaiton
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    } 
  }
  
  function showPosition(position) {
      searchCity(position.coords.latitude, position.coords.longitude, "Current Location");
  }
// this function will runs once to get user location
function getGeoLocationOnlyOnce(){
    let executed = false;
    return ()=>{
        if(!executed){
            getLocation();
            executed = true;
        }
    }
}
getGeoLocationOnlyOnce();

// for sell cat and sub cat data
function sellselectcat(data) {
    // console.log(data)
    const url = 'https://www.oldmela.com/';
    const cat = document.getElementById('sellsubcat')
    const ajaxreq = new XMLHttpRequest()
    ajaxreq.open('GET', `${url}sellsubcat?value=${data}`, true)
    ajaxreq.send()
  
    ajaxreq.onreadystatechange = function () {
      if (ajaxreq.readyState == 4 && ajaxreq.status == 200) {
        // console.log("Working fine",ajaxreq.responseText);
        cat.innerHTML = ajaxreq.responseText
      }
    }
  }


// Ads page image selector 
function img1(i) {
    const x = document.getElementById(i).src;
    // console.log(x,i);
    document.getElementById('bigImage').src = x;
  }