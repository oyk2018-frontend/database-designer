

function reOffset(){
  var top = document.querySelector(".box").offsetTop;
  var left = document.querySelector(".box").offsetLeft;
  console.log(left);
}


document.querySelector(".box_header").addEventListener("click", () =>{
  reOffset();
})
