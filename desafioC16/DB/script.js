const { options } = require("./configDB.js");
const knexMaria = require("knex")(options.mysql);
const knexSQlite = require("knex")({
    client: 'sqlite3',
    connection: { filename: "./ecommerce.sqlite"},
    useNullAsDefault: true
  });


knexMaria.schema.createTable("productos", table => {
    table.increments("id"),
    table.string("title"),
    table.integer("price"),
    table.string("thumbnail")
})
.then(() => console.log("Tabla Productos creada correctamente"))
.catch((error) => { console.log(error); throw error})
.finally(() => {
    knexMaria.destroy();
});

knexSQlite.schema.createTable("mensajes", table => {
    table.increments("id"),
    table.string("mail"),
    table.string("date"),
    table.string("message")
})
.then(() => console.log("Tabla Mensajes creada correctamente"))
.catch((error) => { console.log(error); throw error})
.finally(() => {
    knexSQlite.destroy();
});