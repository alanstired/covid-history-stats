const url = "https://api.covidtracking.com/v1/us/daily.json";
let covid;
let periodData;
let txp = {
  text: [
    'COVID-19 Positive Cases from March 7, 2021 - January 13, 2020, + for cases, - for deaths'
  ],
  size: 12,
  visible: true
}
let txd = {
  text: [
    'COVID-19 Deaths from March 7, 2021 - January 13, 2020, + for cases, - for deaths'
  ],
  size: 12,
  visible: true
}
let sf = 1; // scaleFactor
let mx, my; // mouse coords;
let perioddeath = 1; // changing the mode from positive cases to deaths

function drawInfo() {
  if (perioddeath === 0) {
    textSize(txp.size);
    let i = 10;
    for (let line of txp.text) {
      text(line, 10, i);
      i += 12;
    }
  }
  if (perioddeath === 1) {
    textSize(txd.size);
    let i = 10;
    for (let line of txd.text) {
      text(line, 10, i);
      i += 12;
    }
  }
}



function drawN() {
  size = 10;
  text(periodData.max, width - 50, 15);
}

function drawDate() {
  size = 10;
  text('March 7, 2021', 20, height - 20);
  text('January 13, 2020', width - 95, height - 20);
}

function preload() {
  covid = loadJSON(url, () => console.log(`${url} load success`), () => loadError(url));
}

function loadError(url) {
  console.log(`couldn't load: ${url}`);
}



function setup() {
  createCanvas(windowWidth - 30, windowHeight - 30);
  // for (let i = 0; i < covid; i++){
  //   console.log(covid[i].positive);
  //   }
  if (covid) {
    if (perioddeath === 0) {
      calculatePosPeriodData();
    }
    if (perioddeath === 1) {
      calculateDeathPeriodData();
    }

  }
}

function windowResized() {
  resizeCanvas(windowWidth - 30, windowHeight - 30);
}


function calculatePosPeriodData() {
  if (!periodData) {
    periodData = { mean: 0, min: Infinity, max: -Infinity };
    // The problem here is that the data retrieved isn't valid 
    //   JSON. In this case, loadJSON does something somewhat  
    //   arbitrary instead of simply crashing: it loads it as 
    //   an object with numeric keys. That renders the for 
    //   loop, as well as the references to length. 
    // for( let period of Object.entries(covid)) {
    for (let i = 0; i < Object.keys(covid).length; i++) {
      period = covid[i];
      if (period.positive == null) {
        continue;
      }
      periodData.mean += period.positive;
      if (period.positive < periodData.min) {
        periodData.min = period.positive;
      }
      if (period.positive > periodData.max) {
        periodData.max = period.positive;
      }
    }
    periodData.mean /= Object.keys(covid).length;
    console.log(periodData);
  }
  noLoop();
}

function calculateDeathPeriodData() {
  if (!periodData) {
    periodData = { mean: 0, min: Infinity, max: -Infinity };
    // The problem here is that the data retrieved isn't valid 
    //   JSON. In this case, loadJSON does something somewhat  
    //   arbitrary instead of simply crashing: it loads it as 
    //   an object with numeric keys. That renders the for 
    //   loop, as well as the references to length. 
    // for( let period of Object.entries(covid)) {
    for (let i = 0; i < Object.keys(covid).length; i++) {
      period = covid[i];
      if (period.death == null) {
        continue;
      }
      periodData.mean += period.death;
      if (period.death < periodData.min) {
        periodData.min = period.death;
      }
      if (period.death > periodData.max) {
        periodData.max = period.death;
      }
    }
    periodData.mean /= Object.keys(covid).length;
    console.log(periodData);
  }
  noLoop();
}


function draw() {
  background("white");
  /*
  mx = mouseX;
  my = mouseY;
  scale(sf);
  // noStroke();
  translate(2*mx, 2*my);
  scale(sf);
  // noStroke();
  translate(-2*mx, -2*my);
  clear();*/
  text.color = ('black');
  drawInfo();
  drawDate();
  if (covid) {
    if (perioddeath === 0) {
      if (!periodData) {
        calculatePosPeriodData();
      }

      let w = (width) / Object.keys(covid).length;
      for (let i = 0; i < Object.keys(covid).length - 1; i++) {
        if (covid[i].positive) {
          fill(lerpColor(
            color(0, 0, 255),
            color(255, 0, 0),
            map(covid[i].positive, periodData.min, periodData.max, 0, 1))
          );
          let y = map(
            covid[i].positive,
            0,
            30000000,
            height - 15,
            0);
          rect(i * w, y, w, w);
          text.color = ('black');
          text(30000000, width - 60, 15);
        }
      }
    }
    if (perioddeath === 1) {
      if (!periodData) {
        calculateDeathPeriodData();
      }

      let w = (width) / Object.keys(covid).length;
      for (let i = 0; i < Object.keys(covid).length - 1; i++) {
        if (covid[i].death) {
          fill(lerpColor(
            color(0, 255, 0),
            color(255, 0, 0),
            map(covid[i].death, periodData.min, periodData.max, 0, 1))
          );
          let y = map(
            covid[i].death,
            0,
            periodData.max,
            height - 15,
            0);
          // console.log(y);
          rect(i * w, y, w, w);
          text.color = ('black');
          text(periodData.max, width - 50, 15);
        }
      }
    }


  }







}
window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0)
    sf *= 1.05;
  else
    sf *= 0.95;
});
function keyPressed() {
  if (key === '0') {
    sf = 1
    redraw();
  }
  if (key === '+') {
    perioddeath = 0;
    console.log(perioddeath);
    redraw();
  }
  if (key === '-') {
    perioddeath = 1;
    console.log(perioddeath);
    redraw();
  }
}
#1