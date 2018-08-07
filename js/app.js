(function (root) {
  const state = root.__INITIAL_STATE__;

  function renderTitle() {
    const titleElement = document.getElementById("document-title");
    titleElement.innerHTML = state.title;
  }

  document.getElementById("document-title").ondblclick = function() {myFunction()};

  function myFunction() {
    document.getElementById("document-title").innerHTML = state.title;

    myFunction();
  }

  function myFunction() {
    var rename = prompt("Yeni isim giriniz", state.title);
    if (rename != "" || rename != null ) {
      state.title=rename;
        document.getElementById("document-title").innerHTML = rename ;
        console.log(state.title);

    } else {

      alert("Boş değer girilemez !!");
    }
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
<<<<<<< HEAD
      <ul class="database-table" style="${styles}">
      <li><b>${entity.name}</b></li>
      ${mapFieldItems(entity.fields).join('\n')}
      </ul>
=======
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
        </ul>
>>>>>>> 81b531c8cf88d6b073354446eb48cda232a10c6e
      `;
    });
  }

  function renderEntityContainer() {
    const entityList = document.getElementById("entity-list");
    entityList.innerHTML = mapEntityItems(
      state.entities
      ).join(
      "\n"
<<<<<<< HEAD
      );
    }

    function render() {
      renderTitle();
      renderEntityContainer();
    }
=======
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
  }

  function handleMouseDown(event) {
    const entityName = event.target.dataset.entity;

    const entityHeaderReact = (
      event.target.getBoundingClientRect()
    );

    const diffX = event.clientX - entityHeaderReact.left;
    const diffY = event.clientY - entityHeaderReact.top;

    state.UI.mode = 'drag-and-drop';
    state.UI.relatedEntity = entityName;
    state.UI.startX = diffX;
    state.UI.startY = diffY;
  }

  function handleMouseMove(event) {
    if (state.UI.mode === 'drag-and-drop') {
      // TODO: Don't mutate the state directly
      //       Create a new state
      state.entities.forEach(function (entity) {
        if (entity.name === state.UI.relatedEntity) {
          entity.top = event.clientY - state.UI.startY;
          entity.left = event.clientX - state.UI.startX;
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
>>>>>>> 81b531c8cf88d6b073354446eb48cda232a10c6e

    root.__STATE__ = state;
    root.renderApp = render;
  })(window);
