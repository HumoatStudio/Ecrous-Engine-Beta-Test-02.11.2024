document.addEventListener("DOMContentLoaded", () => {
  // Плавное появление секций при скролле
  const sections = document.querySelectorAll('section');

  const revealSection = (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.add('fade-up');
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});
