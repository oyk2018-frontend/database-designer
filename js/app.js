(function (root) {
  const state = root.__INITIAL_STATE__;

  function renderTitle() {
    const titleElement = document.getElementById("document-title");
    titleElement.innerHTML = state.title;
  }

  function mapFieldItems(fields) {
    return fields.map(function (field) {
      return `
          <li>${field.name}</li>
      `;
    });
  }

  function mapEntityItems(entities) {
    return entities.map(function (entity) {
      const styles = `top: ${entity.top}px; left: ${entity.left}px`;

      const modifier = (
        entity.name === state.UI.relatedEntity
          ? "is_dragging"
          : "idle"
      );

      return `
        <ul
          class="database-table ${modifier}"
          style="${styles}"
        >
          <li>
            <h4
              data-entity=${entity.name}
            >${entity.name}</h4>
          </li>
          ${mapFieldItems(entity.fields).join('\n')}
          <li class="addField"><a href="#!">new attribute</a></li>
          <li class="removeEntity" ><a href="#!" data-entity="${entity.name}">remove entity</a></li>
        </ul>
      `;
    });
  }

  function renderEntityContainer() {
    const entityList = document.getElementById("entity-list");
    entityList.innerHTML = mapEntityItems(
      state.entities
    ).join(
      "\n"
    );

    const entityTitles = entityList.querySelectorAll(".database-table h4");
    for (let i = 0; i < entityTitles.length; i++) {
      const title = entityTitles[i];
      title.addEventListener(
        'mousedown',
        handleMouseDown
      );
    }
  }

  function addFieldInput(e){
    for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
      document.getElementsByTagName("input")[i].remove();
    }
    const form = document.createElement("form");
      const li = document.createElement("li");
      form.appendChild(li)

        const input = document.createElement("input");
        input.type = "text";
    li.appendChild(input);



    const before = e.target.parentElement.parentElement.getElementsByClassName("addField")[0];
    e.target.parentElement.parentElement.insertBefore(form, before)
  }

  function addField(e){
    e.preventDefault();
    console.log(e.target);
    const clickClass = e.target.parentElement.classList;
    clickClass.forEach(t =>{
      if (t === "addField") {
        window.addFieldInput(e.target);


      }
    });
    const tar = e.target.parentElement.querySelector("h4").dataset.entity;
    for (var i = 0; i < __INITIAL_STATE__.entities.length; i++) {
      if(__INITIAL_STATE__.entities[i].name === tar){
        __INITIAL_STATE__.entities[i].fields.push({

        });
        render();
      }
    }
    console.log("we are here");
  }

  function render() {
    document.body.setAttribute("class", state.UI.mode);

    renderTitle();
    renderEntityContainer();

    // todo: detach this event listener before re-render
    document.body.addEventListener(
      'mousemove',
      handleMouseMove
    );

    // todo: detach this event listener before re-render
    document.body.addEventListener(
      'mouseup',
      handleMouseUp
    );

    document.getElementsByClassName("addEntity")[0].addEventListener(
      "click",
      getNewEntity
    );

    const fieldButton = document.getElementsByClassName("addField");

    for (var i = 0; i < fieldButton.length; i++) {
      fieldButton[i].addEventListener(
        "click",
        addFieldInput
      )
    }

    document.addEventListener(
      "submit",
      addField
    );

    const removeButton = document.getElementsByClassName("removeEntity");

    for (var i = 0; i < removeButton.length; i++) {
      removeButton[i].addEventListener(
        "click",
        removeEntity
      )
    }

  }

  function handleMouseDown(event) {
    const entityName = event.target.dataset.entity;

    state.UI.mode = 'drag-and-drop';
    state.UI.relatedEntity = entityName;
  }

  function handleMouseMove(event) {
    if (state.UI.mode === 'drag-and-drop') {
      // TODO: Don't mutate the state directly
      //       Create a new state
      state.entities.forEach(function (entity) {
        if (entity.name === state.UI.relatedEntity) {
          entity.top = event.clientY;
          entity.left = event.clientX;
        }
      });

      render();
    }
  }

  function handleMouseUp(event) {
    if (state.UI.mode === 'drag-and-drop') {
      state.UI.mode = 'designing';
      state.UI.relatedEntity = null;
      render();
    }
  }

  function getLastEntitysPosition(){
    var elem = document.querySelectorAll(".database-table");
    if(elem.length !== 0){
      return elem[elem.length - 1 ].lastTablePosition =
      {
        top : elem[elem.length -1 ].offsetTop,
        left: elem[elem.length -1 ].offsetLeft,
      }
    }else {
      return elem.lastTablePosition =
      {
        top : 0,
        left: 0,
      }
    }
  }

  function getNewEntity(){
      const header = window.prompt("entity name");
      if (header !== "") {
        window.__INITIAL_STATE__.entities.push(
          {
            name: header,
            top: getLastEntitysPosition().top + 30,
            left: getLastEntitysPosition().left + 30,
            fields: []
          }
        )
        window.renderApp();
      }else {
        console.log("empty ");
      }

  }

  function removeEntity(event){


    for (let i = 0; i < __INITIAL_STATE__.entities.length ; i++) {
      if(__INITIAL_STATE__.entities[i].name === event.target.dataset.entity){

      __INITIAL_STATE__.entities.splice(i, 1)
        render();
      }
    }
  }



  root.__STATE__ = state;
  root.renderApp = render;

})(window);









//
