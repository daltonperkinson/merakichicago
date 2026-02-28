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
