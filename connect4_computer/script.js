let holes = document.getElementsByClassName('hole');
function checkWinner(visitedArr2D) {
    //checking for red (1)
    //checking horizontally
    for (let row = 0; row < 6; row++) {
        let count = 0;
        for (let col = 0; col < 7; col++) {
            if (visitedArr2D[row][col] === 1) {
                count++;
                if (count === 4) return 1;
            }
            else {
                count = 0;
            }
        }
    }
    //checking vertically
    for (let col = 0; col < 7; col++) {
        let count = 0;
        for (let row = 0; row < 6; row++) {
            if (visitedArr2D[row][col] === 1) {
                count++;
                if (count === 4) return 1;
            }
            else {
                count = 0;
            }
        }
    }
    //checking parallel to principal diagonal
    for (let j = -5; j < 7; j++) {
        let count = 0;
        let row = (j >= 0) ? 0 : -j;
        let col = (j >= 0) ? j : 0;
        for (let i = 0; i < 6; i++) {
            if (row + i >= 0 && row + i < 6 && col + i >= 0 && col + i < 7) {
                if (visitedArr2D[row + i][col + i] === 1) {
                    count++;
                    if (count === 4) return 1;
                }
                else {
                    count = 0;
                }
            } 
        }
    }
    //checking parallel to secondary diagonal
    for (let j = 0; j < 12; j++) {
        let count = 0;
        let row = (j < 7) ? 0 : j - 6;
        let col = (j < 7) ? j : 6;
        for (let i = 0; i < 6; i++) {
            if (row + i >= 0 && row + i < 6 && col - i >= 0 && col - i < 7) {
                if (visitedArr2D[row + i][col - i] === 1) {
                    count++;
                    if (count === 4) return 1;
                }
                else {
                    count = 0;
                }
            } 
        }
    }

    //checking for yellow (2)
    //checking horizontally
    for (let row = 0; row < 6; row++) {
        let count = 0;
        for (let col = 0; col < 7; col++) {
            if (visitedArr2D[row][col] === 2) {
                count++;
                if (count === 4) return 2;
            }
            else {
                count = 0;
            }
        }
    }
    //checking vertically
    for (let col = 0; col < 7; col++) {
        let count = 0;
        for (let row = 0; row < 6; row++) {
            if (visitedArr2D[row][col] === 2) {
                count++;
                if (count === 4) return 2;
            }
            else {
                count = 0;
            }
        }
    }
    //checking parallel to principal diagonal
    for (let j = -5; j < 7; j++) {
        let count = 0;
        let row = (j >= 0) ? 0 : -j;
        let col = (j >= 0) ? j : 0;
        for (let i = 0; i < 6; i++) {
            if (row + i >= 0 && row + i < 6 && col + i >= 0 && col + i < 7) {
                if (visitedArr2D[row + i][col + i] === 2) {
                    count++;
                    if (count === 4) return 2;
                }
                else {
                    count = 0;
                }
            } 
        }
    }
    //checking parallel to secondary diagonal
    for (let j = 0; j < 12; j++) {
        let count = 0;
        let row = (j < 7) ? 0 : j - 6;
        let col = (j < 7) ? j : 6;
        for (let i = 0; i < 6; i++) {
            if (row + i >= 0 && row + i < 6 && col - i >= 0 && col - i < 7) {
                if (visitedArr2D[row + i][col - i] === 2) {
                    count++;
                    if (count === 4) return 2;
                }
                else {
                    count = 0;
                }
            } 
        }
    }

    return 0;

};


//human is player1 while computer is player2
const pos1 = [];
const pos2 = [];
const visitedArr2D = Array.from({ length: 6 }, () => Array(7).fill(0));

