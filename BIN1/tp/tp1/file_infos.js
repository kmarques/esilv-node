// Lire un fichier donné en paramètre. Celui-ci peut être de format JSON, CSV.
// Le but du script étant de lire le fichier, détecter le nombre de lignes de données
// et ressortir les différents nom de colonnes
// Format attendu:
//      Nombre de lignes détecté: 4
//      Nombre de colonnes détecté: 5
//      Colonnes: id, nom, address, dob, email
const fs = require("fs/promises");
const path = require("path");
const { constants } = require("fs");

const [filePath, extensionCLI = ""] = process.argv.slice(2);

fs.access(filePath, constants.R_OK)
  .then(() => fs.readFile(filePath))
  .then((data) => {
    //const extension = path.extname(filePath);
    const extension = extensionCLI.toLowerCase() || filePath.split(".").pop();
    if (extension === "csv") {
      return parseCSV(data);
    }
    if (extension === "json") {
      return parseJSON(data);
    }
    //switch (extension) {
    //  case "csv":
    //    return parseCSV(data);
    //  case "json":
    //    return parseJSON(data);
    //}
  })
  .then((data) => {
    console.log(`Nombre de lignes détecté: ${data.nbLines}`);
    console.log(`Nombre de colonnes détecté: ${data.nbColumns}`);
    console.log(`Colonnes: ${data.columns.join(", ")}`);
  })
  .catch((e) => console.error(e));

const parseJSON = function (buffer) {
  const data = buffer.toString();
  const array = JSON.parse(data);
  const columns = Object.keys(array[0]);
  return {
    nbLines: array.length,
    nbColumns: columns.length,
    columns,
  };
};

const parseCSV = function (buffer) {
  const data = buffer.toString();
  const lines = data.split("\n");
  const columns = lines[0].split(";");
  return {
    nbLines: lines.length - 1,
    nbColumns: columns.length,
    columns,
  };
};
