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



let wrapper = document.querySelector('.wrapper');
let p1 = document.querySelectorAll('.text')[0];
let p2 = document.querySelectorAll('.text')[1];
let check = true;
let count = 0;
wrapper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('wrapper') && check) {
        if (!(event.target.classList.contains('red') || event.target.classList.contains('yellow'))) {
            if (p1.style.display === 'block') {
                event.target.classList.add('red');
                if (checkWinner(holes) === 1) {
                    p1.textContent = 'You WIN';
                    check = false;
                    alert('Player 1 wins. Click on reload button to play again.');
                }
                else {
                    p1.style.display = 'none';
                    p2.style.display = 'block';
                    count++;
                    if (count === 42) {
                        p1.style.display = 'block';
                        p1.textContent = 'DRAW';
                        p2.textContent = 'DRAW';
                        alert('Match is drawn. Click on reload button to play again.')
                    }
                }
            }
            else {
                event.target.classList.add('yellow');
                if (checkWinner(holes) === 2) {
                    p2.textContent = 'You WIN';
                    check = false;
                    alert('Player 2 wins. Click on reload button to play again.');
                }
                else {
                    p2.style.display = 'none';
                    p1.style.display = 'block';
                    count++;
                    if (count === 42) {
                        p2.style.display = 'block';
                        p1.textContent = 'DRAW';
                        p2.textContent = 'DRAW';
                        alert('Match is drawn. Click on reload button to play again.')
                    }
                }
                
                
            }
        }
    }
});
