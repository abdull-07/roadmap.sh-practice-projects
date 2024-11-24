const accordionItems = document.querySelectorAll('.accordion-item');


const toggleAccordion = (item) => {

    const isOpen = item.classList.contains('open');

    accordionItems.forEach((i) => i.classList.remove('open'));

    if (!isOpen) item.classList.add('open');
};


accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => toggleAccordion(item));
})