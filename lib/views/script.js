var divs = ["one", "two", "three", "four","five","six","seven","eight","nine","ten","eleven","twelve"];
var visibleDivId = null;
function toggle(divId) {
  if(visibleDivId === divId) {
    //visibleDivId = null;
  } else {
    visibleDivId = divId;
  }
  hideNonVisibleDivs();
}
function hideNonVisibleDivs() {
  var i, divId, div;
  for(i = 0; i < divs.length; i++) {
    divId = divs[i];
    div = document.getElementById(divId);
    if(visibleDivId === divId) {
      div.classList.add("show");
      div.classList.remove("hide");
    } else {
      div.classList.add("hide");
      div.classList.remove("show");
    }
  }
}