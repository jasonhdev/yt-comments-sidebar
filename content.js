let isCommentsActive = false;

function toggleComments() {
  const comments = document.getElementById('comments');
  if (!comments) {
    console.warn('Comments section not found.');
    return;
  }

  isCommentsActive = !isCommentsActive;

  if (isCommentsActive) {
    document.body.style.overflow = 'hidden';
    comments.classList.add('active');

    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);
  } else {
    comments.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('click', handleOutsideClick);
  }
}

function handleOutsideClick(event) {
  const comments = document.getElementById('comments');
  const videoElement = document.querySelector('video');

  if (videoElement && videoElement.contains(event.target)) {
    return;
  }

  if (!comments.contains(event.target)) {
    document.removeEventListener('click', handleOutsideClick);
    toggleComments();
  }
}

function addCommentsButton() {
  const targetElement = document.querySelector('div#title');

  if (!targetElement)
    return false;

  if (document.getElementById('openCommentsBtn'))
    return true;

  const button = document.createElement('button');

  const icon = document.createElement('img');
  icon.src = chrome.runtime.getURL('buttonIcon.png');
  icon.alt = 'Comments';

  button.appendChild(icon);
  button.id = "openCommentsBtn";

  button.addEventListener('click', () => {
    toggleComments();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  targetElement.prepend(button);
}

window.addEventListener('load', () => {
  const interval = setInterval(() => {
    const success = addCommentsButton();
    if (success) {
      clearInterval(interval);
    }
  }, 1000);
});