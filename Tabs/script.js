const contents = document.querySelectorAll('.content');
const tabs = document.querySelectorAll('.tab-button');

function showTab(index) {
    contents.forEach(content => content.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(`content-${index}`).classList.add('active');
    tabs[index].classList.add('active');
}
document.addEventListener("DOMContentLoaded", () => showTab(0));    