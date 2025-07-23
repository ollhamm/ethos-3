// ===== Custom Select Global Start =====
(function () {
    function initCustomSelects() {
        document.querySelectorAll('.custom-select').forEach(function (wrapper) {
            if (wrapper.classList.contains('custom-select-initialized')) return;
            var select = wrapper.querySelector('select');
            if (!select) return;
            var selectedDiv = document.createElement('div');
            selectedDiv.className = 'custom-select__selected';
            selectedDiv.tabIndex = 0;
            selectedDiv.innerText = select.options[select.selectedIndex]?.text || '';
            wrapper.appendChild(selectedDiv);
            var optionsDiv = document.createElement('div');
            optionsDiv.className = 'custom-select__options';
            Array.from(select.options).forEach(function (opt, idx) {
                var optDiv = document.createElement('div');
                optDiv.className = 'custom-select__option' + (select.selectedIndex === idx ? ' selected' : '');
                optDiv.innerText = opt.text;
                optDiv.dataset.value = opt.value;
                optDiv.addEventListener('click', function (e) {
                    // UI only: update selected text and highlight, do not change <select> value
                    selectedDiv.innerText = opt.text;
                    wrapper.querySelectorAll('.custom-select__option').forEach(function (o) { o.classList.remove('selected'); });
                    optDiv.classList.add('selected');
                    wrapper.classList.remove('open');
                });
                optionsDiv.appendChild(optDiv);
            });
            wrapper.appendChild(optionsDiv);
            selectedDiv.addEventListener('click', function (e) {
                e.stopPropagation();
                document.querySelectorAll('.custom-select.open').forEach(function (openSel) {
                    if (openSel !== wrapper) openSel.classList.remove('open');
                });
                wrapper.classList.toggle('open');
            });
            selectedDiv.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectedDiv.click();
                }
            });
            document.addEventListener('click', function (e) {
                if (!wrapper.contains(e.target)) wrapper.classList.remove('open');
            });
            wrapper.classList.add('custom-select-initialized');
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomSelects);
    } else {
        initCustomSelects();
    }
    window.initCustomSelects = initCustomSelects;
})();
// ===== Custom Select Global End ===== 