function getNextMove(pos1, pos2, visitedArr, a, b) { //assuming it is player 2's turn set a = 2, b = 1 otherwise a = 1, b = 2
    let map = new Map(); //here key is index [x, y] and value is 0
    const drs = [
        [-1, 0], 
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1]
    ];
    for (const [x, y] of pos1) {
        for (const [dx, dy] of drs) {
            let xn = x + dx;
            let yn = y + dy;
            if (xn >= 0 && xn < 6 && yn >= 0 && yn < 7 && visitedArr[xn][yn] === 0) {
                let key = `${xn},${yn}`;
                map.set(key, 0);
            }
        }
    }
    for (const [x, y] of pos2) {
        for (const [dx, dy] of drs) {
            let xn = x + dx;
            let yn = y + dy;
            if (xn >= 0 && xn < 6 && yn >= 0 && yn < 7 && visitedArr[xn][yn] === 0) {
                let key = `${xn},${yn}`;
                map.set(key, 0);
            }
        }
    }
    if (map.size === 0) {
        let freeSpaces = [];
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (visitedArr[row][col] === 0) freeSpaces.push([row, col]);
            }
        }
        let n = freeSpaces.length;
        return freeSpaces[Math.floor(Math.random() * n)];
    } else {
        for (const key of map.keys()) {
            let [x, y] = key.split(',').map(Number);
            let points = 0;
            for (const [dx, dy] of drs) {
                let x1 = x + dx;
                let y1 = y + dy;
                if (x1 >= 0 && x1 < 6 && y1 >= 0 && y1 < 7 && visitedArr[x1][y1] !== 0) {
                    let x3 = x + 3 * dx;
                    let y3 = y + 3 * dy;
                    let x2 = x + 2 * dx;
                    let y2 = y + 2 * dy;
                    if (visitedArr[x1][y1] === a) { //yellow
                        if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr[x3][y3] === a) {
                            if (visitedArr[x2][y2] === a) points += 5000;
                        } else if (x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr[x2][y2] === a) {
                            if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr[x3][y3] === 0 && x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr[x-dx][y-dy] === 0) points += 1600;
                            else points += 500;
                        } else if (x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr[x-dx][y-dy] === a && x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr[x2][y2] === 0 && x - 2*dx >= 0 && x - 2*dx < 6 && y - 2*dy >= 0 && y - 2*dy < 7 && visitedArr[x-2*dx][y-2*dy] === 0) {
                            points += 800;
                        } else points += 200;
                    } else { //for red
                        if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr[x3][y3] === b) {
                            if (visitedArr[x2][y2] === b) points += 3000;
                        } else if (x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr[x2][y2] === b) {
                            if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr[x3][y3] === 0 && x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr[x-dx][y-dy] === 0) points += 1400;
                            else points += 400;
                        } else if (x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr[x-dx][y-dy] === b && x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr[x2][y2] === 0 && x - 2*dx >= 0 && x - 2*dx < 6 && y - 2*dy >= 0 && y - 2*dy < 7 && visitedArr[x-2*dx][y-2*dy] === 0) {
                            points += 700;
                        } else points += 100;
                    }
                }
            }
            map.set(key, points);
        }
        let maxKey = null;
        let maxValue = -Infinity;
        for (const [key, value] of map.entries()) {
            if (value > maxValue) {
                maxValue = value;
                maxKey = key;
            }
        }
        let choice = maxKey.split(',').map(Number);
        return choice;
    }
};


function numMovesToStop(pos1, pos2, visitedArr, numMovesWrapper) { //assuming it is player 1's turn first
    //base case
    if (checkWinner(visitedArr) === 1) {
        numMovesWrapper.numMoves *= -1;
        return;
    } else if (checkWinner(visitedArr) === 2) {
        return;
    } else {
        let move = getNextMove(pos1, pos2, visitedArr, 1, 2); //player 1's turn
        pos1.push(move);
        numMovesWrapper.numMoves += 1;
        visitedArr[move[0]][move[1]] = 1;
        if (checkWinner(visitedArr) === 1) {
            numMovesWrapper.numMoves *= -1;
            return;
        } else {
            let move2 = getNextMove(pos1, pos2, visitedArr, 2, 1); //player 2's turn
            pos2.push(move2);
            numMovesWrapper.numMoves += 1;
            visitedArr[move2[0]][move2[1]] = 2;
            if (checkWinner(visitedArr) === 2) return;
            else numMovesToStop(pos1, pos2, visitedArr, numMovesWrapper);
            return;
        }
    }
};

