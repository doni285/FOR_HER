let currentPage = 1;
const totalPages = 5;

const progressBar = document.getElementById("progressBar");

// Move between pages
function nextPage() {
  if (currentPage >= totalPages) return;

  document.getElementById(`page${currentPage}`).classList.remove("active");

  currentPage++;

  document.getElementById(`page${currentPage}`).classList.add("active");

  progressBar.style.width = `${(currentPage / totalPages) * 100}%`;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Mini-game
function answerQuiz(choice) {
  const feedback = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("quizNext");

  if (choice === 0) {
    feedback.textContent = "Correct answer... well, one of them 😂❤️";
  } else if (choice === 1) {
    feedback.textContent = "Absolutely! That's a big part of it. ♡";
  } else {
    feedback.textContent = "NOW YOU GET IT 😭❤️";
  }

  nextButton.disabled = false;
}

// Final question: YES
function sayYes() {
  const response = document.getElementById("finalResponse");

  response.classList.remove("hidden");

  response.innerHTML = `
        <h2>YOU JUST MADE ME SO HAPPY 😭❤️</h2>

        <p>
            I'm genuinely glad we're doing this.
            Here's to us, growing together,
            and everything ahead of us. ♡
        </p>
    `;

  response.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// Final question: TALK
function sayTalk() {
  const response = document.getElementById("finalResponse");

  response.classList.remove("hidden");

  response.innerHTML = `
        <h2>Of course, my love. ♡</h2>

        <p>
            Take your time.
            I want us to be comfortable with this
            and I'd love for us to talk about it.
        </p>
    `;

  response.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

/* =========================
   MEDIA LIGHTBOX
========================= */

const mediaOverlay = document.getElementById("mediaOverlay");
const overlayContent = document.getElementById("overlayContent");
const closeOverlay = document.getElementById("closeOverlay");

const mediaCards = document.querySelectorAll(".media-card");

// Open media when clicked
mediaCards.forEach((card) => {
  card.addEventListener("click", () => {
    const media = card.querySelector("img, video");

    overlayContent.innerHTML = "";

    if (media.tagName === "IMG") {
      const fullImage = document.createElement("img");

      fullImage.src = media.src;
      fullImage.alt = media.alt;

      overlayContent.appendChild(fullImage);
    } else {
      const fullVideo = document.createElement("video");

      fullVideo.src = media.querySelector("source").src;

      fullVideo.controls = true;
      fullVideo.autoplay = true;
      fullVideo.playsInline = true;

      overlayContent.appendChild(fullVideo);

      fullVideo.play().catch((error) => {
        console.log("Video playback:", error);
      });
    }

    mediaOverlay.classList.add("show");
  });
});

// Close overlay
function closeMediaOverlay() {
  const video = overlayContent.querySelector("video");

  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }

  overlayContent.innerHTML = "";

  mediaOverlay.classList.remove("show");
}

closeOverlay.addEventListener("click", closeMediaOverlay);

// Close when clicking outside the media
mediaOverlay.addEventListener("click", (event) => {
  if (event.target === mediaOverlay) {
    closeMediaOverlay();
  }
});

// Close with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMediaOverlay();
  }
});


function goToPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");

    // Keep navigation working correctly
    if (pageId === "page1") {
      currentPage = 1;
      progressBar.style.width = "20%";
    } else if (pageId === "page6" || pageId === "page7") {
      progressBar.style.width = "100%";
    } else {
      currentPage = Number(pageId.replace("page", ""));
      progressBar.style.width =
        `${(currentPage / totalPages) * 100}%`;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

