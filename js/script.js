document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.language-switch__btn');
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            setLanguage(selectedLang);

            languageButtons.forEach(btn => btn.classList.remove('language-switch__btn--active'));
            button.classList.add('language-switch__btn--active');
        });
    });

    const savedLang = getCookie('language') || 'ru';
    setLanguage(savedLang);
    languageButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('language-switch__btn--active');
        } else {
            btn.classList.remove('language-switch__btn--active');
        }
    });

    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formMessage = document.getElementById('form-message');
            formMessage.textContent = texts[savedLang].registrationSuccess;
            registrationForm.reset();
        });
    }

    const acceptCookiesBtn = document.getElementById('accept-cookies');
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            setCookie('cookies_accepted', 'true', 365);
            const cookieConsent = document.querySelector('.cookie-consent');
            if (cookieConsent) {
                cookieConsent.style.display = 'none';
            }
        });

        if (getCookie('cookies_accepted')) {
            const cookieConsent = document.querySelector('.cookie-consent');
            if (cookieConsent) {
                cookieConsent.style.display = 'none';
            }
        }
    }

    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('.header__nav');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
            const isOpen = nav.classList.contains('open');
            menuButton.setAttribute('aria-expanded', isOpen);
            menuButton.setAttribute('aria-label', isOpen ? texts[savedLang].closeMenu : texts[savedLang].openMenu);
        });
    }

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-label', texts[savedLang].openMenu);
            }
        });
    });

    const slides = document.querySelectorAll('.slider__slide');
    const prevButton = document.getElementById('slider-prev');
    const nextButton = document.getElementById('slider-next');
    const dots = document.querySelectorAll('.slider__dot');
    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    let slideInterval;

    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width >= 992) {
            return 3;
        } else if (width >= 768) {
            return 2;
        } else {
            return 1;
        }
    }

    function showSlide(index) {
        slidesPerView = getSlidesPerView();

        if (index < 0) {
            currentSlide = slides.length - slidesPerView;
        } else if (index > slides.length - slidesPerView) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        updateSlider();
    }

    function updateSlider() {
        const sliderWidth = document.querySelector('.slider__slides').clientWidth;
        const translateX = -(sliderWidth / slidesPerView) * currentSlide;
        document.querySelector('.slider__slides').style.transform = `translateX(${translateX}px)`;

        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('slider__dot--active');
            } else {
                dot.classList.remove('slider__dot--active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlideFunc() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // смена слайда каждые 5 секунд
    }

    function pauseSlideShow() {
        clearInterval(slideInterval);
    }

    nextButton.addEventListener('click', () => {
        nextSlide();
        pauseSlideShow();
        startSlideShow();
    });

    prevButton.addEventListener('click', () => {
        prevSlideFunc();
        pauseSlideShow();
        startSlideShow();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-slide'));
            showSlide(index);
            pauseSlideShow();
            startSlideShow();
        });
    });

    showSlide(currentSlide);
    startSlideShow();

    window.addEventListener('resize', () => {
        slidesPerView = getSlidesPerView();
        if (currentSlide > slides.length - slidesPerView) {
            currentSlide = slides.length - slidesPerView;
            if (currentSlide < 0) currentSlide = 0;
            updateSlider();
        } else {
            updateSlider();
        }
    });
});

const texts = {
    'ru': {
        'headerTitle': 'Онлайн-курсы для начинающих: как начать разбираться в инвестициях',
        'coursesTitle': 'Список доступных курсов',
        'targetAudienceTitle': 'Для кого эти курсы',
        'targetAudienceDesc': 'Подходят для новичков, которые хотят узнать, как работать с финансами.',
        'advantagesTitle': 'Преимущества обучения',
        'advantagesDesc': 'Вы сможете понять, как работают инвестиции, не тратя время на сложные термины.',
        'instructorsTitle': 'Наши Инструкторы',
        'instructor1Name': 'Иван Иванов',
        'instructor1Bio': 'Эксперт по инвестициям с более чем 10-летним опытом.',
        'instructor2Name': 'Мария Смирнова',
        'instructor2Bio': 'Специалист по финансовому планированию и управлению капиталом.',
        'testimonialsTitle': 'Отзывы учеников',
        'registrationTitle': 'Регистрация на курс',
        'registerBtn': 'Зарегистрироваться',
        'privacyPolicy': 'Политика конфиденциальности',
        'termsAndConditions': 'Условия использования',
        'cookiesText': 'Мы используем куки для улучшения вашего опыта. <a href="privacy-policy.html" class="cookie-consent__link">Узнать больше</a>.',
        'acceptCookies': 'Принять',
        'registrationSuccess': 'Регистрация успешна!',
        'openMenu': 'Открыть меню',
        'closeMenu': 'Закрыть меню'
    },
    'en': {
        'headerTitle': 'Online Courses for Beginners: How to Start Understanding Investments',
        'coursesTitle': 'List of Available Courses',
        'targetAudienceTitle': 'Who These Courses Are For',
        'targetAudienceDesc': 'Suitable for beginners who want to learn how to manage finances.',
        'advantagesTitle': 'Benefits of Learning',
        'advantagesDesc': 'You will understand how investments work without wasting time on complex terms.',
        'instructorsTitle': 'Our Instructors',
        'instructor1Name': 'Ivan Ivanov',
        'instructor1Bio': 'Investment expert with over 10 years of experience.',
        'instructor2Name': 'Maria Smirnova',
        'instructor2Bio': 'Specialist in financial planning and capital management.',
        'testimonialsTitle': 'Student Testimonials',
        'registrationTitle': 'Register for the Course',
        'registerBtn': 'Register',
        'privacyPolicy': 'Privacy Policy',
        'termsAndConditions': 'Terms and Conditions',
        'cookiesText': 'We use cookies to improve your experience. <a href="privacy-policy.html" class="cookie-consent__link">Learn more</a>.',
        'acceptCookies': 'Accept',
        'registrationSuccess': 'Registration successful!',
        'openMenu': 'Open menu',
        'closeMenu': 'Close menu'
    }
};

