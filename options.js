document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings on page load
    chrome.storage.sync.get(['dockPosition', 'alwaysExpandOnHover'], (result) => {
        document.getElementById('dockPosition').value = result.dockPosition || 'right';
        document.getElementById('alwaysExpandOnHover').checked = result.alwaysExpandOnHover || false;
    });

    document.getElementById('save').addEventListener('click', () => {
        const dockPosition = document.getElementById('dockPosition').value;
        const alwaysExpandOnHover = document.getElementById('alwaysExpandOnHover').checked;

        chrome.storage.sync.set({ dockPosition, alwaysExpandOnHover }, () => {
            const status = document.getElementById('status');
            status.textContent = 'Settings saved.';
            setTimeout(() => { status.textContent = ''; }, 1500);
        });
    });
});
