document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings on page load
    chrome.storage.sync.get(['dockPosition', 'alwaysExpandOnHover', 'showScrollToTop'], (result) => {
        document.getElementById('dockPosition').value = result.dockPosition || 'right';
        document.getElementById('alwaysExpandOnHover').checked = result.alwaysExpandOnHover || false;
        document.getElementById('showScrollToTop').checked = result.showScrollToTop || true;
    });

    document.getElementById('save').addEventListener('click', () => {
        const dockPosition = document.getElementById('dockPosition').value;
        const alwaysExpandOnHover = document.getElementById('alwaysExpandOnHover').checked;
        const showScrollToTop = document.getElementById('showScrollToTop').checked;

        chrome.storage.sync.set({ dockPosition, alwaysExpandOnHover, showScrollToTop }, () => {
            const status = document.getElementById('status');
            status.textContent = 'Settings saved.';
            setTimeout(() => { status.textContent = ''; }, 1500);
        });
    });
});
