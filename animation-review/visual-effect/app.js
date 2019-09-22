function scrollAppear() {
  // .intro-text
  const introText = document.querySelector(".intro-text");
  const textPosition = introText.getBoundingClientRect().top;
  const screenPosition = window.innerHeight;

  if (textPosition < screenPosition) {
    introText.classList.add("intro-display");
  } else {
    introText.classList.remove("intro-display");
  }

  // .intro-title
  const introTitle = document.querySelector(".intro-title");
  const titlePosition = introTitle.getBoundingClientRect().top;

  if (titlePosition < screenPosition) {
    introTitle.classList.add("intro-display");
  } else {
    introTitle.classList.remove("intro-display");
  }

  // .intron-image
  const introImage = document.querySelector(".intro-image");
  const imagePosition = introImage.getBoundingClientRect().top;

  if (imagePosition < screenPosition) {
    introImage.classList.add("intro-image-display");
  } else {
    introImage.classList.remove("intro-image-display");
  }
}

window.addEventListener("scroll", scrollAppear);
