document.addEventListener("DOMContentLoaded", function() {
    // Элементы управления
    const filePathInput = document.getElementById('file-path');
    const gravityInput = document.getElementById('gravity');
    const uiThemeSelect = document.getElementById('ui-theme');
    const languageSelect = document.getElementById('language');

    // Объект с переводами для каждого языка
    const translations = {
        ru: {
            'file-path': "Путь к файлам:",
            gravity: "Гравитация:",
            'ui-theme': "Тема интерфейса:",
            language: "Язык:"
        },
        en: {
            'file-path': "File Path:",
            gravity: "Gravity:",
            'ui-theme': "UI Theme:",
            language: "Language:"
        },
        uk: {
            'file-path': "Шлях до файлів:",
            gravity: "Гравітація:",
            'ui-theme': "Тема інтерфейсу:",
            language: "Мова:"
        },
        kz: {
            'file-path': "Файлға жол:",
            gravity: "Гравитация:",
            'ui-theme': "Интерфейс тақырыбы:",
            language: "Тіл:"
        },
        by: {
            'file-path': "Шлях да файлаў:",
            gravity: "Гравітацыя:",
            'ui-theme': "Тэма інтэрфейсу:",
            language: "Мова:"
        },
        pl: {
            'file-path': "Ścieżka do plików:",
            gravity: "Grawitacja:",
            'ui-theme': "Motyw interfejsu:",
            language: "Język:"
        },
        'pt-br': {
            'file-path': "Caminho dos arquivos:",
            gravity: "Gravidade:",
            'ui-theme': "Tema de interface:",
            language: "Idioma:"
        },
        ko: {
            'file-path': "파일 경로:",
            gravity: "중력:",
            'ui-theme': "UI 테마:",
            language: "언어:"
        },
        zh: {
            'file-path': "文件路径:",
            gravity: "重力:",
            'ui-theme': "界面主题:",
            language: "语言:"
        },
        de: {
            'file-path': "Dateipfad:",
            gravity: "Gravitation:",
            'ui-theme': "Oberflächenthema:",
            language: "Sprache:"
        }
    };

    // Функция для установки перевода
    function applyTranslations(language) {
        const labels = document.querySelectorAll('label');
        const selectedTranslations = translations[language] || translations['ru']; // По умолчанию русский

        labels.forEach((label) => {
            const forAttr = label.getAttribute('for');
            label.textContent = selectedTranslations[forAttr];
        });
    }

    // Функция для установки сохраненных настроек
    function loadSettings() {
        const savedFilePath = localStorage.getItem('filePath');
        const savedGravity = localStorage.getItem('gravity');
        const savedTheme = localStorage.getItem('uiTheme') || 'dark'; // Темная тема по умолчанию
        const savedLanguage = localStorage.getItem('language') || 'ru'; // Русский язык по умолчанию

        if (savedFilePath) filePathInput.value = savedFilePath;
        if (savedGravity) gravityInput.value = savedGravity;
        
        uiThemeSelect.value = savedTheme;
        setTheme(savedTheme);
        
        languageSelect.value = savedLanguage;
        applyTranslations(savedLanguage);
    }

    // Функция для сохранения настроек
    function saveSettings() {
        localStorage.setItem('filePath', filePathInput.value);
        localStorage.setItem('gravity', gravityInput.value);
        localStorage.setItem('uiTheme', uiThemeSelect.value);
        localStorage.setItem('language', languageSelect.value);
    }

    // Функция для изменения темы интерфейса
    function setTheme(theme) {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
    }

    // Обработчики событий для сохранения настроек при изменении
    filePathInput.addEventListener('input', saveSettings);
    gravityInput.addEventListener('input', saveSettings);
    uiThemeSelect.addEventListener('change', function() {
        saveSettings();
        setTheme(uiThemeSelect.value);
    });
    languageSelect.addEventListener('change', function() {
        saveSettings();
        applyTranslations(languageSelect.value);
    });

    // Загрузка сохраненных настроек при загрузке страницы
    loadSettings();
});
