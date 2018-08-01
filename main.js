function dropItem(ev) {
ev.preventDefault();
}
function drag(ev) {
ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev) {
ev.preventDefault();
var abc = ev.dataTransfer.getData("Text");
ev.target.appendChild(document.getElementById(abc));
}
