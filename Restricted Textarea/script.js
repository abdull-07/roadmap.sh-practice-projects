
const textarea = document.getElementById('message');
const characterCount = document.getElementById('characterCount');
const maxChars = 250;

textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    characterCount.textContent = `${currentLength} / ${maxChars}`;

    if (currentLength >= maxChars) {
        textarea.classList.add('limit-reached');
        characterCount.classList.add('limit-reached');
    } else {
        textarea.classList.remove('limit-reached');
        characterCount.classList.remove('limit-reached');
    }
});