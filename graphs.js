function drawCircularGraph() {
  let radius = width / 7 - 100;
  let ang = 360 / numRows;
  let mappedValue = map(
    cirX,
    sliderX - sliderW / 2,
    sliderX + sliderW / 2,
    25,
    400
  );
  for (let i = 0; i < numRows; i++) {
    size[i] = map(gsml[i], -3.5, 79.5, 0, mappedValue-40);
    let pointx = (size[i] + radius) * cos(radians(ang * i)) + diagramX;
    let pointy = (size[i] + radius) * sin(radians(ang * i)) + diagramY;
    let cirx = radius * cos(radians(ang * i)) + diagramX;
    let ciry = radius * sin(radians(ang * i)) + diagramY;

    // draw the line
    if (i % 12 === 0) {
      strokeWeight(0.5);
      stroke("blue");
    } else {
      strokeWeight(0.1);
      stroke("black");
    }
    line(cirx, ciry, pointx, pointy);

    //hover
    //draw datapoints
    let datasize;
    let dis = dist(mouseX, mouseY, pointx, pointy);
    if (dis < 5) {
      fill("red");
      datasize = 10;
      noStroke();
      circle(pointx, pointy, datasize);
      //draw information
      textAlign(CENTER);
      textSize(12);
      fill("black");
      text(date[i], diagramX, diagramY);
      fill("blue");
      rectMode(CENTER)
      rect(diagramX, diagramY + 10, 70, 5);
      textSize(25);
      text(gsml[i], diagramX, diagramY + 40);
    } else {
      fill("blue");
      datasize = 3;
      noStroke();
      circle(pointx, pointy, datasize);
    }
  }
}

function drawBarGraph() {
  let year = [];
  let w = 0.2;
  let gap = (width - diagramX / 2) / numRows - w;
  let mappedValue = map(
    cirX,
    sliderX - sliderW / 2,
    sliderX + sliderW / 2,
    0,
    400
  );
  for (let i = 0; i < numRows; i++) {
    h = map(gsml[i], -3.5, 79.5, 0, mappedValue);
    let point1x = (w + gap) * i + width / 3;
    let point1y = height - diagramY / 2;
    let point2y = point1y - h;
    let point2x = point1x;

    // draw the line
    if (i % 12 === 0) {
      noStroke();
      year[i] = table.getNum(i, 0);
      textSize(10);
      textAlign(CENTER);
      fill("black");
      text(year[i], point1x, point1y + 10);

      strokeWeight(1);
      stroke("blue");
    } else {
      strokeWeight(w);
      stroke("black");
    }
    line(point1x, point1y, point2x, point2y);

    //trend line
    let p1x = point2x;
    let p1y = point2y;
    if (i < numRows - 1) {
      let p2x = (w + gap) * (i + 1) + width / 3;
      let p2y = point1y - map(gsml[i + 1], -3.5, 79.5, 0, mappedValue);
      strokeWeight(0.8);
      stroke("blue");
      line(p1x, p1y, p2x, p2y);
    }

    //hover
    //draw datapoints
    let datasize;
    let dis = dist(mouseX, mouseY, point2x, point2y);
    if (dis < 5) {
      fill("red");
      datasize = 10;
      noStroke();
      circle(point2x, point2y, datasize);
      //draw information
      textAlign(CENTER);
      textSize(12);
      fill("black");
      text(date[i], diagramX, 400);
      fill("blue");
      textAlign(CENTER);
      rect(diagramX - 35, 410, 70, 5);
      textSize(25);
      text(gsml[i], diagramX, 440);
    } else {
      fill("blue");
      datasize = 3;
      noStroke();
      circle(point2x, point2y, datasize);
    }
  }
}
