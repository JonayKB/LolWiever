const DOM = {
    container: document.getElementById('container'),
};

// Cargar y mostrar campeones
async function getChampions() {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json');
    const data = await response.json();
    const champions = {};

    // Cargar los datos detallados de cada campeón
    await Promise.all(Object.values(data.data).map(async (champion) => {
        const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion/${champion.id}.json`);
        const detailedData = await res.json();
        champions[champion.id] = Object.values(detailedData.data)[0];
    }));

    return champions;
}

async function showChampions() {
    const champions = await getChampions();

    Object.values(champions).forEach((champion) => {
        const championElement = document.createElement('div');
        championElement.classList.add('champion');
        championElement.setAttribute("id", champion.id);

        championElement.innerHTML = `
            <div class="image-container">
                <img state="${champion.skins[0].id}" src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="${champion.name}" class="loading">
                <h2>${champion.name}</h2>
                <div class="abilities">
                    <div class="ability-container">
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.19.1/img/passive/${champion.passive.image.full}" alt="${champion.passive.name}" class="ability"/>
                        <span class="tooltip">${champion.passive.name}</span>
                    </div>
                    ${champion.spells.map(spell => `
                    <div class="ability-container">
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${spell.image.full}" alt="${spell.id}" class="ability"/>
                        <span class="tooltip">${spell.name}</span>
                    </div>`).join('')}
                </div>
            </div>
            <p>${champion.title.slice(0, 1).toUpperCase() + champion.title.slice(1)}</p>
        `;
        DOM.container.appendChild(championElement);
    });

    document.querySelectorAll('.champion').forEach((championElement) => {
        addMouseEffects(championElement);
        championElement.addEventListener('click', () => {
            let img = championElement.querySelector('img.loading');
            let state = img.getAttribute('state');


            const champion = champions[championElement.id];
            const skins = champion.skins;


            const actualSkinPos = skins.findIndex(skin => skin.id == state);


            const nextSkin = skins[(actualSkinPos + 1) % skins.length];
            img.style.opacity = 0;

            setTimeout(() => {
                img.setAttribute('src', `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championElement.id}_${nextSkin.num}.jpg`);
                img.setAttribute('state', nextSkin.id);
                img.style.opacity = 1;

            }, 300);
        });
    });
}

showChampions();

let constrain = 200;
let maxRotation = 1;

function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;

    calcX = Math.max(-maxRotation, Math.min(maxRotation, calcX));
    calcY = Math.max(-maxRotation, Math.min(maxRotation, calcY));

    return `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
}

function transformElement(el, xyEl) {
    el.style.transform = transforms.apply(null, xyEl);
}

function addMouseEffects(element) {
    element.onmousemove = function (e) {
        let xy = [e.clientX, e.clientY];
        let position = xy.concat([element]);

        element.style.transition = 'transform 0.1s ease-out';
        window.requestAnimationFrame(function () {
            transformElement(element, position);
        });
    };

    element.onmouseleave = function () {
        element.style.transition = 'transform 0.5s ease-out';
        element.style.transform = 'perspective(100px) rotateX(0deg) rotateY(0deg)';
    };
}