function returnFeasibleIndex(pos1, pos2, visitedArr2D) {
    //3 yellow(2) -> 5000 pts
    //3 red(1) -> 3000 pts
    //2 yellow with both end open -> 1600 pts
    //2 red with both end open -> 1400 pts
    //2 yellow with one end open-> 500 pts
    //2 red -> 400 pts
    //1 yellow -> 200 pts
    //1 red -> 100 pts
    //create an map where the key is the index, and value is points obtained. later we will select the index with maximum points
    let map = new Map(); //here key is index [x, y] and value is 0
    const drs = [
        [-1, 0], 
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1]
    ];
    for (const [x, y] of pos1) {
        for (const [dx, dy] of drs) {
            let xn = x + dx;
            let yn = y + dy;
            if (xn >= 0 && xn < 6 && yn >= 0 && yn < 7 && visitedArr2D[xn][yn] === 0) {
                let key = `${xn},${yn}`;
                map.set(key, 0);
            }
        }
    }
    for (const [x, y] of pos2) {
        for (const [dx, dy] of drs) {
            let xn = x + dx;
            let yn = y + dy;
            if (xn >= 0 && xn < 6 && yn >= 0 && yn < 7 && visitedArr2D[xn][yn] === 0) {
                let key = `${xn},${yn}`;
                map.set(key, 0);
            }
        }
    }
    if (map.size === 0) {
        let freeSpaces = [];
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (visitedArr2D[row][col] === 0) freeSpaces.push([row, col]);
            }
        }
        let n = freeSpaces.length;
        return freeSpaces[Math.floor(Math.random() * n)];
    } else {
        for (const key of map.keys()) {
            let [x, y] = key.split(',').map(Number);
            let points = 0;
            for (const [dx, dy] of drs) {
                let x1 = x + dx;
                let y1 = y + dy;
                if (x1 >= 0 && x1 < 6 && y1 >= 0 && y1 < 7 && visitedArr2D[x1][y1] !== 0) {
                    let x3 = x + 3 * dx;
                    let y3 = y + 3 * dy;
                    let x2 = x + 2 * dx;
                    let y2 = y + 2 * dy;
                    if (visitedArr2D[x1][y1] === 2) { //yellow
                        if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr2D[x3][y3] === 2) {
                            if (visitedArr2D[x2][y2] === 2) points += 5000;
                        } else if (x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr2D[x2][y2] === 2) {
                            if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr2D[x3][y3] === 0 && x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr2D[x-dx][y-dy] === 0) points += 1600;
                            else points += 500;
                        } else if (x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr2D[x-dx][y-dy] === 2 && x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr2D[x2][y2] === 0 && x - 2*dx >= 0 && x - 2*dx < 6 && y - 2*dy >= 0 && y - 2*dy < 7 && visitedArr2D[x-2*dx][y-2*dy] === 0) {
                            points += 800;
                        } else points += 200;
                    } else { //for red
                        if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr2D[x3][y3] === 1) {
                            if (visitedArr2D[x2][y2] === 1) points += 3000;
                        } else if (x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr2D[x2][y2] === 1) {
                            if (x3 >= 0 && x3 < 6 && y3 >= 0 && y3 < 7 && visitedArr2D[x3][y3] === 0 && x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr2D[x-dx][y-dy] === 0) points += 1400;
                            else points += 400;
                        } else if (x - dx >= 0 && x - dx < 6 && y - dy >= 0 && y - dy < 7 && visitedArr2D[x-dx][y-dy] === 1 && x2 >= 0 && x2 < 6 && y2 >= 0 && y2 < 7 && visitedArr2D[x2][y2] === 0 && x - 2*dx >= 0 && x - 2*dx < 6 && y - 2*dy >= 0 && y - 2*dy < 7 && visitedArr2D[x-2*dx][y-2*dy] === 0) {
                            points += 700;
                        } else points += 100;
                    }
                }
            }
            map.set(key, points);
        }
        let maxKey = null;
        let maxValue = -Infinity;
        for (const [key, value] of map.entries()) {
            if (value > maxValue) {
                maxValue = value;
                maxKey = key;
            }
        }
        let choice = maxKey.split(',').map(Number);
        if (maxValue < 1400) {
            //computer will now analyse all possible moves in freeSpaces.
            //for each possible square in freeSpaces, the computer assumes that both players play as per the given rule
            //and then assigns a value to each square as +100/n or -100/n where n is no. of moves played to win or lose.
            //square with higher value would be chosen (i.e., win quickly or lose slowly)
            let mapFuture = new Map();
            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 7; col++) {
                    if (visitedArr2D[row][col] === 0) {
                        let key = `${row},${col}`;
                        let visitedArr2Dcopy = JSON.parse(JSON.stringify(visitedArr2D));
                        visitedArr2Dcopy[row][col] = 2;
                        let pos1copy = JSON.parse(JSON.stringify(pos1));
                        let pos2copy = JSON.parse(JSON.stringify(pos2));
                        pos2copy.push([row, col]);
                        let wrapper = { numMoves: 1 };
                        try {
                            numMovesToStop(pos1copy, pos2copy, visitedArr2Dcopy, wrapper); //return positive value if computer wins and negative value otherwise
                            mapFuture.set(key, 100 / wrapper.numMoves);
                        } catch (error) {
                            mapFuture.set(key, 0);
                        }
                    }
                }
            }
            let maxKeyOpt = null;
            let maxValOpt = -Infinity;
            for (const [key, value] of mapFuture.entries()) {
                if (value > maxValOpt) {
                    maxValOpt = value;
                    maxKeyOpt = key;
                }
            }
            let choice_opt = maxKeyOpt.split(',').map(Number);
            return choice_opt;
        }
        else {
            return choice;
        }
    }
};



