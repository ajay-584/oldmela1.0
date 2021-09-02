$(document).ready(function () {
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

    // City data by ajax
    $(function () { 
        // console.log("Event occur");
        const url = 'http://localhost:3000/city_data';
        fetch(url).then(res=>res.json()).then((data)=>{
            const city = data.map(ele=>{return ele.name});
            console.log(city)
            $('#citySearch').autocomplete({source:city, focus:true});
        });
    });
});