function setLanguage(lang) {
    setCookie('language', lang, 365);

    const currentTexts = texts[lang];

    const headerTitle = document.querySelector('.header__title');
    if (headerTitle) headerTitle.textContent = currentTexts['headerTitle'];

    const coursesTitle = document.querySelector('.courses__title');
    if (coursesTitle) coursesTitle.textContent = currentTexts['coursesTitle'];

    const targetAudienceTitle = document.querySelector('.target-audience__title');
    if (targetAudienceTitle) targetAudienceTitle.textContent = currentTexts['targetAudienceTitle'];

    const targetAudienceDesc = document.querySelector('.target-audience__description');
    if (targetAudienceDesc) targetAudienceDesc.textContent = currentTexts['targetAudienceDesc'];

    const advantagesTitle = document.querySelector('.advantages__title');
    if (advantagesTitle) advantagesTitle.textContent = currentTexts['advantagesTitle'];

    const advantagesDesc = document.querySelector('.advantages__description');
    if (advantagesDesc) advantagesDesc.textContent = currentTexts['advantagesDesc'];

    const instructorsTitle = document.querySelector('.instructors__title');
    if (instructorsTitle) instructorsTitle.textContent = currentTexts['instructorsTitle'];

    const instructor1Name = document.querySelector('.instructor:nth-child(1) .instructor__name');
    if (instructor1Name) instructor1Name.textContent = currentTexts['instructor1Name'];

    const instructor1Bio = document.querySelector('.instructor:nth-child(1) .instructor__bio');
    if (instructor1Bio) instructor1Bio.textContent = currentTexts['instructor1Bio'];

    const instructor2Name = document.querySelector('.instructor:nth-child(2) .instructor__name');
    if (instructor2Name) instructor2Name.textContent = currentTexts['instructor2Name'];

    const instructor2Bio = document.querySelector('.instructor:nth-child(2) .instructor__bio');
    if (instructor2Bio) instructor2Bio.textContent = currentTexts['instructor2Bio'];

    const testimonialsTitle = document.querySelector('.testimonials__title');
    if (testimonialsTitle) testimonialsTitle.textContent = currentTexts['testimonialsTitle'];

    const registrationTitle = document.querySelector('.registration__title');
    if (registrationTitle) registrationTitle.textContent = currentTexts['registrationTitle'];

    const registerBtn = document.querySelector('.form__button');
    if (registerBtn) registerBtn.textContent = currentTexts['registerBtn'];

    const footerPrivacy = document.querySelector('.footer__link[href="privacy-policy.html"]');
    if (footerPrivacy) footerPrivacy.textContent = currentTexts['privacyPolicy'];

    const footerTerms = document.querySelector('.footer__link[href="terms-and-conditions.html"]');
    if (footerTerms) footerTerms.textContent = currentTexts['termsAndConditions'];

    const cookieConsentText = document.querySelector('.cookie-consent__text');
    if (cookieConsentText) {
        cookieConsentText.innerHTML = `${currentTexts['cookiesText']}`;
    }

    const formMessage = document.getElementById('form-message');
    if (formMessage && formMessage.textContent === (lang === 'en' ? texts['ru'].registrationSuccess : texts['en'].registrationSuccess)) {
        formMessage.textContent = currentTexts['registrationSuccess'];
    }

    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.setAttribute('aria-label', texts[lang].openMenu);
    }

    const nav = document.querySelector('.header__nav');
    if (nav.classList.contains('open')) {
        menuButton.setAttribute('aria-label', texts[lang].closeMenu);
    }
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
