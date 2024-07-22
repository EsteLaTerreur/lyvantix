// constantes 
var couleur_du_cache = 'black';
var cheminFichierTexte = 'texte10.txt';

// traitement texte
function traitement_txt(contenu) {
  console.log("lancement du traitement du texte")
  var lignes = contenu.split('\n'); // split en lignes
  var new_titre = lignes[0]; // récup titre

  // Transformer le titre
  var titreAvecSpans = new_titre.split('\n').map(function(line) {
        if (line.trim().startsWith('<br>')) {
                return line; // ignore les balises <br>
        } else {
            return line.split(/([a-zA-ZéÉàÀùèÈâêîôûÇçÂÊÎÔÛœŒ]+)/).map(function(part) {
                if (part.match(/[a-zA-ZéÉàÀùèÈâêîôûÇçÂÊÎÔÛœŒ]+/)) {
                    return '<span>' + part + '</span>';
                } else {
                    return Array.from(part).map(function(char) {
                        return '<span>' + char + '</span>';
                    }).join('');
                }
            }).join('');
        }
    }).join('<br>'); // recompo avec des balises <br>
  lignes.shift(); // suppr titre du corps
  var nouveauContenu = lignes.join('\n'); // recompo avec des sauts de ligne

  // Transformer le corps
  var texteAvecSpans = nouveauContenu.split('\n').map(function(line) {
      if (line.trim().startsWith('<br>')) {
          return line; // ignore les balises <br>
      } else {
          return line.split(/([a-zA-ZéÉàÀùèÈâêîôûÇçÂÊÎÔÛœŒ]+)/).map(function(part) {
              if (part.match(/[a-zA-ZéÉàÀùèÈâêîôûÇçÂÊÎÔÛœŒ]+/)) {
                  return '<span>' + part + '</span>';
              } else {
                  return Array.from(part).map(function(char) {
                      return '<span>' + char + '</span>';
                  }).join('');
              }
          }).join('');
      }
  }).join('<br>'); // recompo avec des balises <br>

  return {
      texte: texteAvecSpans,
      titre: titreAvecSpans
  };
}
// Gestion des propositions de mots
var userInput = document.getElementById('userInput');
var submitButton = document.getElementById('submitButton');

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        revelerMots(userInput.value);
        userInput.value = "";
    }
});

submitButton.addEventListener('click', function() {
    revelerMots(userInput.value);
    userInput.value = "";
});
// Fin gestion

// Fonction pour charger le contenu du fichier texte
function chargerTexte() {
    fetch(cheminFichierTexte)
    .then(response => {
        if (!response.ok) {
            throw new Error('Impossible de charger le fichier texte.');
        }
        return response.text();
    })
    .then(contenu => {
        console.log("Chargement du texte");
        console.log(cheminFichierTexte)
        var texteAvecSpans;
        var titreAvecSpans;
        t = traitement_txt(contenu);
        document.getElementById('corpsADeviner').innerHTML = t.texte;
        document.getElementById('titreADeviner').innerHTML = t.titre;
        cacherMots();
    })
    .catch(error => {
        console.error('Erreur lors du chargement du fichier texte :', error);
    });
}
// fin chargement

// cacher le texte
function cacherMots() {
    console.log("cache mots");

    // cache titre
    var titreOriginal = document.querySelectorAll('#titreADeviner span');
    for ( var n = 0; n < titreOriginal.length; n++ ) {
        var element = titreOriginal[n];
        element.style.backgroundColor = couleur_du_cache;
        element.style.color = 'black';
        element.style.userSelect = 'none';
        element.addEventListener('click', afficherNombreLettres);
        }
    // cache corps
    var elements_a_colorer = document.querySelectorAll('#corpsADeviner span');
    for ( var n = 0; n < elements_a_colorer.length; n++ ) {
        var element = elements_a_colorer[n];
        element.style.backgroundColor = couleur_du_cache;
        element.style.color = 'black';
        element.style.userSelect = 'none';
        element.addEventListener('click', afficherNombreLettres);
        }
  revelerCaracteres();
}
// fin cacher le texte

// révéler texte
function revelerMots2() { // avec bouton
    console.log("révèle mots avec le bouton");
    
// révèle titre

var titreAReveler = document.querySelectorAll('#titreADeviner span');
for ( var n = 0; n < titreAReveler.length; n++ ) {
    var element = titreAReveler[n];
    element.style.backgroundColor = '#f9f9f9';
    element.style.color = 'black';
    element.style.userSelect = 'auto';
    element.style.pointerEvents = 'none';
    }

// révèle corps
var elements_a_Reveler = document.querySelectorAll('#corpsADeviner span');
for ( var n = 0; n < elements_a_Reveler.length; n++ ) {
    var element = elements_a_Reveler[n];
    element.style.backgroundColor = '#f9f9f9';
    element.style.color = 'black';
    element.style.userSelect = 'auto';
    element.style.pointerEvents = 'none';
    }

}
// fin révéler texte 

