/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
let sections = undefined;

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
const setActiveSectionHelper = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const currentSectionInViewPort = entry.target;
            if (entry.isIntersecting) {
                currentSectionInViewPort.classList.add('your-active-class');
                // observer.disconnect();
            }
            else {
                currentSectionInViewPort.classList.remove('your-active-class');
            }
        })
    }, options);

    io.observe(target);
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
let buildNav = () => {
    sections = document.querySelectorAll('section');

    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const linkElement = document.createElement('a');
        linkElement.href = `#${section.getAttribute('id')}`;
        linkElement.onclick = scrollToSection;
        linkElement.classList.toggle('menu__link');
        linkElement.textContent = section.getAttribute('data-nav');
        const sectionNameli = document.createElement('li');
        sectionNameli.appendChild(linkElement);
        fragment.appendChild(sectionNameli);
    }
    const navList = document.querySelector('.navbar__menu #navbar__list');
    navList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
let setActiveSection = () => {
    if (sections == null || sections == undefined) {
        return;
    }
    const targets = sections;
    targets.forEach(setActiveSectionHelper);
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
    e.preventDefault();
    const element = e.target;
    let sectionId = element.getAttribute('href');
    sectionId = sectionId.slice(1, sectionId.length);
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
    return true;
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
buildNav();

// Scroll to section on link click

// Set sections as active
setActiveSection();

