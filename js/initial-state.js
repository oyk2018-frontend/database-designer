(function (root) {
  root.__INITIAL_STATE__ = {
    title: "Untitled Document",
    UI: {
      mode: "designing", // or drag-and-drop
      relatedEntity: null,
    },
    entities: [{
      name: "users",
      top: 150,
      left: 300,
      fields: [{
        name: "id",
        type: "integer",
      }, {
        name: "username",
        type: "charfield",
      }, {
        name: "email",
        type: "charfield",
      }, {
        name: "password",
        type: "charfield",
      }],
    }, {
      name: "posts",
      top: 140,
      left: 600,
      fields: [{
        name: "id",
        type: "integer",
      }, {
        name: "username",
        type: "charfield",
      }, {
        name: "email",
        type: "charfield",
      }, {
        name: "password",
        type: "charfield",
      }],
    }, {
      name: "contents",
      top: 300,
      left: 200,
      fields: [{
        name: "id",
        type: "integer",
      }, {
        name: "username",
        type: "charfield",
      }, {
        name: "email",
        type: "charfield",
      }, {
        name: "password",
        type: "charfield",
      }],
    }, {
      name: "images",
      top: 500,
      left: 200,
      fields: [{
        name: "id",
        type: "integer",
      }, {
        name: "username",
        type: "charfield",
      }, {
        name: "email",
        type: "charfield",
      }, {
        name: "password",
        type: "charfield",
      }],
    }],
  };
})(window);
