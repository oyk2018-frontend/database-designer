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
    if (rename != null) {
      state.title=rename;
        document.getElementById("document-title").innerHTML = rename ;
        console.log(state.title);

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
      return `
      <ul class="database-table" style="${styles}">
      <li><b>${entity.name}</b></li>
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
    }

    function render() {
      renderTitle();
      renderEntityContainer();
    }

    root.__STATE__ = state;
    root.renderApp = render;
  })(window);
