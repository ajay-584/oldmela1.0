function opensidebar(){
  document.querySelector(".sidebar").classList.add("open");
}
function closeSideBar(){
  document.querySelector(".sidebar").classList.remove("open");
}
function selcetcity(){
    document.querySelector(".city").classList.add("city-open");
}
function removecity(){
  document.querySelector(".city").classList.remove("city-open");
}
function searchitem(){
  document.querySelector(".search").classList.add("search-open");
}
function closesearch(){
  document.querySelector(".search").classList.remove("search-open");
}
function profile(){
  var x = document.getElementById("profile");
  if(x.className == "profile-box"){
    x.classList.add("open-profile");
  }else{
    x.classList.remove("open-profile");
  }
}
function colseprofile(){
  var x = document.getElementById("profile");
  x.classList.remove("open-profile");
}
function opensidebarlinks(){
  var x = document.getElementById("sidebar-link");
  if (x.className === "sidebar-link"){
    x.classList.add("sidebar-link-open");
  }else{
    x.classList.remove("sidebar-link-open");
  }
}

// ads page
function img1(){
  x = document.getElementById("img1").src;
  document.getElementById("bigImage").src = x;
 }
 function img2(){
  x = document.getElementById("img2").src;
  document.getElementById("bigImage").src = x;
 }
 function img3(){
  x = document.getElementById("img3").src;
  document.getElementById("bigImage").src = x;
 }