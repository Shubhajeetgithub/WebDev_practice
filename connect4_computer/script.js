let holes = document.getElementsByClassName('hole');
function checkWinner(holes) {
    //checking for red (1)
    //checking horizontally
    for (let row = 0; row < 6; row++) {
        let count = 0;
        for (let col = 0; col < 7; col++) {
            let index = row * 7 + col;
            if (holes[index].classList.contains('red')) {
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
            let index = row * 7 + col;
            if (holes[index].classList.contains('red')) {
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
                let index = 7 * (row + i) + (col + i);
                if (holes[index].classList.contains('red')) {
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
                let index = 7 * (row + i) + (col - i);
                if (holes[index].classList.contains('red')) {
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
            let index = row * 7 + col;
            if (holes[index].classList.contains('yellow')) {
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
            let index = row * 7 + col;
            if (holes[index].classList.contains('yellow')) {
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
                let index = 7 * (row + i) + (col + i);
                if (holes[index].classList.contains('yellow')) {
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
                let index = 7 * (row + i) + (col - i);
                if (holes[index].classList.contains('yellow')) {
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
function returnFeasibleIndex() {
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
        return choice;
    }
}



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
            if (checkWinner(holes) === 1) {
                p1.textContent = 'You WIN';
                check = false;
                alert('Player 1 wins. Click on reload button to play again.');
            }
            else { //engine's turn
                let choice = returnFeasibleIndex();
                pos2.push(choice);
                let id = choice[0] * 7 + choice[1];
                holes[id].classList.add('yellow');
                visitedArr2D[choice[0]][choice[1]] = 2;

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