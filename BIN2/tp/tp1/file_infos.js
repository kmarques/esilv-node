// Lire un fichier donné en paramètre. Celui-ci peut être de format JSON, CSV.
// Le but du script étant de lire le fichier, détecter le nombre de lignes de données
// et ressortir les différents nom de colonnes

// Format attendu:
//      Nombre de lignes détecté: 4
//      Nombre de colonnes détecté: 5
//      Colonnes: id, nom, address, dob, email
const fs = require("fs/promises");
const { constants } = require("fs");
const path = require("path");

const [filePath = "", extension = ""] = process.argv.slice(2);

fs.access(filePath, constants.R_OK)
  .then(() => fs.readFile(filePath))
  .then((data) => {
    //const extension = "." + filePath.split(".").pop();
    const extensionF = extension
      ? "." + extension.toLowerCase()
      : path.extname(filePath);

    switch (extensionF) {
      case ".csv":
        return parseCSV(data);
      case ".json":
        return parseJSON(data);
    }
  })
  .then((data) => {
    console.log(`Nombre de lignes détecté: ${data.nbLines}`);
    console.log(`Nombre de colonnes détecté: ${data.nbColumns}`);
    console.log(`Colonnes: ${data.headers.join(", ")}`);
  })
  .catch((e) => console.error(e));

function parseCSV(buffer) {
  const data = buffer.toString();
  const lines = data.split("\n");
  const headers = lines[0].split(";");

  return {
    nbLines: lines.length - 1,
    nbColumns: headers.length,
    headers,
  };
}

function parseJSON(buffer) {
  const lines = JSON.parse(buffer);
  const headers = Object.keys(lines[0]);

  return {
    nbLines: lines.length,
    nbColumns: headers.length,
    headers,
  };
}
