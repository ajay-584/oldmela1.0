var platform = new H.service.Platform({
    apikey: `3MF5LtA9hAsUU21kvaZSUaTj59h0GC4DdSxDtWeltDM` // replace with your api key
});
var defaultLayers = platform.createDefaultLayers();

const autosuggest = (e) => {
  if(event.metaKey){
    return
  }

let searchString = e.value
if (searchString != "") {
  fetch(
    `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=3MF5LtA9hAsUU21kvaZSUaTj59h0GC4DdSxDtWeltDM&at=33.738045,73.084488&limit=5&resultType=city&q=${searchString}&lang=en-US`
  )
  .then((res) => res.json())
  .then((json) => {
    if (json.length != 0) {
      document.getElementById("list").innerHTML = ``;
      let dropData = json.items.map((item) => {
        // console.log(json);
        if ((item.position != undefined) & (item.position != ""))
          document.getElementById("list").innerHTML += `<li onClick="addMarkerToMap(${item.position.lat},${item.position.lng},'${item.title}')">${item.title}</li>`;
      });
    }
  });
}
};

const addMarkerToMap = (lat, lng, title) => {
  console.log(lat, lng, title);
  document.getElementById('search').value = title;
};  