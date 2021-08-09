function opensidebar() {
  document.querySelector('.sidebar').classList.add('open')
}
function closeSideBar() {
  document.querySelector('.sidebar').classList.remove('open')
}
function selcetcity() {
  document.querySelector('.city').classList.add('city-open')
}
function removecity() {
  document.querySelector('.city').classList.remove('city-open')
}
function searchitem() {
  document.querySelector('.search').classList.add('search-open')
}
function closesearch() {
  document.querySelector('.search').classList.remove('search-open')
}
function profile() {
  var x = document.getElementById('profile')
  if (x.className == 'profile-box') {
    x.classList.add('open-profile')
  } else {
    x.classList.remove('open-profile')
  }
}
function colseprofile() {
  var x = document.getElementById('profile')
  x.classList.remove('open-profile')
}

//  for categories and sub cat data
// function opensidebarlinks(data){
//   // console.log(data)
//   var x = document.getElementById("sidebar-link");
//   if (x.className === "sidebar-link"){
//     x.classList.add("sidebar-link-open");
//   }

//   const ajaxreq = new XMLHttpRequest();
//   ajaxreq.open('GET','http://localhost:3000/subcat?value='+data,'TRUE');
//   ajaxreq.send();

//   ajaxreq.onreadystatechange = function(){
//     if(ajaxreq.readyState == 4 && ajaxreq.status == 200){
//       x.innerHTML = ajaxreq.responseText;
//     }
//   }

// }

// for sell cat and sub cat data
function sellselectcat(data) {
  // console.log(data)
  var cat = document.getElementById('sellsubcat')
  const ajaxreq = new XMLHttpRequest()
  ajaxreq.open('GET', 'https://oldmela.herokuapp.com/sellsubcat?value=' + data, true)
  ajaxreq.send()

  ajaxreq.onreadystatechange = function () {
    if (ajaxreq.readyState == 4 && ajaxreq.status == 200) {
      console.log("Working fine",ajaxreq.responseText);
      cat.innerHTML = ajaxreq.responseText
    }
  }
}
// sellselectcat("5fa4224d1ddd8d2ac89dcff5");
// ads page
function img1() {
  x = document.getElementById('img1').src
  document.getElementById('bigImage').src = x
}
function img2() {
  x = document.getElementById('img2').src
  document.getElementById('bigImage').src = x
}
function img3() {
  x = document.getElementById('img3').src
  document.getElementById('bigImage').src = x
}
// when some one select city
function cityId(id){
  // console.log(id);
  window.location = "/city?id="+String(id);
}