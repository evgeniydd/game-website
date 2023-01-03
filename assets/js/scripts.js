let isPlay = false;

const classes = {
  opened: 'opened',
  hidden: 'hidden',
  active: 'active',
};

const checkboxes = {
  requirements: ['minimum', 'recommended'],
  versions: ['standart', 'limited'],
};

const menuBtn = document.querySelector('.header-menu__button'),
  header = document.querySelector('.header'),
  sections = document.querySelectorAll('.section'),
  video = document.getElementById('video'),
  videoButton = document.querySelector('.video-btn'),
  checkbox = document.querySelectorAll('.checkbox'),
  faqItem = document.querySelectorAll('.faq-item__title'),
  menuLink = document.querySelectorAll('.menu-link');

const getToggleMenu = () => {
  header.classList.toggle(classes.opened);
};

const formatValue = (value) => (value < 10 ? `0${value}` : value);

const getTimerValues = (diff) => ({
  seconds: (diff / 1000) % 60,
  minutes: (diff / (1000 * 60)) % 60,
  hours: (diff / (1000 * 60 * 60)) % 24,
  days: (diff / (1000 * 60 * 60 * 24)) % 30,
});

const setTimerValues = (values) => {
  Object.entries(values).forEach(([key, value]) => {
    const timerValue = document.getElementById(key);
    timerValue.innerText = formatValue(Math.floor(value));
  });
};

const startTimer = (date) => {
  const id = setInterval(() => {
    const diff = new Date(date).getTime() - new Date().getTime();

    if (diff < 0) {
      clearInterval(id);
      return;
    }

    setTimerValues(getTimerValues(diff));
  }, 1000);
};

const handleScroll = () => {
  const { scrollY: y, innerHeight: h } = window;
  sections.forEach((sec) => {
    if (y > sec.offsetTop - h / 1.5) sec.classList.remove(classes.hidden);
  });
};

const handleVideo = ({ target }) => {
  const info = target.parentElement;

  isPlay = !isPlay;
  info.classList.toggle(classes.hidden, isPlay);
  target.innerText = isPlay ? 'Pause' : 'Play';
  isPlay ? video.play() : video.pause();
};

const handleFaqItem = ({ currentTarget: target }) => {
  target.classList.toggle('active');
  let content = target.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
};

const scroolToSection = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');

  if (!href && href.startsWith('#')) return;

  const section = href.slice(1);
  const top = document.getElementById(section).offsetTop || 0;

  window.scrollTo({ top, behavior: 'smooth' });
};

const handleCheckbox = ({ currentTarget: { checked, name } }) => {
  const { active } = classes;

  const value = checkboxes[name][+checked];
  const list = document.getElementById(value);
  const tabs = document.querySelectorAll(`[data-${name}]`);
  const siblings = list.parentElement.children;

  for (const item of siblings) item.classList.remove(active);
  for (const tab of tabs) {
    tab.classList.remove(active);
    tab.dataset[name] === value && tab.classList.add(active);
  }

  list.classList.add(active);
};

videoButton.addEventListener('click', handleVideo);
window.addEventListener('scroll', handleScroll);
startTimer('January 10, 2023 00:00:00');
menuBtn.addEventListener('click', getToggleMenu);
faqItem.forEach((item) => item.addEventListener('click', handleFaqItem));
menuLink.forEach((link) => link.addEventListener('click', scroolToSection));
checkbox.forEach((item) => item.addEventListener('click', handleCheckbox));