// révéler texte
function revelerMots(mot_test) {  // en testant un mot
  console.log("test du mot :" + mot_test);
  nb_bonnes_rep = 0
  ajoutListeMotsTestes(mot_test);
  var declinaisons = decliner(mot_test);
  // révèle titre

  var titreAReveler = document.querySelectorAll('#titreADeviner span');
  for ( var n = 0; n < titreAReveler.length; n++ ) {
      var element = titreAReveler[n];
      if (declinaisons.includes(element.textContent)){
          element.style.backgroundColor = '#f9f9f9';
          element.style.color = 'black';
          element.style.userSelect = 'auto';
          element.style.pointerEvents = 'none';
          nb_bonnes_rep+=1;
      }
      }

  // révèle corps
  var elements_a_Reveler = document.querySelectorAll('#corpsADeviner span');
  for ( var n = 0; n < elements_a_Reveler.length; n++ ) {
      var element = elements_a_Reveler[n];
      if (declinaisons.includes(element.textContent)){
          element.style.backgroundColor = '#f9f9f9';
          element.style.color = 'black';
          element.style.userSelect = 'auto';
          element.style.pointerEvents = 'none';
          nb_bonnes_rep+=1;
      }
      }

  updateAffichageCarres(nb_bonnes_rep);
}
// fin révéler texte 

function updateAffichageCarres(nb_bonnes_rep){
  const affichageCarres = document.querySelectorAll(".affichage_carres");
  
  // Loop through each selected element
  affichageCarres.forEach((carre) => {
      // Update the text content to display "a" characters repeated 5 times
      if(nb_bonnes_rep>=1){
          carre.textContent = "🟩".repeat(nb_bonnes_rep);
      } else {
          carre.textContent = "🟥";
      }
  });
}

// révéler caractères 
function revelerCaracteres() {  
    console.log("révélation des caractères spéciaux");

var titreAReveler = document.querySelectorAll('#titreADeviner span');
for ( var n = 0; n < titreAReveler.length; n++ ) {
    var element = titreAReveler[n];
    if ([".", ",","'",'-',':','!','?','/',' ','"'].includes(element.textContent)) {
        element.style.backgroundColor = '#f9f9f9';
        element.style.color = 'black';
        element.style.userSelect = 'auto';
        element.style.pointerEvents = 'none';
    }
    }

// révèle corps
var elements_a_Reveler = document.querySelectorAll('#corpsADeviner span');
for ( var n = 0; n < elements_a_Reveler.length; n++ ) {
    var element = elements_a_Reveler[n];
    if ([".", ",","'",'-',':','!','?','/',' ','"'].includes(element.textContent)) {
        element.style.backgroundColor = '#f9f9f9';
        element.style.color = 'black';
        element.style.userSelect = 'auto';
        element.style.pointerEvents = 'none';
    }
    }
}
// fin révéler caractères 


// décliner mot
function decliner(mot){
    mot_avec_maj = mot.charAt(0).toUpperCase() + mot.slice(1);
    mot_sans_maj = mot.charAt(0).toLowerCase() + mot.slice(1);
    mot_maj_pl = mot_avec_maj + "s"
    mot_au_pluriel = mot_sans_maj + "s";
    mot_au_pluriel2 = mot_sans_maj + "x";
    mot_au_feminin = mot_sans_maj + "e";
    mot_au_feminin_pl = mot_sans_maj + "es";
    return [mot,mot_avec_maj,mot_sans_maj,mot_maj_pl,mot_au_pluriel,mot_au_pluriel2,mot_au_feminin,mot_au_feminin_pl];
}
// fin décliner

  // gestion de la liste de mots testés
    nb_mots_testes = 1;
    function ajoutListeMotsTestes(mot){
        const newListItem = document.createElement("li");
        newListItem.textContent = nb_mots_testes + ". " + mot;
        listeMotsTestes = document.getElementById("liste_mots_testes");
        listeMotsTestes.appendChild(newListItem);
        nb_mots_testes+=1;
    }   
  // fin gestion de la liste de mots testés

function afficherNombreLettres(event) {
    console.log("print nb lettres")
    var mot_en_court = event.target;
    var mot = mot_en_court.textContent;
    var nombreLettres = mot.length; 
    var lettre_a_afficher = String(nombreLettres)
    if(mot!='<br>'){
        for(i=0;i<nombreLettres;i++){
        lettre_a_afficher = " " + lettre_a_afficher + " ";
        }
        mot_en_court.textContent = lettre_a_afficher;
        mot_en_court.style.whiteSpace = 'pre-wrap';
        mot_en_court.style.userSelect = 'none';
        mot_en_court.style.pointerEvents = 'none';
    }
    mot_en_court.style.color = '#40abff';
    setTimeout(function() { // suppr l'affichage au bout d'un moment
        if(mot!='<br>'){
        mot_en_court.textContent = mot;
        mot_en_court.style.color = 'black';
        mot_en_court.style.pointerEvents = 'auto';
        mot_en_court.addEventListener('click', afficherNombreLettres);
        }
    }, 1000); // millisecondes
}

// traitement ponctuation
function traitement_ponctuation(mots){
    for(mot in mots){
    console.log(mot);
    }
}

// fin traitement ponctuation

// ouverture page
window.onload = ouverturePage;
function ouverturePage(){
    console.log("Ouverture page")
    chargerTexte();
}
