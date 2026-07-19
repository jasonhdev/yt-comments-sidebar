let isCommentsDocked = false;
let dockPosition = "right";
let alwaysExpandOnHover = false;

function toggleComments() {
  const comments = document.getElementById('comments');
  if (!comments) {
    console.warn('Comments section not found.');
    return;
  }

  isCommentsDocked = !isCommentsDocked;

  if (isCommentsDocked) {
    document.body.style.overflow = 'hidden';
    comments.classList.add(
      'docked',
      `docked-${dockPosition}`,
      ...(alwaysExpandOnHover ? ['docked-expand'] : [])
    );

    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('dblclick', handleExpandCommentsWhenHovered);
    }, 0);

  } else {
    comments.classList.add(`slide-out-${dockPosition}`);

    setTimeout(() => {
      comments.classList.remove('docked', 'docked-expand', 'docked-right', 'docked-left', 'slide-out-left', 'slide-out-right');
    }, 200);

    document.body.style.overflow = '';
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('dblclick', handleExpandCommentsWhenHovered);
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
  comments.classList.toggle('docked-expand');
}

function addCommentsButton() {
  const targetElement = document.querySelector('#title.ytd-watch-metadata');

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

chrome.storage.sync.get(['dockPosition', 'alwaysExpandOnHover'], (result) => {
  dockPosition = result.dockPosition || 'right';
  alwaysExpandOnHover = result.alwaysExpandOnHover ?? false;
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    if ('dockPosition' in changes) {
      const newDockPosition = changes.dockPosition.newValue;
      dockPosition = newDockPosition || 'right';
    }
    if ('alwaysExpandOnHover' in changes) {
      const newAlwaysExpandOnHover = changes.alwaysExpandOnHover.newValue;
      alwaysExpandOnHover = newAlwaysExpandOnHover ?? false;
    }
  }
});

window.addEventListener('load', () => {
  const interval = setInterval(() => {
    const success = addCommentsButton();
    if (success) {
      clearInterval(interval);
    }
  }, 1000);
});