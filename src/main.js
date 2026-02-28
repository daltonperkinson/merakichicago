import './style.css'

// Dynamic Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: stop observing once revealed
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Select all elements with the class 'reveal' or 'reveal-delayed'
document.querySelectorAll('.reveal, .reveal-delayed').forEach((element) => {
  observer.observe(element);
});

// Copy Email to Clipboard Logic
const copyBtn = document.getElementById('copyEmailBtn');
const tooltip = document.getElementById('emailTooltip');

if (copyBtn && tooltip) {
  copyBtn.addEventListener('click', () => {
    const email = 'info@merakichicago.com';
    navigator.clipboard.writeText(email).then(() => {
      // Visual feedback
      const originalText = tooltip.innerText;
      tooltip.innerText = 'Email copied!';
      tooltip.style.backgroundColor = 'var(--accent)';
      tooltip.style.color = '#fff';

      // Reset after 3 seconds
      setTimeout(() => {
        tooltip.innerText = originalText;
        tooltip.style.backgroundColor = 'var(--surface)';
        tooltip.style.color = 'var(--text-secondary)';
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      tooltip.innerText = 'Failed to copy';
    });
  });
}
