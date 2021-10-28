function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function keepTheme() {
    let theme = localStorage.getItem('theme');
    if (theme) {
        if (theme === 'theme-dark') {
            setTheme('theme-dark');
        } else if (theme === 'theme-light') {
            setTheme('theme-light')
        }
    } else {
        setTheme('theme-light')
    }
}

module.exports = {
    setTheme,
    keepTheme
}