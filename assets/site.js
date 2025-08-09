// Handles the contact form submission by building a mailto link
// with encoded subject and body derived from raw form values.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = `Contact from ${name}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${message}`;

    const mailtoUrl = `mailto:info@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  });
});
