/* global p, Bowl, hand, Recipe, colors, topPrediction, Button */

class Step {
  constructor(configure, handle, direction) {
    this.complete = false;

    this.configure = configure;
    this.handle = handle;
    this.direction = direction;
  }
}

/* ----------------- RECIPE 1: BOILED RICE ----------------- */

//required variables
let ricecooker;
let bowl1, bowl2, bowl3, bowl4;

//steps
let riceStep1 = new Step(
  function() {
    bowl1 = new Bowl(270, 625, "medium", "empty");
  },
  function() {
    //triggered once
    if (topPrediction == "handsDown") {
      //p.keyIsPressed && p.key == "r"
      this.complete = true;
      hand.press(280, 470);
      bowl1.contents = "rice";
    }
    //display bowl and dispenser iteratively

    bowl1.display();
    /* DISPENSER */
    //spout
    p.fill(colors.DARK_PINK); //darker pink outline
    p.rect(300, 550, 20, 20);
    //body
    p.fill(colors.LIGHT_PINK); //light-ish pink
    p.rect(350, 525, 125, 200);
    p.rect(290, 525, 100, 30);
    //button
    p.fill(colors.DARK_PINK); //darker pink outline
    p.rect(380, 510, 60, 20);
    //window
    p.fill(100);
    p.rect(370, 580, 85, 90);

    return false;
  },
  "Step 1: Dispense the rice! (put both hands down)"
);

let riceStep2 = new Step(
  function() {
    bowl2 = new Bowl(270, 625, "medium", "rice");
  },
  function() {
    //triggered once
    if (topPrediction == "handsUp") {
      this.complete = true;
      hand.press(280, 470);
      bowl2.contents = "water";
    }

    //display bowl and dispenser iteratively
    bowl2.display();
    //spout
    p.fill(colors.DARK_PINK); //darker pink outline
    p.rect(300, 550, 20, 20);
    //body
    p.fill(colors.LIGHT_PINK); //light-ish pink
    p.rect(350, 525, 125, 200);
    p.rect(290, 525, 100, 30);
    //button
    p.fill(colors.DARK_PINK); //darker pink outline
    p.rect(380, 510, 60, 20);
    //window
    p.fill(210, 80, 94); //blue
    p.rect(370, 580, 85, 90);
  },
  "Step 2: Dispense the water! (put both hands up)"
);

let riceStep3 = new Step(
  function() {
    bowl3 = new Bowl(270, 625, "medium", "water");
  },
  function() {
    //triggered once
    if (topPrediction == "makeCircle") {
      //condition to check if step is complete
      this.complete = true;
      hand.moveCircle(true, 120, 500);
    }
    //display bowl, called iteratively
    bowl3.display();
  },
  "Step 3: Wash the rice! (clasp hands in front)"
);

let riceStep4 = new Step(
  function() {
    bowl4 = new Bowl(150, 625, "medium", "water");
    ricecooker = p.loadImage(
      "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Frice-cooker-removebg-preview.png?v=1595963790167"
    );
  },
  function() {
    //triggered once
    if (topPrediction == "pointLeft") {
      //condition to check if step is complete
      this.complete = true;
      hand.moveLinear(-10, 500, 320, 500);
    }
    //display bowl and ricecooker, called iteratively
    if (!this.complete) {
      //before
      bowl4.display();
      p.image(ricecooker, 300, 500, 300, 300);
    } else {
      //after
      p.image(ricecooker, 300, 500, 300, 300);
    }
  },
  "Step 4: Put the rice in the cooker! (point right)"
);

let riceStep5 = new Step(
  function() {},
  function() {
    //triggered once
    if (topPrediction == "pointRight") {
      //it's right b/c the camera is flipped
      //condition to check if step is complete
      this.complete = true;
      hand.moveLinear(320, 500, -10, 500);
    }
    //display bowl and ricecooker, called iteratively

    p.image(ricecooker, 300, 500, 300, 300);
    //plate
    p.stroke(colors.DARK_PINK);
    p.strokeWeight(4);
    p.fill(colors.LIGHT_PINK); //light-ish pink
    p.ellipse(150, 700, 210, 70);
    p.noFill();
    p.ellipse(150, 700, 150, 40);
    if (this.complete) {
      //rice
      p.noStroke();
      p.fill(100);
      p.arc(150, 700, 120, 120, -1 * p.PI, 0);
      p.ellipse(150, 700, 120, 20);
    }
  },
  "Step 5: Serve the rice! (point left)"
);

let riceFinalDish = function() {
  let dishX = p.width / 2;
  let dishY = 500;
  let sizeScale = 1.5;

  //rotating star
  p.push();
  p.fill(colors.LIGHT_BLUE);
  p.translate(dishX, dishY);
  p.rotate(p.frameCount / 20);
  star(0, 0, 120, 220, 5);
  p.pop();

  //plate
  p.stroke(colors.DARK_PINK);
  p.strokeWeight(6);
  p.fill(colors.LIGHT_PINK); //light-ish pink
  p.ellipse(dishX, dishY, 210 * sizeScale, 70 * sizeScale);
  p.noFill();
  p.ellipse(dishX, dishY, 150 * sizeScale, 40 * sizeScale);

  //rice
  p.noStroke();
  p.fill(100);
  p.arc(dishX, dishY, 120 * sizeScale, 120 * sizeScale, -1 * p.PI, 0);
  p.ellipse(dishX, dishY, 120 * sizeScale, 20 * sizeScale);
};

let riceRecipe = new Recipe(
  [riceStep1, riceStep2, riceStep3, riceStep4, riceStep5],
  riceFinalDish,
  "rice"
);

function star(x, y, radius1, radius2, npoints) {
  let angle = p.TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  p.beginShape();
  for (let a = 0; a < p.TWO_PI; a += angle) {
    let sx = x + p.cos(a) * radius2;
    let sy = y + p.sin(a) * radius2;
    p.vertex(sx, sy);
    sx = x + p.cos(a + halfAngle) * radius1;
    sy = y + p.sin(a + halfAngle) * radius1;
    p.vertex(sx, sy);
  }
  p.endShape(p.CLOSE);
}
