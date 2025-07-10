let isCommentsRight = false;

function toggleComments() {
  const comments = document.getElementById('comments');
  if (!comments) {
    console.warn('Comments section not found.');
    return;
  }

  isCommentsRight = !isCommentsRight;

  if (isCommentsRight) {
    comments.style.cssText = `
      position: fixed;
      right: 0;
      width: 20% !important;
      min-width: 250px;
      max-width: 500px;
      height: 100vh;
      overflow-y: auto;
      z-index: 1000;
      padding: 10px;
      top: 0;
      background: white;
      margin-top: 50px;
      border: .5px black solid;
      transition: width 0.5s ease;
    `;

    if (!document.getElementById("comments-close-btn")) {
      const closeButton = document.createElement("button");
      closeButton.id = "comments-close-btn";
      closeButton.innerText = "✕";
      closeButton.style.position = "fixed";
      closeButton.style.top = "60px";
      closeButton.style.right = "10px";
      closeButton.style.zIndex = "1001";
      closeButton.style.background = "black";
      closeButton.style.color = "white";
      closeButton.style.border = "none";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "30px";
      closeButton.style.height = "30px";
      closeButton.style.cursor = "pointer";
      closeButton.style.fontSize = "16px";
      closeButton.style.lineHeight = "30px";
      closeButton.style.textAlign = "center";

      closeButton.addEventListener("click", () => {
        closeButton.remove();
        toggleComments();
      });

      document.body.appendChild(closeButton);
    }

    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 0);

    let shrinkTimeout;
    comments.addEventListener('mouseenter', () => {
      clearTimeout(shrinkTimeout);
      comments.style.width = '50%';
    });

    comments.addEventListener('mouseleave', () => {
      shrinkTimeout = setTimeout(() => {
        comments.style.width = '20%';
      }, 200);
    });

  } else {
    comments.style.cssText = '';
  }
}

function handleOutsideClick(event) {
  const comments = document.getElementById('comments');
  const closeButton = document.getElementById('comments-close-btn');

  if (!comments.contains(event.target) && event.target !== closeButton) {
    document.removeEventListener('click', handleOutsideClick);
    toggleComments();
  }
}

function addCommentsButton() {
  const targetElement = document.querySelector('div#description');

  if (!targetElement) return;

  if (document.getElementById('my-comments-button'))
    return;

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

function resetComments() {
  const comments = document.getElementById('comments');
  if (comments) {
    comments.style.cssText = '';
  }

  const closeButton = document.getElementById('comments-close-btn');
  if (closeButton) closeButton.remove();
}

// // Re-run when navigating between YouTube videos
// let lastUrl = location.href;
// new MutationObserver(() => {
//   if (location.href !== lastUrl) {
//     lastUrl = location.href;
//     resetComments();
//     isCommentsRight = false;
//   }
// }).observe(document, { subtree: true, childList: true });