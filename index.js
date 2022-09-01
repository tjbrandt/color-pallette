// class for setting colors and calculating complementary, analogous, and triadic partners
class Color {
  constructor(hex) {
    this.hex = hex;
    this.calcRGB();
    this.calcHSL();
    this.calcBrightness();
  }

  complementary() {
    const hsl = this.calcHSL();
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];

    let newHue = (h + 180) % 360;

    l /= 100;

    let a = (s * Math.min(l, 1 - l)) / 100;

    let f = (n) => {
      let k = (n + newHue / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  analogousLeft() {
    const hsl = this.calcHSL();
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];

    let newHue = (h + 30) % 360;

    l /= 100;

    let a = (s * Math.min(l, 1 - l)) / 100;

    let f = (n) => {
      let k = (n + newHue / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  analogousRight() {
    const hsl = this.calcHSL();
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];

    let newHue = (h - 30) % 360;

    l /= 100;

    let a = (s * Math.min(l, 1 - l)) / 100;

    let f = (n) => {
      let k = (n + newHue / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  triadicLeft() {
    const hsl = this.calcHSL();
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];

    let newHue = (h + 120) % 360;

    l /= 100;

    let a = (s * Math.min(l, 1 - l)) / 100;

    let f = (n) => {
      let k = (n + newHue / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  triadicRight() {
    const hsl = this.calcHSL();
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];

    let newHue = (h - 120) % 360;

    l /= 100;

    let a = (s * Math.min(l, 1 - l)) / 100;

    let f = (n) => {
      let k = (n + newHue / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  calcRGB() {
    let { hex } = this;
    const rgbString = hex.slice(1);
    const rgbArray = rgbString.match(/.{1,2}/g);
    let newRGB = [
      parseInt(rgbArray[0], 16),
      parseInt(rgbArray[1], 16),
      parseInt(rgbArray[2], 16),
    ];
    return newRGB;
  }

  calcHSL() {
    let rgbValues = this.calcRGB();
    let r = rgbValues[0];
    let g = rgbValues[1];
    let b = rgbValues[2];

    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // Green is max
      h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;

    return [Math.round(h), Math.round(s), Math.round(l)];
  }

  // chooseDarkLight calculates the brightness of the rgbcolor, then returns dark or light; depending on the value, the text will switch between white and black for a better UX
  calcBrightness() {
    let rgb = this.calcRGB();
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    const brightness = Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);

    return brightness;
  }
}

// class for updating parameters every time a color is chosen
class ColorBox {
  constructor(hex, rgb, hsl, brightness, box) {
    this.hex = hex;
    this.rgb = rgb;
    this.hsl = hsl;
    this.box = box;
    this.brightness = brightness;
  }

  updateLabelsMain() {
    const { hex, rgb, hsl, brightness, box } = this;
    box.bg.style.backgroundColor = hex;
    document.body.style.backgroundColor = hex;

    if (brightness < 115) {
      box.bg.style.color = "#FEFFF4";
    } else {
      box.bg.style.color = "black";
    }

    box.hex.innerHTML = hex;
    box.r.innerHTML = rgb[0];
    box.g.innerHTML = rgb[1];
    box.b.innerHTML = rgb[2];
    box.h.innerHTML = hsl[0];
    box.s.innerHTML = hsl[1];
    box.l.innerHTML = hsl[2];
  }

  updateLabelsOther() {
    const { hex, rgb, hsl, brightness, box } = this;

    box.bg.style.backgroundColor = hex;

    box.hexLabel.innerHTML = hex;
    box.rgbLabel.innerHTML = rgb;
    box.hslLabel.innerHTML = hsl;

    if (brightness < 115) {
      box.bg.style.color = "#FEFFF4";
      box.button.classList.replace("btn-outline-dark", "btn-outline-light");
    } else {
      box.bg.style.color = "black";
      box.button.classList.replace("btn-outline-light", "btn-outline-dark");
    }
  }
}

// the different boxes to display colors and values
const main = {
  bg: document.querySelector("#baseColor"),
  hex: document.querySelector("#baseHex"),
  r: document.querySelector("#baseR"),
  g: document.querySelector("#baseG"),
  b: document.querySelector("#baseB"),
  h: document.querySelector("#baseH"),
  s: document.querySelector("#baseS"),
  l: document.querySelector("#baseL"),
};

const complementary = {
  bg: document.querySelector("#colorComp"),
  ul: document.querySelector("#compUL"),
  hexLabel: document.querySelector("#hexComp"),
  rgbLabel: document.querySelector("#rgbComp"),
  hslLabel: document.querySelector("#hslComp"),
  button: document.querySelector("#copyColorComp"),
};

const analogousLeft = {
  bg: document.querySelector("#colorAnaOne"),
  ul: document.querySelector("#anaOneUL"),
  hexLabel: document.querySelector("#hexAnaOne"),
  rgbLabel: document.querySelector("#rgbAnaOne"),
  hslLabel: document.querySelector("#hslAnaOne"),
  button: document.querySelector("#copyColorAnaOne"),
};

const analogousRight = {
  bg: document.querySelector("#colorAnaTwo"),
  ul: document.querySelector("#anaTwoUL"),
  hexLabel: document.querySelector("#hexAnaTwo"),
  rgbLabel: document.querySelector("#rgbAnaTwo"),
  hslLabel: document.querySelector("#hslAnaTwo"),
  button: document.querySelector("#copyColorAnaTwo"),
};

const triadicLeft = {
  bg: document.querySelector("#colorTriOne"),
  ul: document.querySelector("#triOneUL"),
  hexLabel: document.querySelector("#hexTriOne"),
  rgbLabel: document.querySelector("#rgbTriOne"),
  hslLabel: document.querySelector("#hslTriOne"),
  button: document.querySelector("#copyColorTriOne"),
};

const triadicRight = {
  bg: document.querySelector("#colorTriTwo"),
  ul: document.querySelector("#triTwoUL"),
  hexLabel: document.querySelector("#hexTriTwo"),
  rgbLabel: document.querySelector("#rgbTriTwo"),
  hslLabel: document.querySelector("#hslTriTwo"),
  button: document.querySelector("#copyColorTriTwo"),
};

// event listeners for choosing a color, then copying desired HEX values to clipboard

const mainColor = document.querySelector("#colorSelector");
const buttonCopy = document.querySelectorAll("button");

mainColor.addEventListener("input", () => {
  const colorChoice = mainColor.value;
  const currentColor = new Color(colorChoice);
  const hsl = currentColor.calcHSL();
  const rgb = currentColor.calcRGB();
  const brightness = currentColor.calcBrightness();

  const compHex = new Color(currentColor.complementary());
  const ALHex = new Color(currentColor.analogousLeft());
  const ARHex = new Color(currentColor.analogousRight());
  const TLHex = new Color(currentColor.triadicLeft());
  const TRHex = new Color(currentColor.triadicRight());

  const baseBox = new ColorBox(colorChoice, rgb, hsl, brightness, main);
  baseBox.updateLabelsMain();

  const compBox = new ColorBox(
    compHex.hex,
    compHex.calcRGB(),
    compHex.calcHSL(),
    compHex.calcBrightness(),
    complementary
  );
  compBox.updateLabelsOther();

  const analogousLeftBox = new ColorBox(
    ALHex.hex,
    ALHex.calcRGB(),
    ALHex.calcHSL(),
    ALHex.calcBrightness(),
    analogousLeft
  );
  analogousLeftBox.updateLabelsOther();

  const analogousRightBox = new ColorBox(
    ARHex.hex,
    ARHex.calcRGB(),
    ARHex.calcHSL(),
    ARHex.calcBrightness(),
    analogousRight
  );
  analogousRightBox.updateLabelsOther();

  const triadicLeftBox = new ColorBox(
    TLHex.hex,
    TLHex.calcRGB(),
    TLHex.calcHSL(),
    TLHex.calcBrightness(),
    triadicLeft
  );
  triadicLeftBox.updateLabelsOther();

  const triadicRightBox = new ColorBox(
    TRHex.hex,
    TRHex.calcRGB(),
    TRHex.calcHSL(),
    TRHex.calcBrightness(),
    triadicRight
  );
  triadicRightBox.updateLabelsOther();

  Array.from(buttonCopy).forEach((button) => {
    button.innerText = "Copy HEX";
  });
});

let numClicks = 1;

Array.from(buttonCopy).forEach((button) => {
  button.addEventListener("click", function () {
    const hexID = document.getElementById(`hex${this.id.substring(9)}`);
    navigator.clipboard.writeText(hexID.innerText);
    if (button.textContent == "Copy HEX") {
      button.textContent = "HEX Copied";
      numClicks = 1;
    } else if ((button.textContent = "HEX Copied")) {
      numClicks += 1;
      button.textContent = `HEX Copied (${numClicks})`;
      console.log(numClicks);
    }
  });
});
