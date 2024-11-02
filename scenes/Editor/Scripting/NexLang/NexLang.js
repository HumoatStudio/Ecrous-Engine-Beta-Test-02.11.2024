document.addEventListener("DOMContentLoaded", () => {
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.textContent = "Initial console message...\nWelcome to NexLang IDE!";
});

document.getElementById("runButton").addEventListener("click", async () => {
    const code = document.getElementById("codeEditor").value;

    // Инициализация Pyodide
    const pyodide = await loadPyodide();

    // Очищаем предыдущий вывод консоли
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.textContent = '';

    // Переопределение вывода в консоль на странице
    function printToConsole(text) {
        consoleOutput.textContent += text + '\n';
        // Прокрутка к нижней части
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Запуск кода в Pyodide
    await pyodide.runPythonAsync(`
        import sys
        from js import printToConsole

        class ConsoleWriter:
            def write(self, string):
                printToConsole(string)
                sys.stdout.flush()

        sys.stdout = ConsoleWriter()
        sys.stderr = ConsoleWriter()  # Перенаправляем stderr тоже

        # Ваш код здесь
        ${code}
    `);
});

// Display commands
const display = {
    contentWidth: window.innerWidth,
    contentHeight: window.innerHeight,

    newImage: function(src, x, y) {
        let img = document.createElement('img');
        img.src = src;
        img.style.position = 'absolute';
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        document.body.appendChild(img);
        return img;
    },

    newText: function(text, x, y) {
        let txt = document.createElement('div');
        txt.textContent = text;
        txt.style.position = 'absolute';
        txt.style.left = x + 'px';
        txt.style.top = y + 'px';
        txt.style.color = '#fff';
        document.body.appendChild(txt);
        return txt;
    },

    newRect: function(width, height, x, y) {
        let rect = document.createElement('div');
        rect.style.width = width + 'px';
        rect.style.height = height + 'px';
        rect.style.position = 'absolute';
        rect.style.left = x + 'px';
        rect.style.top = y + 'px';
        rect.style.backgroundColor = '#fff';
        document.body.appendChild(rect);
        return rect;
    },

    newCircle: function(radius, x, y) {
        let circle = document.createElement('div');
        circle.style.width = radius * 2 + 'px';
        circle.style.height = radius * 2 + 'px';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
        circle.style.backgroundColor = '#fff';
        document.body.appendChild(circle);
        return circle;
    },

    setDefault: function(options) {
        document.body.style.backgroundColor = options.backgroundColor || '#000';
    }
};

// Transition commands
const transition = {
    to: function(object, options) {
        Object.assign(object.style, {
            transition: `all ${options.time / 1000}s`,
            left: options.x + 'px',
            top: options.y + 'px'
        });
    },

    from: function(object, options) {
        Object.assign(object.style, {
            transition: 'none',
            left: options.x + 'px',
            top: options.y + 'px'
        });
        setTimeout(() => {
            Object.assign(object.style, {
                transition: `all ${options.time / 1000}s`
            });
        }, 0);
    },

    cancel: function(object) {
        object.style.transition = 'none';
    }
};

// Physics commands (simplified version)
const physics = {
    start: function() {
        console.log('Physics engine started');
    },

    addBody: function(object, options) {
        console.log('Physical body added to object');
        // Implement basic physics properties here or with a physics engine like Matter.js
    },

    setGravity: function(x, y) {
        console.log(`Gravity set to: (${x}, ${y})`);
    },

    stop: function() {
        console.log('Physics engine stopped');
    }
};

// Timer commands
const timer = {
    performWithDelay: function(delay, callback) {
        return setTimeout(callback, delay);
    },

    cancel: function(timerId) {
        clearTimeout(timerId);
    }
};

// Event Listeners
const eventListeners = {
    addEventListener: function(object, event, callback) {
        object.addEventListener(event, callback);
    },

    removeEventListener: function(object, event, callback) {
        object.removeEventListener(event, callback);
    }
};

// Math commands
const math = {
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    sin: function(value) {
        return Math.sin(value);
    },

    cos: function(value) {
        return Math.cos(value);
    },

    floor: function(value) {
        return Math.floor(value);
    },

    ceil: function(value) {
        return Math.ceil(value);
    }
};

// Network commands (example using fetch API)
const network = {
    request: function(url, method = 'GET', callback) {
        fetch(url, { method: method })
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error:', error));
    },

    download: function(url, fileName) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            })
            .catch(error => console.error('Error:', error));
    }
};

// Native commands (example using basic alert and text input)
const native = {
    showAlert: function(title, message) {
        alert(`${title}: ${message}`);
    },

    newTextField: function(x, y, width) {
        let input = document.createElement('input');
        input.type = 'text';
        input.style.position = 'absolute';
        input.style.left = x + 'px';
        input.style.top = y + 'px';
        input.style.width = width + 'px';
        document.body.appendChild(input);
        return input;
    },

    setKeyboardFocus: function(inputElement) {
        inputElement.focus();
    }
};

// System commands
const system = {
    getInfo: function() {
        return {
            os: navigator.platform,
            userAgent: navigator.userAgent
        };
    },

    openURL: function(url) {
        window.open(url, '_blank');
    },

    vibrate: function() {
        if (navigator.vibrate) {
            navigator.vibrate(200); // Вибрация на 200мс
        } else {
            console.log('Vibration not supported');
        }
    }
};
