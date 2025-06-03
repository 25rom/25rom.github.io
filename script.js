document.addEventListener('DOMContentLoaded', () => {
    const tagsContainer = document.querySelector('.tags-navigation');
    const pranayamaBlocks = document.querySelectorAll('.pranayama-block');
    const pranayamaGrid = document.getElementById('pranayamaGrid');

    let activeTags = []; // Массив для хранения до двух активных тегов

    tagsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            const clickedTagButton = event.target;
            const selectedTag = clickedTagButton.dataset.tag;

            if (selectedTag === "все") {
                activeTags = []; 
                tagsContainer.querySelectorAll('.tag.active').forEach(t => {
                    t.classList.remove('active');
                });
            } else {
                const tagIndex = activeTags.indexOf(selectedTag);

                if (tagIndex > -1) { // Тег уже активен, деактивируем его
                    activeTags.splice(tagIndex, 1);
                    clickedTagButton.classList.remove('active');
                } else { // Тег не активен
                    if (activeTags.length < 2) { // Если выбрано меньше 2 тегов
                        activeTags.push(selectedTag);
                        clickedTagButton.classList.add('active');
                    } else { // Уже выбрано 2 тега. Заменяем самый старый.
                        const tagToRemove = activeTags.shift(); // Удаляем первый (самый старый) из массива
                        const buttonToRemove = tagsContainer.querySelector(`.tag[data-tag="${tagToRemove}"]`);
                        if (buttonToRemove) {
                            buttonToRemove.classList.remove('active');
                        }
                        activeTags.push(selectedTag); // Добавляем новый тег
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
            if (activeTags.length === 0) { // Если нет активных тегов, показать все
                block.classList.remove('filtered-out');
            } else {
                const blockTags = block.dataset.tags.split(' ');
                // Блок должен содержать ХОТЯ БЫ ОДИН из активных тегов (логика "ИЛИ")
                const matchesSomeActiveTags = activeTags.some(activeTag => blockTags.includes(activeTag));

                if (matchesSomeActiveTags) {
                    block.classList.remove('filtered-out');
                } else {
                    block.classList.add('filtered-out');
                }
            }
        });
    }

    filterPranayamas(); // Инициализация при загрузке
});
