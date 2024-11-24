document.addEventListener('DOMContentLoaded', () => {
    const dropdownHeader = document.getElementById('dropdown-header');
    const dropdownOptions = document.getElementById('dropdown-options');
    const options = document.querySelectorAll('.dropdown-option');

    // Toggle dropdown open/close
    dropdownHeader.addEventListener('click', () => {
        dropdownHeader.classList.toggle('open');
        dropdownOptions.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdownHeader.contains(event.target) && !dropdownOptions.contains(event.target)) {
            dropdownHeader.classList.remove('open');
            dropdownOptions.classList.remove('open');
        }
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', () => {
            const selectedValue = option.dataset.value;

            // Set selected text in header
            dropdownHeader.innerHTML = `
                ${selectedValue}
                <span class="dropdown-icon" id="dropdown-icon">▼</span>
            `;
            dropdownHeader.classList.add('selected');

            // Highlight the selected option
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            // Close the dropdown
            dropdownHeader.classList.remove('open');
            dropdownOptions.classList.remove('open');
        });
    });
});
