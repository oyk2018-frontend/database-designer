
function dragElement(elem){
  console.log("dragElement");
  var firstX,firstY,secondX,secondY;

  elem.onmousedown = getPos;

  function getPos(e){
    console.log("getPos");
    e = e || window.event;
    e.preventDefault();

    firstX = e.clientX;
    firstY = e.clientY;

    document.onmousemove = drag;
    document.onmouseup = dragDown;
  }

  function drag(e){
    e = e || window.event;
    e.preventDefault();

    secondX = firstX - e.clientX;
    secondY = firstY - e.clientY;

    firstX = e.clientX;
    firstY = e.clientY;

    elem.style.left = (elem.offsetLeft - secondX) + "px";
    elem.style.top = (elem.offsetTop - secondY) + "px";
  }

  function dragDown(){
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

window.addEventListener("click", e =>{
  console.log(e.target);
})
dragElement(document.querySelectorAll(".box")[1]);

// console.log(document.getElementById("bubirid").id);
