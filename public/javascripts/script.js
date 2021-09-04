$(document).ready(function () {
    // url variable 
    const url = 'http://localhost:3000/'
    $('.ui-autocomplete-input').css('fontSize', '50px');
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
    $(function () { 
        // console.log("Event occur");
        const cityPath = `${url}city_data`;
        fetch(cityPath).then(res=>res.json()).then((data)=>{
            const city = data.map(ele=>{return {'value':ele._id,'label':ele.name,}});
            // console.log(city)
            $('.citySearch').autocomplete({
                source:city, 
                autoFocus:true,
                select: (event, ui)=>{
                    const cityLink = `/city?id=${ui.item.value}`;
                    window.location.href = cityLink;
                }
            });
        });
    });
});