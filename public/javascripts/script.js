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
    
    // search city aciton
    $('#openCityBtn').click(function (e) { 
        e.preventDefault();
        $('.city').addClass('city-open');
    });
    $('#removecity').click(function (e) { 
        e.preventDefault();
        $('.city').removeClass('city-open');
    });


    // City data by ajax

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
        $("#subcat").show();
    });
});

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
