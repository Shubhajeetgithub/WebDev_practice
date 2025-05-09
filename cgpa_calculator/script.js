function changeElement(event) {
    if (event.target.nodeName === 'DIV') {
        let sub_element = event.target.querySelector('.sub_category');
        if (sub_element) {
            sub_element.style.display = 
                sub_element.style.display === 'none' ? 'block' : 'none';
        }
    }
}

const list = document.querySelector('ol');
list.addEventListener('click', changeElement);

const gradeMap = {
    'EX': 10,
    'A': 9,
    'B': 8,
    'C': 7,
    'D': 6,
    'P': 5,
    'F': 0
};
const creditMap = {
    0: 4, //LANCA
    1: 4, //EC
    2: 4, //ET
    3: 4, //DS
    4: 2, //SPL
    5: 2, //EC Lab
    6: 1 //EAA
};

const options = document.querySelectorAll('.drop_down');
for (const option of options){
    option.addEventListener('click', () => {
        let credits = 0;
        let sum = 0;
        const grades = document.querySelectorAll('.drop_down');
        for (let index = 0; index < 7; index++) {
            let grade = grades[index].value;
            if (grade in gradeMap) {
                credits += creditMap[index];
                sum += (creditMap[index] * gradeMap[grade]);
            }
        }
    
        let sgpa = (credits === 0) ? 0 : Math.round(sum * 100 / credits) / 100;
        let sgpa_element = document.getElementById('sgpa_val');
        sgpa_element.textContent = sgpa;
    });
}