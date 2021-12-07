const express = require("express");
const vehiculeRouter = require("./routes/vehicule");
const securityRouter = require("./routes/security");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const connection = require("./lib/db");
const verifyJWT = require("./middlewares/verifyJWT");
connection.sync();
const app = express();

/**
 * /users : Operations de collection sur des Users
 * /users/:id : Operations d'item User
 *
 * /vehicules : Operations de collection sur des Vehicules
 * /vehicules/:id : Operations d'item Vehicule
 *
 * GET récupère un ou plusieurs items
 *  - /users
 *      200 : OK
 *  - /users/:id
 *     200 : OK
 *     404 : Not Found
 *
 * POST crée un item
 *  - /users
 *     201 : Created
 *     400 : Bad Request
 *
 * PUT met à jour un item
 *  - /users/:id
 *    200 : OK
 *    400 : Bad Request
 *    404 : Not Found
 *
 * DELETE supprime un item
 *  - /users/:id
 *    204 : No Content
 *    404 : Not Found
 */
app.use(express.json());

app.use("", securityRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use(verifyJWT);
app.use("/vehicules", vehiculeRouter);

app.listen(3000, () => console.log("Server is listening"));
