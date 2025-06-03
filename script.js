document.addEventListener('DOMContentLoaded', () => {
    const tagsContainer = document.querySelector('.tags-navigation');
    const pranayamaBlocks = document.querySelectorAll('.pranayama-block');
    const pranayamaGrid = document.getElementById('pranayamaGrid');

    let activeTags = []; // Массив для хранения до двух активных тегов

    tagsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            const clickedTagButton = event.target;
            const selectedTag = clickedTagButton.dataset.tag;

            // Сначала убираем подсветку с кнопки "Показать все", если она была активна
            const resetFilterButton = tagsContainer.querySelector('.reset-filter');
            if (resetFilterButton) {
                //resetFilterButton.classList.remove('active'); // Не нужно, у нее нет класса active
            }

            if (selectedTag === "все") {
                activeTags = []; // Очищаем массив активных тегов
                // Убираем класс .active со всех тегов, кроме "Показать все"
                tagsContainer.querySelectorAll('.tag.active').forEach(t => {
                    if (t !== clickedTagButton) t.classList.remove('active');
                });
                // clickedTagButton.classList.add('active'); // Можно подсветить "Показать все"
            } else {
                const tagIndex = activeTags.indexOf(selectedTag);

                if (tagIndex > -1) { // Тег уже активен, деактивируем его
                    activeTags.splice(tagIndex, 1);
                    clickedTagButton.classList.remove('active');
                } else { // Тег не активен, пытаемся активировать
                    if (activeTags.length < 2) {
                        activeTags.push(selectedTag);
                        clickedTagButton.classList.add('active');
                    } else {
                        // Уже выбрано 2 тега. Удаляем первый (самый старый) из массива и его класс, добавляем новый.
                        const firstActiveTag = activeTags.shift(); // Удаляем первый и получаем его значение
                        const firstActiveButton = tagsContainer.querySelector(`.tag[data-tag="${firstActiveTag}"]`);
                        if (firstActiveButton) {
                            firstActiveButton.classList.remove('active');
                        }
                        activeTags.push(selectedTag);
                        clickedTagButton.classList.add('active');
                    }
                }
            }
            
            filterPranayamas();

            if (activeTags.length > 0 && pranayamaGrid) {
                 const gridTop = pranayamaGrid.getBoundingClientRect().top + window.pageYOffset;
                 if (gridTop > window.innerHeight || pranayamaGrid.offsetTop < window.pageYOffset) {
                    pranayamaGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }
            }
        }
    });

    function filterPranayamas() {
        pranayamaBlocks.forEach(block => {
            if (activeTags.length === 0) {
                block.classList.remove('filtered-out');
            } else {
                const blockTags = block.dataset.tags.split(' ');
                // Блок должен содержать ВСЕ активные теги (логика И)
                const matchesAllActiveTags = activeTags.every(activeTag => blockTags.includes(activeTag));

                if (matchesAllActiveTags) {
                    block.classList.remove('filtered-out');
                } else {
                    block.classList.add('filtered-out');
                }
            }
        });
    }

    filterPranayamas(); // Инициализация при загрузке
});