let wrapper = document.querySelector('.wrapper');
let p1 = document.querySelectorAll('.text')[0];
let p2 = document.querySelectorAll('.text')[1];
let check = true;
let count = 0;

wrapper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('wrapper') && check) {
        if (!(event.target.classList.contains('red') || event.target.classList.contains('yellow'))) {
            //player 1's turn
            event.target.classList.add('red');
            let id = Number(event.target.id.slice(1)) - 1;
            let x = Math.floor(id / 7);
            let y = id % 7;
            pos1.push([x, y]);
            visitedArr2D[x][y] = 1;
            if (checkWinner(visitedArr2D) === 1) {
                p1.textContent = 'You WIN';
                check = false;
                alert('Congrats! You Win. Wanna try again?');
            }
            else { //engine's turn
                let choice = returnFeasibleIndex(pos1, pos2, visitedArr2D);
                pos2.push(choice);
                let id = choice[0] * 7 + choice[1];
                holes[id].classList.add('yellow');
                visitedArr2D[choice[0]][choice[1]] = 2;
                if (checkWinner(visitedArr2D) === 2) {
                    check = false;
                    p1.textContent = 'You LOSE';
                    alert('You Lost. Try again!')
                }
                count += 2;
                if (count === 42) {
                    p2.style.display = 'block';
                    p1.textContent = 'DRAW';
                    p2.textContent = 'DRAW';
                    alert('Match is drawn. Click on reload button to play again.')
                }
            }
            
        }
    }
});
