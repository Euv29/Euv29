document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.decodanimation');

  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const decodeText = (element) => {
    const text = element.textContent;
    element.textContent = '';
    let index = 0;

    const decode = () => {
      if (index < text.length) {
        element.textContent = text.substring(0, index) + randomChars[Math.floor(Math.random() * randomChars.length)];
        index++;
        setTimeout(decode, 50);
      } else {
        element.textContent = text;
      }
    };

    decode();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        decodeText(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => {
    observer.observe(element);
  });
});