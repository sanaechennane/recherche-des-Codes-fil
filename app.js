let data = [];

// Charger JSON
fetch("data.json")
.then(res => res.json())
.then(json => {
    data = json;
})
.catch(err => {
    document.getElementById("result").innerHTML =
    `<div class="card error">Erreur chargement data.json</div>`;
});

// 🔎 Recherche
function searchData() {

    let q = document
    .getElementById("search")
    .value
    .trim()
    .toUpperCase();

    if(!q) return;

    // Recherche torsade
    let torsadeResults = data.filter(item =>
        (item.torsade || "").toUpperCase() === q
    );

    // Recherche codeFil
    let codeResults = data.filter(item =>
        (item.codeFil || "").toUpperCase() === q
    );

    let results = [...torsadeResults, ...codeResults];

    if(results.length > 0){

        let html = `<div class="card">
        <h2 class="success">Résultat trouvé</h2>`;

        results.forEach(r => {
            html += `
            <div class="card">

                <div class="row"><b>Code Fil</b><span>${r.codeFil}</span></div>
                <div class="row"><b>Famille</b><span>${r.famille}</span></div>
                <div class="row"><b>Rack</b><span>${r.rack}</span></div>
                <div class="row"><b>Emplacement</b><span>${r.emplacement}</span></div>
                <div class="row"><b>Torsade</b><span>${r.torsade || "-"}</span></div>
                <div class="row"><b>Couleur</b><span>${r.couleur}</span></div>

            </div>
            `;
        });

        html += `</div>`;
        document.getElementById("result").innerHTML = html;

    } else {

        document.getElementById("result").innerHTML =
        `<div class="card error">❌ Code introuvable</div>`;
    }
}

// Enter key
document.getElementById("search")
.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchData();
    }
});
