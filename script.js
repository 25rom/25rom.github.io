document.addEventListener('DOMContentLoaded', () => {
    const tagsContainer = document.querySelector('.tags-navigation');
    const pranayamaBlocks = document.querySelectorAll('.pranayama-block');
    const pranayamaGrid = document.getElementById('pranayamaGrid'); // Для скролла

    let activeTag = null;

    tagsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            const clickedTagButton = event.target;
            // dataset.tag будет уже с подчеркиваниями, если они есть в HTML
            const selectedTag = clickedTagButton.dataset.tag; 

            // Убираем .active со всех тегов
            tagsContainer.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));

            if (selectedTag === "все") { // Кнопка "Показать все"
                activeTag = null;
                // clickedTagButton.classList.add('active'); // Можно подсветить "Показать все"
            } else if (activeTag === selectedTag) {
                // Если кликнули на уже активный тег (кроме "Показать все"), сбрасываем фильтр
                activeTag = null;
                // Активный класс уже снят
            } else {
                // Новый тег выбран
                activeTag = selectedTag;
                clickedTagButton.classList.add('active');
            }
            
            filterPranayamas();

            // Плавный скролл к блокам пранаям, если они не полностью видны
            // и если какой-то тег активен (т.е. не "Показать все" и не сброс фильтра)
            if (activeTag && pranayamaGrid) { 
                 const gridTop = pranayamaGrid.getBoundingClientRect().top + window.pageYOffset;
                 // Скроллим, если секция не вверху экрана или ниже
                 if (gridTop > window.innerHeight || pranayamaGrid.offsetTop < window.pageYOffset) {
                    pranayamaGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }
            }
        }
    });

    function filterPranayamas() {
        pranayamaBlocks.forEach(block => {
            if (!activeTag) {
                // Если фильтр сброшен, показать все блоки
                block.classList.remove('filtered-out');
                // block.style.opacity = '1'; // Управляется CSS
                // block.style.pointerEvents = 'auto'; // Управляется CSS
            } else {
                // block.dataset.tags уже содержит теги с подчеркиваниями, разделенные пробелами
                const blockTags = block.dataset.tags.split(' ');
                
                // activeTag уже содержит тег с подчеркиванием, если он так задан в data-tag кнопки
                if (blockTags.includes(activeTag)) { 
                    block.classList.remove('filtered-out');
                    // block.style.opacity = '1';
                    // block.style.pointerEvents = 'auto';
                } else {
                    block.classList.add('filtered-out');
                    // block.style.opacity = '0.3'; 
                    // block.style.pointerEvents = 'none'; 
                }
            }
        });
    }

    // Инициализация: Показать все блоки при загрузке
    filterPranayamas();
});
