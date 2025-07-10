function addCommentsButton() {
  // const targetElement = document.querySelector('.yt-chip-cloud-renderer');
  const targetElement = document.querySelector('div#description');

  const button = document.createElement('button');
  button.id = 'my-comments-button';
  button.innerText = 'Comments';
  button.style.margin = '10px';
  button.style.padding = '8px 12px';
  button.style.backgroundColor = '#ff0000';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.style.zIndex = '1000';
  button.style.float = 'right';
  button.style.position = 'relative';

  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggle-comments' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (targetElement != null) {
    targetElement.prepend(button);
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    addCommentsButton();
  }, 2000);
});