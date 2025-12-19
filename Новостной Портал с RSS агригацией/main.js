const url = 'habr_rss.xml';

fetch(url)
    .then(response => response.text())
    .then(xmlText =>{
        //console.log("Ответ: ", xmlText);

        //Парсинг внутри .then, где доступно xmlText.
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        console.log(xmlDoc);
        
        //Поиск элементов.
        const items = xmlDoc.querySelectorAll('item');

        let htmlOutPut = '';
        
        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const date = item.querySelector('pubDate').textContent;
            // console.log('📰', title);
            // console.log('🔗', link);

            htmlOutPut += `<div class="news-card">
                    <h3><a href="${link}" target="_blank">${title}</a></h3>
                    <p class="date">📅 ${date}</p>
                </div>
                <hr>`
            });
            news_container.innerHTML = htmlOutPut;
    })
    .catch(error => console.error("Ошибка: ", error));