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
        <ul id="${"table_"+entities.indexOf(entity)}" class="database-table" style="${styles}">
          <li><b>${entity.name}</b></li>
          ${mapFieldItems(entity.fields).join('\n')}
          <li class="addField"><a href="#!">new attribute</a></li>
          <li class="removeEntity"><a href="#!">remove entity</a></li>
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

    console.log(li);

    const before = e.parentElement.parentElement.getElementsByClassName("addField")[0];
    e.parentElement.parentElement.insertBefore(form, before)
  }

  function render() {
    renderTitle();
    renderEntityContainer();
  }

  function getLastElementPosition(){
    var elem = document.querySelectorAll(".database-table");
    return elem[elem.length - 1 ].lastTablePosition =
    {
      top : elem[elem.length -1 ].offsetTop,
      left: elem[elem.length -1 ].offsetLeft,
    }
  }



  root.__STATE__ = state;
  root.renderApp = render;
  root.addFieldInput = addFieldInput;
  root.getLastElementPosition = getLastElementPosition;

})(window);









//
