// ===== CUSTOM SELECT - BULLETPROOF VERSION =====
// This script will NEVER run twice, guaranteed!

// GLOBAL CHECK - STOP IMMEDIATELY IF ALREADY LOADED
if (typeof window.CUSTOM_SELECT_LOADED !== 'undefined') {
    console.log('Custom Select already loaded, EXITING');
    throw new Error('Custom Select already loaded');
}

// MARK AS LOADED IMMEDIATELY
window.CUSTOM_SELECT_LOADED = true;

(function () {
    console.log('Custom Select starting...');

    function createCustomSelect(wrapper) {
        // Skip if already initialized
        if (wrapper.dataset.customSelectInitialized === 'true') {
            return;
        }

        var select = wrapper.querySelector('select');
        if (!select) return;

        // Remove any existing custom elements
        wrapper.querySelectorAll('.custom-select__selected, .custom-select__options').forEach(function (el) {
            el.remove();
        });

        // Create selected display
        var selectedDiv = document.createElement('div');
        selectedDiv.className = 'custom-select__selected';
        selectedDiv.tabIndex = 0;
        selectedDiv.innerText = select.options[select.selectedIndex]?.text || '';
        wrapper.appendChild(selectedDiv);

        // Create options container
        var optionsDiv = document.createElement('div');
        optionsDiv.className = 'custom-select__options';

        // Create options
        Array.from(select.options).forEach(function (opt, idx) {
            var optDiv = document.createElement('div');
            optDiv.className = 'custom-select__option' + (select.selectedIndex === idx ? ' selected' : '');
            optDiv.innerText = opt.text;
            optDiv.dataset.value = opt.value;

            optDiv.addEventListener('click', function (e) {
                e.stopPropagation();
                selectedDiv.innerText = opt.text;
                select.value = opt.value;
                select.selectedIndex = idx;

                wrapper.querySelectorAll('.custom-select__option').forEach(function (o) {
                    o.classList.remove('selected');
                });
                optDiv.classList.add('selected');
                wrapper.classList.remove('open');

                // Trigger change event
                select.dispatchEvent(new Event('change', { bubbles: true }));
            });

            optionsDiv.appendChild(optDiv);
        });

        wrapper.appendChild(optionsDiv);

        // Click handler for selected
        selectedDiv.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelectorAll('.custom-select.open').forEach(function (openSel) {
                if (openSel !== wrapper) openSel.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });

        // Keyboard support
        selectedDiv.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectedDiv.click();
            }
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove('open');
            }
        });

        // Mark as initialized
        wrapper.dataset.customSelectInitialized = 'true';
    }

    function initAll() {
        console.log('Initializing custom selects...');
        document.querySelectorAll('.custom-select').forEach(createCustomSelect);
    }

    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    // Umbraco events
    document.addEventListener('umbraco:ready', initAll);
    document.addEventListener('umbraco:content:loaded', initAll);

    console.log('Custom Select loaded successfully');
})();
// ===== CUSTOM SELECT END ===== 