// WorkFlow


let select;

function setup() {
  createCanvas(400, 400);

  select = createSelect();
  select.option("Sans-serif");
  select.option("Serif");
  select.option("Fantasy");
  select.changed(selectChanged);
}

function draw() {
  background(220);
}

function selectChanged() {
  switch (select.value()) {
    case "Sans-serif":
      text("sans-serif");
      break;
    case "Serif":
      text("serif");
      break;
    case "Fantasy":
      text("fantasy");
      break;
  }

}