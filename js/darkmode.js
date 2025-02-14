// Select the toggle button
const toggleButton = document.getElementById('dark-mode-toggle');

// Function to switch to dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.header.classList.add('dark-mode');
    document.footer.classList.add('dark-mode');
    document.main.classList.add('dark-mode');
    document.nav.classList.add('dark-mode');

    localStorage.setItem('darkMode', 'enabled');
}

// Function to switch to light mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
}

// Check the user's preference from localStorage
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    enableDarkMode();
}

// Add event listener to the toggle button
toggleButton.addEventListener('click', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});