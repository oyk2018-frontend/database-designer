(function (root) {
  const state = root.__INITIAL_STATE__;

  function renderTitle() {
    const titleElement = document.getElementById("document-title");
    titleElement.innerHTML = state.title;
  }

  function mapFieldItems(fields) {
    return fields.map(function (field) {
      return `
          <li><span>${field.name}</span><span>${field.type}</span></li>
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
