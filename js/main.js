window.onload = () =>{



  var a = document.getElementsByClassName("addField");

  document.addEventListener("click", e =>{

    e = e || window.event;
    e.preventDefault();
    // //console.log(e.target);
    // window.addField(e.target)


    const clickClass = e.target.parentElement.classList;
    clickClass.forEach(t =>{
      if (t === "addField") {
        window.addFieldInput(e.target);


      }
    });
    })



}
