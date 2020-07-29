/* global p5 */
const p = new p5(() => {});

let font;
let colors;

let button, directionsButton, backButton;

let mouseIsReleased = false;

let currentScreen = "home";

p.preload = function() {
  font = p.loadFont(
    "https://cdn.glitch.com/10701851-ff16-4418-8942-e733d75bb5cb%2Fjunegull.ttf?v=1596033075561"
  );
};

p.setup = function() {
  p.createCanvas(800, 800);
  p.colorMode(p.HSB, 360, 100, 100);

  colors = {
    LIGHT_PINK: p.color(345, 40, 100),
    DARK_PINK: p.color(345, 70, 92),
    YELLOW: p.color(59, 25, 100),
    TAN: p.color(48, 16, 100),
    DARK_BLUE: p.color(199, 84, 100),
    LIGHT_BLUE: p.color(199, 30, 100),
    GRAY: p.color(217, 0, 76),
    DARK_RED: p.color(8, 91, 74),
    DARK_GRAY: p.color(217, 0, 50),
    FLAME_ORANGE: p.color(21, 100, 90),
    FLAME_YELLOW: p.color(41, 88, 100)
  };

  button = new Button(
    /* x */ p.width / 2,
    /* y */ 500,
    /* w */ 200,
    /* h */ 75,
    /* text */ "START",
    /* textSize */ 54,
    /* textY */ 518,
    function() {
      window.location.href = "https://cookingmama-cssi.glitch.me/game.html";
      mouseIsReleased = false;
    }
  );

  directionsButton = new Button(
    /* x */ p.width / 2,
    /* y */ 600,
    /* w */ 200,
    /* h */ 75,
    /* text */ "HOW TO PLAY",
    /* textSize */ 30,
    /* textY */ 610,
    function() {
      currentScreen = "how to play";
      mouseIsReleased = false;
    }
  );

  backButton = new Button(
    /* x */ p.width / 2,
    /* y */ 680,
    /* w */ 200,
    /* h */ 75,
    /* text */ "BACK",
    /* textSize */ 54,
    /* textY */ 698,
    function() {
      currentScreen = "home";
      mouseIsReleased = false;
    }
  );
};

p.mouseReleased = function() {
  mouseIsReleased = true;
}

p.draw = function() {
  if (currentScreen == "home") {
    drawHomeScreen();
  } else if (currentScreen == "how to play") {
    drawDirectionsScreen();
  }
  handleCursorChange(currentScreen);
};

function drawDirectionsScreen() {
  p.background(colors.LIGHT_PINK);

  p.textAlign(p.CENTER);
  p.textFont(font);

  p.textSize(72);
  p.fill(100);
  p.text("DIRECTIONS", p.width / 2, 200);
  p.textSize(30);
  p.text("1. Choose a recipe from the menu", p.width/2, 280);
  p.text("2. Move away from the camera so that you can see your", p.width/2, 330);
  p.text("upper body (waist up) in the video in the top-left corner", p.width/2, 380);
  p.text("3. Make the gesture in parentheses w/your arms", p.width/2, 430);
  p.text("4. Press the right arrow for the next step", p.width/2, 480);
  p.text("5. When you're done, choose a new recipe!", p.width/2, 530);
  p.text("6. ??", p.width/2, 580);
  
  backButton.handle();
}

function drawHomeScreen() {
  p.background(colors.LIGHT_BLUE);
  p.fill(colors.YELLOW);
  p.noStroke();
  p.rectMode(p.CORNER);
  p.rect(50, 50, p.width - 100, p.height - 100);

  p.textAlign(p.CENTER);
  p.textFont(font);

  p.textSize(48);
  p.fill(colors.DARK_BLUE);
  p.text("WELCOME TO", p.width / 2, 300);

  p.textSize(96);
  p.fill(colors.LIGHT_BLUE);
  p.text("Cooking Mama", p.width / 2 - 5, p.height / 2 + 5);
  p.fill(colors.DARK_PINK);
  p.text("Cooking Mama", p.width / 2, p.height / 2);

  button.handle();
  directionsButton.handle();
}

function drawRecipesScreen() {
  p.background(colors.LIGHT_PINK);

  p.textAlign(p.CENTER);
  p.textFont(font);

  p.textSize(72);
  p.fill(100);
  p.text("RECIPES", p.width / 2, 200);
  p.textSize(30);
  p.fill(100);
  p.strokeWeight(7);
  p.stroke(199, 84, 100);
  p.rect(260, 20, 520, 100, 10);

  p.fill(30);
  p.noStroke();
  p.textSize(24);
  p.textFont(this.font);
  p.textAlign(p.CENTER);
  p.text(this.text, 260 + 260, 77);

  backButton.handle();
}

function handleCursorChange() {
  if (currentScreen == "home") {
    if (button.isHovered() || directionsButton.isHovered()) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  } else if (currentScreen == "how to play") {
    if (backButton.isHovered()) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  }
}

class Button {
  constructor(x, y, w, h, text, textSize, textY, onPress) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.yOrig = y;
    this.onPress = onPress;
    this.text = text;
    this.textSize = textSize;
    this.textY = textY;
    this.textYOrig = textY;
  }

  handle() {
    this.draw();
    if (this.isHovered()) {
      this.y = this.yOrig + 5;
      this.textY = this.textYOrig + 5;
    } else {
      this.y = this.yOrig;
      this.textY = this.textYOrig;
    }
    if (this.isHovered() && mouseIsReleased) {
      this.onPress();
    }
  }

  draw() {
    p.push();
    p.rectMode(p.CENTER);
    p.fill(colors.LIGHT_BLUE);
    p.rect(this.x, this.yOrig + 10, this.w, this.h, this.h / 3);
    p.fill(colors.DARK_BLUE);
    p.rect(this.x, this.y, this.w, this.h, this.h / 3);

    p.fill(100);
    p.noStroke();
    p.textSize(this.textSize);
    p.text(this.text, this.x, this.textY);
    p.push();
  }

  isHovered() {
    return (
      p.mouseX >= this.x - this.w / 2 &&
      p.mouseX <= this.x + this.w / 2 &&
      p.mouseY >= this.yOrig - this.h / 2 &&
      p.mouseY <= this.yOrig + this.h / 2
    );
  }
}
