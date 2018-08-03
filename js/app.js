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
      return `
        <ul
          class="database-table"
          style="${styles}"
        >
          <li>
            <h4
              data-entity=${entity.name}
            >${entity.name}</h4>
          </li>
          ${mapFieldItems(entity.fields).join('\n')}
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

  root.__STATE__ = state;
  root.renderApp = render;
})(window);

document.getElementsByClassName("addEntity")[0].addEventListener("click", (e) => {
  e.preventDefault();
  const header = window.prompt("Entity Name:");
  console.log(header);
  window.__INITIAL_STATE__.entities.push(
    {
      name: header,
      top: 10,
      left: 120,
      fields:[]
    }
  )
  window.renderApp();
});

