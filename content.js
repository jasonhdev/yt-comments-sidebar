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
      document.addEventListener('dblclick', handleExpandCommentsWhenHovered);
    }, 0);

  } else {
    comments.classList.remove('active');
    comments.classList.remove('active-expand');
    document.body.style.overflow = '';
    document.removeEventListener('click', handleOutsideClick);
  }
}

function handleOutsideClick(event) {
  const comments = document.getElementById('comments');
  const youtubePlayer = document.querySelector('.html5-video-player');

  if (youtubePlayer && youtubePlayer.contains(event.target)) {
    return;
  }

  if (!comments.contains(event.target)) {
    document.removeEventListener('click', handleOutsideClick);
    toggleComments();
  }
}

function handleExpandCommentsWhenHovered() {
  const comments = document.getElementById('comments');
  comments.classList.toggle('active-expand');
}

function addCommentsButton() {
  const targetElement = document.querySelector('div#above-the-fold div#title');

  if (!targetElement) {
    return false;
  }

  if (document.getElementById('openCommentsBtn')) {
    return true;
  }


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