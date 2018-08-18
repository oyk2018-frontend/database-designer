(function (root) {
  const state = root.__INITIAL_STATE__;

  function renderTitle() {
    const titleElement = document.getElementById("document-title");
    titleElement.innerHTML = state.title;
  }

  function mapFieldItems(fields) {
    return fields.map(function (field, index) {
      return `
          <li class="field-container">
            <a href="#" onclick="popUpDialog(this)" class="field" data-id="${index}">
              ${field.name}
              <span>(${field.type})</span>
            </a>
            <a href="#" onclick="deleteField(this,${index})" class="delete-field"></a>
            </li>
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
    renderDialog()

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

  function renderDialog() {
    const app = document.getElementById('app');
    const html = '<div class="dialog" id="dialog"> <h3>%entityName%</h3> <div class="container"> <p> <label for="field-name">Name: </label> <input type="text" name="field-name" value="%fieldName%"></input> </p> <p> <label for="field-type">Type: </label> <input type="text" name="field-type" value="%fieldType%"></input> </p> <p> <a href="#" data-name="%dataName%" data-id="%dataId%" onclick="updateEntity(this)">Save</a> <a href="#" onclick="closeDialog()">Close</a> </p> </div></div>';
    app.insertAdjacentHTML('beforeend', html);
  }

  function popUpDialog(element) {
    const id = element.dataset.id
    const values = element.innerText.split(' ');
    const entityName = element.parentNode.parentNode.firstElementChild.firstElementChild.dataset.entity;
    let dialog = document.getElementById('dialog');
    
    // check the h3 child of dialog, to see if dialog is already open.
    if (!dialog.firstElementChild.innerText.startsWith("%")) {
      closeDialog()
      dialog = document.getElementById('dialog');
    }

    dialog.innerHTML = dialog.innerHTML.replace('%entityName%', entityName);
    dialog.innerHTML = dialog.innerHTML.replace('%fieldName%', values[0]);
    dialog.innerHTML = dialog.innerHTML.replace('%fieldType%', values[1].substring(1, values[1].length - 1));
    dialog.innerHTML = dialog.innerHTML.replace('%dataName%', entityName);
    dialog.innerHTML = dialog.innerHTML.replace('%dataId%', id);
    dialog.style.display = "block";

    document.onkeydown = (event) => {
      if (event.keyCode === 13) {
        updateEntity(document.querySelector('#dialog a'));
      }
    }
  }

  function closeDialog() {
    let dialog = document.getElementById('dialog');
    dialog.parentNode.removeChild(dialog);
    document.onkeydown = () => {};
    render();
  }

  function updateEntity(element) {
    state.entities.forEach((entity) => {
      if (element.dataset.name === entity.name) {
        const inputFieldName = document.querySelector('input[name="field-name"]').value;
        const inputFieldType = document.querySelector('input[name="field-type"]').value;
        entity.fields[element.dataset.id].name = inputFieldName;
        entity.fields[element.dataset.id].type = inputFieldType;
      }
    })

    document.querySelector('.dialog').style.display = "none"
    let dialog = document.getElementById('dialog');
    dialog.parentNode.removeChild(dialog);
    document.onkeydown = () => {};
    render();
  }

  function deleteField(element, index) {
    
    if (dialog.firstElementChild.innerText.startsWith("%")) {
      const entityName = element.parentNode.parentNode.firstElementChild.firstElementChild.dataset.entity;
      state.entities.forEach((entity) => {
        if (entityName === entity.name) {
          entity.fields.splice(index, 1);
        }
      })
      render();
    }

  }


  root.__STATE__ = state;
  root.renderApp = render;
  root.popUpDialog = popUpDialog;
  root.closeDialog = closeDialog;
  root.deleteField = deleteField;
  root.updateEntity = updateEntity;
})(window);
