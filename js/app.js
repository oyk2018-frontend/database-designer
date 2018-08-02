(function (root) {
  const state = root.__INITIAL_STATE__;

  function render() {
    const titleElement = document.getElementById("document-title");
    titleElement.innerHTML = state.title;
  }

  root.__STATE__ = state;
  root.renderApp = render;
})(window);
