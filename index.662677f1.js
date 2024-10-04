const e={container:document.getElementById("container")};async function t(){let e=await fetch("https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json"),t=await e.json(),a=[];for(let e of Object.values(t.data)){let t=await fetch(`https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion/${e.id}.json`),n=await t.json();a.push(Object.values(n.data)[0])}return a}function a(e,t,a){let n=a.getBoundingClientRect(),i=-(t-n.y-n.height/2)/200,s=(e-n.x-n.width/2)/200;return i=Math.max(-1,Math.min(1,i)),s=Math.max(-1,Math.min(1,s)),`perspective(100px) rotateX(${i}deg) rotateY(${s}deg)`}!async function(){(await t()).forEach(t=>{let a=document.createElement("div");a.classList.add("champion"),a.setAttribute("id",t.id),a.innerHTML=`
            <div class="image-container">
                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${t.id}_0.jpg" alt="${t.name}" class="loading">
                <h2>${t.name}</h2>
                <div class="abilities">
                    <div class="ability-container">
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.19.1/img/passive/${t.passive.image.full}" alt ="${t.passive.name}" class="ability"/>
                        <span class="tooltip">${t.passive.name}</span>
                    </div>
                    ${t.spells.map(e=>`
                    <div class="ability-container">
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${e.image.full}" alt="${e.id}" class="ability"/>
                        <span class="tooltip">${e.name}</span>
                    </div>`).join("")}
                </div>
            </div>
            <p>${t.title.slice(0,1).toUpperCase()+t.title.slice(1)}</p>
        `,e.container.appendChild(a)}),document.querySelectorAll(".champion").forEach(e=>{e.onmousemove=function(t){let n=[t.clientX,t.clientY].concat([e]);e.style.transition="transform 0.1s ease-out",window.requestAnimationFrame(function(){e.style.transform=a.apply(null,n)})},e.onmouseleave=function(){e.style.transition="transform 0.5s ease-out",e.style.transform="perspective(100px) rotateX(0deg) rotateY(0deg)"}})}();
//# sourceMappingURL=index.662677f1.js.map
