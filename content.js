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
  const targetElement = document.querySelector('div#description');

  if (!targetElement) return;

  if (document.getElementById('openCommentsBtn'))
    return;

  const button = document.createElement('button');
  button.innerText = 'Comments';
  button.id = "openCommentsBtn"

  button.addEventListener('click', () => {
    toggleComments();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  targetElement.prepend(button);
}

// Run when page fully loads
window.addEventListener('load', () => {
  setTimeout(() => {
    addCommentsButton();
  }, 2000);
});