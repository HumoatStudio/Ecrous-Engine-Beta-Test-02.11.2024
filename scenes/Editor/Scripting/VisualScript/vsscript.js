let x = 0; // Initialize x with a default value
let score = 0; // Variable to hold the score
const outputElement = document.getElementById('output');

// Function to allow dropping of blocks
function allowDrop(event) {
    event.preventDefault();
}

// Function to initiate drag of blocks
function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.code);
}

// Function to drop the dragged block into the workspace
function drop(event) {
    event.preventDefault();
    const code = event.dataTransfer.getData("text/plain");
    createCodeBlock(code);
}

// Function to create a new code block in the workspace
function createCodeBlock(code) {
    const workspace = document.getElementById('workspace');
    const codeBlock = document.createElement('div');
    codeBlock.className = 'code-block';
    codeBlock.innerHTML = `
        <span class="code-text">${code}</span> 
        <button class="edit-button" onclick="editBlock(this.parentNode)">📝 Редактировать</button>
        <button class="delete-button" onclick="deleteBlock(this.parentNode)">🗑 Удалить</button>
    `;
    workspace.appendChild(codeBlock);
}

// Function to execute the code represented by the blocks
document.getElementById('runButton').addEventListener('click', function() {
    outputElement.textContent = ''; // Clear previous output
    const codeBlocks = document.querySelectorAll('.code-block .code-text');
    codeBlocks.forEach(block => {
        executeCode(block.textContent);
    });
});

// Function to delete a code block
function deleteBlock(codeBlock) {
    codeBlock.remove();
}

// Function to edit a code block
function editBlock(codeBlock) {
    const currentCode = codeBlock.querySelector('.code-text').textContent;
    const newCode = prompt('Редактировать код:', currentCode);
    if (newCode) {
        codeBlock.querySelector('.code-text').textContent = newCode;
    }
}

// Function to output messages to the output area
function output(message) {
    outputElement.textContent += message + '\n';
}

// Function to execute the code with various commands
function executeCode(code) {
    try {
        if (code.startsWith("output('")) {
            const message = code.slice(8, -2);
            output(message);
        } else if (code.startsWith("Вывести x")) {
            output(`x: ${x !== undefined ? x : 'не установлено'}`);
        } else if (code.startsWith("Установить x на")) {
            x = parseInt(code.split('на ')[1]); // Set x to the specified value
        } else if (code.startsWith("Если x > 0")) {
            if (x > 0) {
                output('Положительное');
            }
        } else if (code.startsWith("Повторить")) {
            const times = parseInt(code.split(' ')[1]);
            for (let i = 0; i < times; i++) {
                output('Повторить');
            }
        } else if (code.startsWith("Подождать")) {
            output('Подождать 1 секунду');
        } else if (code.startsWith("Установить цвет на")) {
            const color = code.split('на ')[1];
            output(`Цвет установлен на ${color}`);
        } else if (code.startsWith("Увеличить размер на")) {
            const size = parseInt(code.split('на ')[1]);
            output(`Размер увеличен на ${size}`);
        } else if (code.startsWith("Двигаться на")) {
            const steps = parseInt(code.split('на ')[1]);
            output(`Двигаться на ${steps} шагов`);
        } else if (code.startsWith("Повернуть на")) {
            const degrees = parseInt(code.split('на ')[1]);
            output(`Повернуть на ${degrees} градусов`);
        } else if (code.startsWith("Если касаюсь края")) {
            output('Касаюсь края, отскок!');
        } else if (code.startsWith("Спросить имя")) {
            const name = prompt('Как тебя зовут?');
            output(`Имя: ${name}`);
        } else if (code.startsWith("Установить счет на")) {
            score = 0; // Reset score
            output('Счет установлен на 0');
        } else if (code.startsWith("Увеличить счет на 1")) {
            score += 1; // Increase score
            output(`Счет увеличен на 1. Текущий счет: ${score}`);
        } else if (code.startsWith("Сбросить")) {
            score = 0; // Reset score
            output('Счет сброшен');
        }
    } catch (error) {
        output(`Ошибка выполнения: ${error.message}`);
    }
}
