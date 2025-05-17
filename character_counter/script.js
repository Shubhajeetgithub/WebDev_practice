let input = document.querySelector('textarea');
input.addEventListener('keyup', () => {
    let input_text = document.querySelector('textarea').value;
    let hashArray = Array(26).fill(0);
    let char_count = 0;
    for (let i = 0; i < input_text.length; i++) {
        let lower = input_text[i].toLowerCase();
        let index = lower.charCodeAt(0) - 'a'.charCodeAt(0);
        if (index >= 0 && index < 26 ) {
            hashArray[index]++;
            char_count++;
        }
    }
    let indices = hashArray.map((val, idx) => idx);
    indices.sort((a, b) => hashArray[b] - hashArray[a]);
    let top5indices = indices.slice(0, 5);
    let words = input_text.split(/[ ,!?.:;\n]+/);
    let word_count = words.filter(word => word.length > 0).length;
    let sentences = input_text.split(/[!?.]+/);
    let sentence_count = sentences.filter(sentence => sentence.length > 0).length;
    document.querySelector('.character-count .number').textContent = char_count;
    document.querySelector('.word-count .number').textContent = word_count;
    document.querySelector('.sentence-count .number').textContent = sentence_count;
    let letters = document.querySelectorAll('.letter');
    let percents = document.querySelectorAll('.percent');
    let blue_bars = document.querySelectorAll('.blue_bar');
    for (let i = 0; i < 5; i++) {
        letters[i].textContent = String.fromCharCode(top5indices[i] + 97);
        percents[i].textContent = Math.round(hashArray[top5indices[i]] * 100/ char_count) + '%';
        blue_bars[i].style.width = `${Math.round(hashArray[top5indices[i]] * 100/ char_count)}%`;
    }
});

