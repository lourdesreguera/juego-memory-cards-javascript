let cardArray = [
  {
    id: 1,
    name: "earth",
    img: "assets/earth.svg",
  },
  {
    id: 2,
    name: "jupiter",
    img: "assets/jupiter.svg",
  },
  {
    id: 3,
    name: "mars",
    img: "assets/mars.svg",
  },
  {
    id: 4,
    name: "mercury",
    img: "assets/mercury.svg",
  },
  {
    id: 5,
    name: "saturn",
    img: "assets/saturn.svg",
  },
  {
    id: 6,
    name: "uranus",
    img: "assets/uranus.svg",
  },
  {
    id: 7,
    name: "earth",
    img: "assets/earth.svg",
  },
  {
    id: 8,
    name: "jupiter",
    img: "assets/jupiter.svg",
  },
  {
    id: 9,
    name: "mars",
    img: "assets/mars.svg",
  },
  {
    id: 10,
    name: "mercury",
    img: "assets/mercury.svg",
  },
  {
    id: 11,
    name: "saturn",
    img: "assets/saturn.svg",
  },
  {
    id: 12,
    name: "uranus",
    img: "assets/uranus.svg",
  },
];

const grid$$ = document.querySelector('[data-function="grid"]');
const universeImg$$ = "assets/universe.svg";
const score$$ = document.querySelector('[data-function="score"]');
const attemp$$ = document.querySelector('[data-function="attempts"]');
let myArray = [];
let score = 0;
let attemps = 0;
let choices = [];
let save = [];

const gentTable = () => {
  for (let i = 0; i < 12; i++) {
    let img$$ = document.createElement("img");
    img$$.setAttribute("src", universeImg$$);
    grid$$.appendChild(img$$);
    img$$.addEventListener("click", () => checkChoices(img$$, i));
  }

  while (myArray.length < cardArray.length) {
    let numeroAleatorio = Math.floor(Math.random() * cardArray.length);
    let existe = false;
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] == numeroAleatorio) {
        existe = true;
        break;
      }
    }
    if (!existe) {
      myArray[myArray.length] = numeroAleatorio;
    }
  }
};
gentTable();

const checkChoices = (img$$, i) => {
  const imgAll$$ = document.querySelectorAll("img");
  img$$.setAttribute("src", cardArray[myArray[i]].img);
  img$$.setAttribute("id", cardArray[myArray[i]].id);
  choices.push(img$$.src);
  save.push(img$$.id);

  if (choices.length === 2 && choices[0] !== choices[1]) {
    choices = [];
    save.pop();
    save.pop();
    setTimeout(() => {
      const imgArr = Array.from(imgAll$$);
      const imgFilter = imgArr.filter((img) => !save.includes(img.id));
      for (let i = 0; i < imgFilter.length; i++) {
        imgFilter[i].setAttribute("src", universeImg$$);
      }
    }, 1000);
    sumAttemp();
  } else if (choices.length === 2 && choices[0] === choices[1]) {
    choices = [];
    score++;
    score$$.textContent = score;
    sumAttemp();
  }
  if (save.length === 12) {
    const win$$ = document.createElement("h2");
    win$$.textContent = "You win!";
    document.body.appendChild(win$$);
    const newGameBtn = document.createElement("button");
    newGameBtn.textContent = "New Game";
    document.body.appendChild(newGameBtn);
    newGameBtn.addEventListener("click", () => newGame(newGameBtn, win$$));
  }
};

const sumAttemp = () => {
  attemps++;
  attemp$$.textContent = attemps;
};

const newGame = (newGameBtn, win$$) => {
  grid$$.innerHTML = "";
  win$$.remove();
  imgFilter = [];
  save = [];
  choices = [];
  myArray = [];
  score = 0;
  attemps = 0;
  attemp$$.textContent = attemps;
  score$$.textContent = score;
  gentTable();
  newGameBtn.remove();
};
