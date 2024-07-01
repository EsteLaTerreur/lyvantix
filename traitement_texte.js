function traitement_txt(contenu){ 
    var lignes = contenu.split('\n'); //split en lignes
    var new_titre = lignes[0]; // récup titre
    var mots_titre = new_titre.split(/\s+/); // split titre en mots
    lignes.shift(); // suppr titre du corps
    var nouveauContenu = lignes.join('<br>'); // recompo
    var mots = nouveauContenu.split(/\s+/); // split corps en mots
    //mots = traitement_ponctuation(mots);
    //mots_titre = traitement_ponctuation(mots_titre);
    var texteAvecSpans = mots.map(function(mot) {
        if(mot.substr(0,4)=="<br>"){
        new_mot = '<br>'+'<span>' + mot.substr(4, mot.length) + '</span>';
        } else {
        new_mot = '<span>' + mot + '</span>';
        };
        return new_mot;
    }).join(' ');
    var titreAvecSpans = mots_titre.map(function(mot) {
    new_mot = '<span>' + mot + '</span>';
    return new_mot;
    }).join(' ');
    return (texteAvecSpans,titreAvecSpans);
}