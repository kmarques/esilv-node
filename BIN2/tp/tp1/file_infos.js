// Lire un fichier donné en paramètre. Celui-ci peut être de format JSON, CSV.
// Le but du script étant de lire le fichier, détecter le nombre de lignes de données
// et ressortir les différents nom de colonnes

// Format attendu:
//      Nombre de lignes détecté: 4
//      Nombre de colonnes détecté: 5
//      Colonnes: id, nom, address, dob, email
const fs = require("fs/promises");

const filePath = "./BIN2/tp/tp1/test.csv";
