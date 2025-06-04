document.addEventListener('DOMContentLoaded', () => {
    // --- Логика для фильтрации тегов на главной странице (index.html) ---
    const tagsContainer = document.querySelector('.tags-navigation');
    const pranayamaBlocks = document.querySelectorAll('.pranayama-block');
    const pranayamaGrid = document.getElementById('pranayamaGrid');

    // Выполняем код фильтрации, только если все нужные элементы есть на странице
    if (tagsContainer && pranayamaBlocks.length > 0 && pranayamaGrid) {
        let activeTags = []; 

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

                    if (tagIndex > -1) {
                        activeTags.splice(tagIndex, 1);
                        clickedTagButton.classList.remove('active');
                    } else { 
                        if (activeTags.length < 2) {
                            activeTags.push(selectedTag);
                            clickedTagButton.classList.add('active');
                        } else { 
                            const tagToRemove = activeTags.shift();
                            const buttonToRemove = tagsContainer.querySelector(`.tag[data-tag="${tagToRemove}"]`);
                            if (buttonToRemove) {
                                buttonToRemove.classList.remove('active');
                            }
                            activeTags.push(selectedTag);
                            clickedTagButton.classList.add('active');
                        }
                    }
                }
                
                filterPranayamas();

                if (activeTags.length > 0) {
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
                    // Используем .some() для логики "ИЛИ" (показать, если есть хотя бы один из активных тегов)
                    const matchesSomeActiveTags = activeTags.some(activeTag => blockTags.includes(activeTag));

                    if (matchesSomeActiveTags) {
                        block.classList.remove('filtered-out');
                    } else {
                        block.classList.add('filtered-out');
                    }
                }
            });
        }

        filterPranayamas(); // Инициализация фильтра при загрузке index.html
    }

    // --- Общий JS для всех страниц (например, подсветка активной кнопки навигации) ---
    // Этот код будет выполняться на всех страницах, где подключен script.js

    // (Пока не добавляю JS для выпадающих меню, т.к. они сделаны простыми ссылками.
    //  Если понадобится динамическое открытие, его можно добавить сюда)

    // Подсветка активной кнопки в .top-nav-bar (Упрощенная версия, т.к. класс .active уже проставлен в HTML)
    // Если бы .active не было в HTML, можно было бы использовать такой код:
    /*
    const topNavButtons = document.querySelectorAll('.top-nav-bar .nav-button');
    const currentPath = window.location.pathname.split('/').pop(); // Получаем имя файла (index.html, friends.html и т.д.)

    topNavButtons.forEach(button => {
        const buttonPath = button.getAttribute('href').split('/').pop();
        if (buttonPath === currentPath) {
            button.classList.add('active');
        }
        // Отдельная обработка для Notion-ссылки, если нужно как-то ее выделить
        if (button.classList.contains('panel-values') && button.href.includes('notion.so')) {
            // можно добавить спец. стиль, если она активна (но она внешняя)
        }
    });
    */
    // Поскольку класс .active уже проставлен в HTML для каждой страницы, дополнительный JS для этого не требуется.
});
