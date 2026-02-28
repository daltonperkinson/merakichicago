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

// Interactive Needs Assessment Form Logic
window.nextStep = function (stepIndex) {
  // Basic validation before moving next
  const currentStep = document.querySelector('.form-step.active');
  const inputs = currentStep.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      input.reportValidity();
      isValid = false;
    }
  });

  if (!isValid) return;

  document.querySelectorAll('.form-step').forEach(step => {
    step.style.display = 'none';
    step.classList.remove('active');
  });

  const nextTarget = document.getElementById(`step${stepIndex}`);
  nextTarget.style.display = 'block';
  nextTarget.classList.add('active');
};

window.prevStep = function (stepIndex) {
  document.querySelectorAll('.form-step').forEach(step => {
    step.style.display = 'none';
    step.classList.remove('active');
  });

  const prevTarget = document.getElementById(`step${stepIndex}`);
  prevTarget.style.display = 'block';
  prevTarget.classList.add('active');
};

window.compileBrief = function () {
  const form = document.getElementById('needsAssessmentForm');
  if (!form.checkValidity()) return;

  const name = document.getElementById('name').value;
  const company = document.getElementById('company').value;
  const coreProblem = document.getElementById('coreProblem').value;

  const costArea = document.querySelector('input[name="Cost_Area"]:checked')?.value || 'Not specified';
  const techLandscape = document.querySelector('input[name="Tech_Landscape"]:checked')?.value || 'Not specified';

  const briefStr = `
*** AI INTAKE BRIEF ***
Lead: ${name} (${company})

[Core Problem]
${coreProblem}

[Business Context & Impact]
Primary Cost Area: ${costArea}
Current Tech Landscape: ${techLandscape}
----------------------------------------
This brief was auto-compiled by the site's guided intake form.
  `;

  document.getElementById('compiledBrief').value = briefStr.trim();
};

