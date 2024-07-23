document.addEventListener('keypress', function(event) {
  if (event.key == ' ') {
      event.preventDefault();
      c.generate();
  }
});

$ = {
  HEX: document.querySelector("#hex"),
  COLOR: document.querySelector(".color"),
  RGB: document.querySelector("#rgb"),
  R: document.querySelector("#red"),
  G: document.querySelector("#green"),
  B: document.querySelector("#blue"),
  COPY: document.querySelector(".copy_info")
}

class Color {
  
  parseHash(hash) {
    this.r = parseInt(hash.slice(0, 2), 16);
    this.g = parseInt(hash.slice(2, 4), 16);
    this.b = parseInt(hash.slice(4, 6), 16);
    this.display();
  }

  generate() {
    this.r = parseInt(Math.random() * 255);
    this.g = parseInt(Math.random() * 255);
    this.b = parseInt(Math.random() * 255);
    this.display();
  }

  display() {
    this.hex = ("#" +
      this.r.toString(16).padStart(2, "0") +
      this.g.toString(16).padStart(2, "0") +
      this.b.toString(16).padStart(2, "0")).toUpperCase();
    window.location.hash = this.hex.toLowerCase();
    $.R.value = String(this.r);
    $.G.value = String(this.g);
    $.B.value = String(this.b);    
    $.RGB.innerHTML = `rgb(${this.r}, ${this.g}, ${this.b})`;
    $.HEX.innerHTML = this.hex;
    $.COLOR.style.backgroundColor = this.hex;
  }

  set(CHANNEL) {
    CHANNEL.value = CHANNEL.value < 0 ? 0 : CHANNEL.value > 255 ? 255 : CHANNEL.value;
    switch (CHANNEL.id) {
      case "red":
        this.r = Number(CHANNEL.value);
        CHANNEL.value = String(this.r);
        break;

      case "green":
        this.g = Number(CHANNEL.value);
        CHANNEL.value = String(this.g);
        break;

      case "blue":
        this.b = Number(CHANNEL.value);
        CHANNEL.value = String(this.b);
        break;

      default:
        break;
    }
    this.display();
  }

  copyToClipboard(el) {
    navigator.clipboard.writeText(el.textContent);
    if (!$.COPY.classList.contains("display")) {
      $.COPY.classList.toggle("display");
      setTimeout(() => $.COPY.classList.toggle("display"), 1000);
    }
  }
}

function validateHash(str) {
  return str.length === 6 && str.match(/^[0-9A-Fa-f]+$/)
}

const hash = window.location.hash.slice(1)
const c = new Color();
const set = (el) => c.set(el);
const copy = (el) => c.copyToClipboard(el);
const generate = () => c.generate();

if (validateHash(hash)) {
  c.parseHash(hash);
}
else{
  c.generate();
}
delete hash