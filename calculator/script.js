
const eraser = document.getElementById('erase');
eraser.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num.length === 1) {
        output.innerText = "0";
    } else {
        output.innerText = num.slice(0, -1);
    }
});
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const zero = document.getElementById('zero');
const ac = document.getElementById('ac');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const dot = document.getElementById('dot');
const opening = document.getElementById('opening');
const closing = document.getElementById('closing');
seven.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "7";
    } else {
        output.innerText += "7";
    }
});
eight.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "8";
    } else {
        output.innerText += "8";
    }
});
nine.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "9";
    } else {
        output.innerText += "9";
    }
});
four.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "4";
    } else {
        output.innerText += "4";
    }
});
five.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "5";
    } else {
        output.innerText += "5";
    }
});
six.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "6";
    } else {
        output.innerText += "6";
    }
});
one.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "1";
    } else {
        output.innerText += "1";
    }
});
two.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "2";
    } else {
        output.innerText += "2";
    }
});
three.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "3";
    } else {
        output.innerText += "3";
    }
});
zero.addEventListener('click', () => {
    let output = document.getElementById('output');
    let num = output.innerText;
    if (num === "0") {
        output.innerText = "0";
    } else {
        output.innerText += "0";
    }
});
ac.addEventListener('click', () => {
    let output = document.getElementById('output');
    output.innerText = "0";
});
plus.addEventListener('click', () => {
    let output = document.getElementById('output');
    let text = output.innerText;
    let c = text[text.length - 1];
    if (c === '+' || c === '-' || c === '*' || c === '/') output.innerText = text.slice(0, -1) + '+';
    else output.innerText += '+';
});
minus.addEventListener('click', () => {
    let output = document.getElementById('output');
    let text = output.innerText;
    let c = text[text.length - 1];
    if (c === '+' || c === '-' || c === '*' || c === '/') output.innerText = text.slice(0, -1) + '-';
    else output.innerText += '-';
});
multiply.addEventListener('click', () => {
    let output = document.getElementById('output');
    let text = output.innerText;
    let c = text[text.length - 1];
    if (c === '+' || c === '-' || c === '*' || c === '/') output.innerText = text.slice(0, -1) + '*';
    else output.innerText += '*';
});
divide.addEventListener('click', () => {
    let output = document.getElementById('output');
    let text = output.innerText;
    let c = text[text.length - 1];
    if (c === '+' || c === '-' || c === '*' || c === '/') output.innerText = text.slice(0, -1) + '/';
    else output.innerText += '/';
});
dot.addEventListener('click', () => {
    let output = document.getElementById('output');
    output.innerText += ".";
});
opening.addEventListener('click', () => {
    let output = document.getElementById('output');
    if (output.innerText === "0") output.innerText = "(";
    else output.innerText += "(";
});
closing.addEventListener('click', () => {
    let output = document.getElementById('output');
    output.innerText += ")";
});

let isBalancedParentheses = (str) => {
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            stack.push('(');
        } else if (str[i] === ')') {
            if (stack.length === 0 || stack[stack.length - 1] !== '(') return false;
            stack.pop();
        }
    }
    if (stack.length === 0) return true;
    else return false;
};

function splitStringToTokens(str) {
    return str.split(/([+\-*/()])/).filter(part => part !== "");
}

const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
};

let convertToRPN = (tokens) => {
    //return an array of strings(tokens)
    let i = 0;
    let stack = [];
    let postfix = [];
    while (i < tokens.length) {
		switch (tokens[i]) {
			case '(':
				stack.push(tokens[i]);
				break;
			case ')':
				while (1) {
					let c = stack.pop();
					if (c === '(') {
						break;
					}
					else {
						postfix.push(c);
					}
				}
				break;
			case '+':
			case '-':
			case '*':
			case '/':
				if (stack.length === 0) stack.push(tokens[i]);
				else {
					if (stack[stack.length - 1] === '(') stack.push(tokens[i]);
					else {
						if (precedence[tokens[i]] > precedence[stack[stack.length - 1]]) stack.push(tokens[i]);
						else {
							while (precedence[tokens[i]] <= precedence[stack[stack.length - 1]] && (stack.length !== 0 && stack[stack.length - 1] !== '('))
								postfix.push(stack.pop());
							stack.push(tokens[i]);
						}
					}
				}
				break;
			default:
				postfix.push(tokens[i]);
		}
		i++;
	}
	while (stack.length !== 0) {
		postfix.push(stack.pop());
	}
	return postfix;
};

function evalRPN(tokens) {
    let resultStack = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === "+") {
        const num2 = resultStack.pop();
        const num1 = resultStack.pop();
        resultStack.push(num1 + num2);
      } else if (token === "-") {
        const num2 = resultStack.pop();
        const num1 = resultStack.pop();
        resultStack.push(num1 - num2);
      } else if (token === "*") {
        const num2 = resultStack.pop();
        const num1 = resultStack.pop();
        resultStack.push(num1 * num2);
      } else if (token === "/") {
        const num2 = resultStack.pop();
        const num1 = resultStack.pop();
        resultStack.push(num1 / num2);
      } else {
        const num = parseFloat(token);
        if (!isNaN(num)) {
          resultStack.push(num);
        } else {
          console.error("Invalid input:", token);
          return NaN;
        }
      }
    }
    return resultStack[resultStack.length - 1];
};

const equal = document.getElementById('equal');
equal.addEventListener('click', () => {
    let str = document.getElementById('output').innerText;
    let answer = document.getElementById('answer');
    if (!isBalancedParentheses(str)) answer.innerText = 'Invalid input';
    else {
        let tokens = splitStringToTokens(str);
        let rpn = convertToRPN(tokens);
        let result = evalRPN(rpn);
        if (!isNaN(result)) {
            answer.innerText = parseFloat(result.toFixed(5));
        } else {
            answer.innerText = 'Invalid input';
        }
    }
});