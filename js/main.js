window.onload = () =>{

  document.getElementsByClassName("addEntity")[0].addEventListener("click", (e)=>{
    e.preventDefault();
    const header = window.prompt("entity name");
    window.__INITIAL_STATE__.entities.push(
      {
        name: header,
        top: window.getLastElementPosition().top + 30,
        left: window.getLastElementPosition().left + 30,
        fields: []
      }
    )
    window.renderApp();
  });

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
        document.getElementsByTagName("input")[0].addEventListener("keyup",(t) => {
          console.log(t);
        })

      }
    });
    })






}
