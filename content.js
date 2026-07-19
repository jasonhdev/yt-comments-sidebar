let isCommentsDocked = false;
let dockPosition = "right";
let alwaysExpandOnHover = false;
let showScrollToTop = true;

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

  targetElement.appendChild(button);
}

chrome.storage.sync.get(['dockPosition', 'alwaysExpandOnHover', 'showScrollToTop'], (result) => {
  dockPosition = result.dockPosition || 'right';
  alwaysExpandOnHover = result.alwaysExpandOnHover ?? false;
  showScrollToTop = result.showScrollToTop ?? true;
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

    if ('showScrollToTop' in changes) {
      const newShowScrollToTop = changes.showScrollToTop.newValue;
      showScrollToTop = newShowScrollToTop ?? true;
    }
  }
});

function createScrollToTopButton() {
  if (showScrollToTop === false) {
    return;
  }

  const scrollToTopBtn = document.createElement('button');

  scrollToTopBtn.textContent = '↑';
  scrollToTopBtn.className = 'yt-scroll-top';
  scrollToTopBtn.style.display = 'none';

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.body.appendChild(scrollToTopBtn);

  // Watch for the comments section and toggle button visibility
  const toggleVisibility = () => {
    const commentsSection = document.querySelector('#comments');
    if (!commentsSection) {
      scrollToTopBtn.style.display = 'none';
      return;
    }

    const rect = commentsSection.getBoundingClientRect();
    // Show button once the top of the comments section has scrolled above the viewport
    const isCommentsVisible = rect.top <= window.innerHeight;

    scrollToTopBtn.style.display = isCommentsVisible ? 'block' : 'none';
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  // In case comments load dynamically after page load (YouTube is SPA-like),
  // re-check periodically or use a MutationObserver
  const observer = new MutationObserver(toggleVisibility);
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial check
  toggleVisibility();
}

window.addEventListener('load', () => {
  const interval = setInterval(() => {
    const success = addCommentsButton();
    if (success) {
      clearInterval(interval);
    }
  }, 1000);

  createScrollToTopButton();
});