// Creating arrays
const arrRight1 = [];
const arrRight2 = [];
const arrRight3 = [];
const arrRight4 = [];
const arrRight5 = [];
const arrRight6 = [];
const arrBankRight = [0];

const arrRight = [
  arrRight1,
  arrRight2,
  arrRight3,
  arrRight4,
  arrRight5,
  arrRight6,
  arrBankRight,
];

const arrLeft1 = [];
const arrLeft2 = [];
const arrLeft3 = [];
const arrLeft4 = [];
const arrLeft5 = [];
const arrLeft6 = [];
const arrBankLeft = [0];

const arrLeft = [
  arrLeft1,
  arrLeft2,
  arrLeft3,
  arrLeft4,
  arrLeft5,
  arrLeft6,
  arrBankLeft,
];
const player1 = {
  player: 'player1',
};

const player2 = {
  player: 'player2',
};
// Handles
const board = document.querySelector('.board');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const piecesLeft = document.querySelectorAll('.left-piece');
const piecesRight = document.querySelectorAll('.right-piece');
const player1El = document.querySelector('.player1');
const player2El = document.querySelector('.player2');
const gameOverEl = document.querySelector('.game-over');
const restartBtn = document.querySelector('.restart');
const gameOverMsg = document.querySelector('.end-dec');

let curPlayer;
let playAgain = false;

const gameOver = function () {
  // Clears active styles
  player1El.classList.remove('active');
  player2El.classList.remove('active');

  // displays GameOver screen
  gameOverEl.style.display = 'block';
  gameOverMsg.textContent = `Game Over, Player ${
    arrBankLeft > arrBankRight ? 'One' : 'Two'
  } Wins!`;
};

const renderGame = function () {
  piecesLeft.forEach(function (piece, i) {
    piece.textContent = arrLeft[i][0];
  });
  piecesRight.forEach(function (piece, i) {
    piece.textContent = arrRight[i][0];
  });
};

const startGame = function () {
  // Fill arrays
  arrRight.forEach(arr => {
    arr[0] = 4;
  });
  arrLeft.forEach(arr => {
    arr[0] = 4;
  });
  arrBankLeft[0] = 0;
  arrBankRight[0] = 0;

  // Sets current player
  curPlayer = player1;
  player1El.classList.add('active');
  player2El.classList.remove('active');
  gameOverEl.style.display = 'none';
  renderGame();
};
startGame();

const checkGameEnd = function () {
  // Removes bank to check array
  arrRight.pop();
  arrLeft.pop();

  // Checks if any spots on either side still has a number
  const right = arrRight.every(num => num[0] === 0);
  const left = arrLeft.every(num => num[0] === 0);
  if (right || left) {
    gameOver();
  }
  // adds back the banks after checking if the game is over
  arrRight.push(arrBankRight);
  arrLeft.push(arrBankLeft);
};

const endTurn = function () {
  // Adds back other players banks after turn is over
  if (arrRight.length === 6) {
    arrRight.push(arrBankRight);
  }
  if (arrLeft.length === 6) {
    arrLeft.push(arrBankLeft);
  }
  if (!playAgain) {
    if (curPlayer === player1) {
      curPlayer = player2;
      player2El.classList.add('active');
      player1El.classList.remove('active');
    } else {
      curPlayer = player1;
      player1El.classList.add('active');
      player2El.classList.remove('active');
    }
  }

  checkGameEnd();

  renderGame();
};

const moveRight = function (sel, turnsLeft = 0) {
  let curArr;
  let moveNum;
  if (isFinite(sel)) {
    moveNum = arrRight[sel][0];
    curArr = sel;
    arrRight[sel][0] = 0;
  }
  if (curPlayer.player === 'player1') {
    arrRight.pop();
  }

  const doMoves = function (moves, cur) {
    for (i = moves; i > 0; i--) {
      cur++;
      if (!arrRight[cur]) return moveLeft('_', i);

      if (cur === 6 && i === 1) {
        playAgain = true;
      } else playAgain = false;
      arrRight[cur][0] += 1;
    }
  };
  if (isFinite(sel)) doMoves(moveNum, curArr);
  if (!isFinite(sel)) doMoves(turnsLeft, -1);
};

const moveLeft = function (sel, turnsLeft = 0) {
  let curArr;
  let moveNum;
  if (isFinite(sel)) {
    moveNum = arrLeft[sel][0];
    curArr = sel;
    arrLeft[sel][0] = 0;
  }
  if (curPlayer.player === 'player2') {
    arrRight.pop();
  }

  const doMoves = function (moves, cur) {
    for (i = moves; i > 0; i--) {
      cur++;
      if (!arrLeft[cur]) moveRight('_', i);
      if (!arrLeft[cur]) return;
      arrLeft[cur][0] += 1;

      if (cur === 6 && i === 1) {
        playAgain = true;
      } else playAgain = false;
    }
  };
  if (isFinite(sel)) doMoves(moveNum, curArr);

  if (!isFinite(sel)) doMoves(turnsLeft, -1);
};

left.addEventListener('click', function (e) {
  const cur = e.target;
  if (curPlayer.player === 'player1' && arrLeft[cur.id][0] > 0) {
    moveLeft(cur.id);
    endTurn();
  }
});

right.addEventListener('click', function (e) {
  const cur = e.target;
  if (curPlayer.player === 'player2' && arrRight[cur.id][0] > 0) {
    moveRight(cur.id);
    endTurn();
  }
});

restartBtn.addEventListener('click', function () {
  startGame();
});
