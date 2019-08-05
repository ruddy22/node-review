const express = require('express');
// eslint-error-on-next-line quotes
const db = require("./database.js");

const router = express.Router();

// eslint-error-on-next-line quotes, no-unused-vars
router.get("/api/articles", (req, res, next) => {
    // eslint-error-on-next-line quotes
    const sql = "select * from article"; // вынести в отдельный файл
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
          // eslint-error-on-next-line object-curly-spacing, key-spacing
          res.status(403).json({"error":err.message});
          return;
        }
        res.json({
            // eslint-error-on-next-line quote-props, key-spacing
            "message":"Успешно", // вынести в отдельный файл
            // eslint-error-on-next-line quote-props, key-spacing (comma-dangle для airbnb)
            "data":rows
        })
      });
});

// eslint-error-on-next-line quotes, no-unused-vars
router.get("/api/article/:id", (req, res, next) => {
    // нужно проверять входящие параметры, т.к. вместо id может быть подзапрос
    // добавить проверку параметра
    const sql = `select * from article where id = ${req.params.id}`; // вынести в отдельный файл
    const params = [];
    db.get(sql, params, (err, row) => {
        if (err) {
          // eslint-error-on-next-line object-curly-spacing, key-spacing
          res.status(403).json({"error":err.message});
          return;
        }
        // eslint-error-on-next-line no-console
        console.log('row: ', row);
        res.json({
            // eslint-error-on-next-line quote-props, key-spacing
            "message":"Успешно", // вынести в отдельный файл
            // eslint-error-on-next-line quote-props, key-spacing (comma-dangle для airbnb)
            "data":row
        });
      });
});

// eslint-error-on-next-line quotes, no-unused-vars
router.post("/api/article/", (req, res, next) => {
    // eslint-error-on-next-line space-infix-ops
    const errors=[];
    // eslint-error-on-next-line space-before-blocks
    if (!req.body.title){
        errors.push("title обязательно"); // вынести в отдельный файл
    }
    // eslint-error-on-next-line space-before-blocks
    if (!req.body.body){
        errors.push("body обязателен"); // вынести в отдельный файл
    }
    // eslint-error-on-next-line space-before-blocks
    if (errors.length){
        // eslint-error-on-next-line object-curly-spacing, key-spacing
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        title: req.body.title,
        body: req.body.body,
        date: req.body.date // ошибка: данные могут иметь значнеие null
    };
    // eslint-error-on-next-line space-infix-ops
    const sql ='INSERT INTO article (title, body, date) VALUES (?,?,?)'; // вынести в отдельный файл
    // eslint-error-on-next-line space-infix-ops
    const params =[data.title, data.body, data.date];
    // eslint-error-on-next-line quotes, no-unused-vars
    db.run(sql, params, function (err, result) {
        if (err){
            // eslint-error-on-next-line object-curly-spacing, key-spacing
            res.status(403).json({"error": err.message});
            return;
        }
        res.json({
            // eslint-error-on-next-line quote-props, key-spacing
            "message": "Успешно",
            // eslint-error-on-next-line quote-props, key-spacing
            "data": data,
            // eslint-error-on-next-line quote-props, key-spacing (comma-dangle для airbnb)
            "id" : this.lastID
        });
    });
});

// eslint-error-on-next-line quotes, no-unused-vars
router.put("/api/article/:id", (req, res, next) => {
    const data = {
        title: req.body.title,
        body: req.body.body // eslint-error (comma-dangle для airbnb)
    };
    // eslint-error-on-next-line no-console
    console.log(data);
    db.run(
        `UPDATE article set 
           title = COALESCE(?,title),
           body = COALESCE(?,body)
           WHERE id = ?`, // вынести в отдельный файл
        [data.title, data.body, req.params.id],
        // eslint-error-on-next-line no-unused-vars
        (err, result) => {
            // eslint-error-on-next-line space-before-blocks
            if (err){
                // eslint-error-on-next-line no-console
                console.log(err);
                // eslint-error-on-next-line object-curly-spacing, key-spacing
                res.status(403).json({"error": res.message});
                return;
            }
            res.json({
                // eslint-error-on-next-line quotes
                message: "Успешно", // вынести в отдельный файл
                data: data // eslint-error (comma-dangle для airbnb)
            });
    });
});

// eslint-error-on-next-line quotes, no-unused-vars
router.delete("/api/article/:id", (req, res, next) => {
    db.run(
        'DELETE FROM article WHERE id = ?', // вынести в отдельный файл
        req.params.id,
        function (err, result) {
            if (err){
                // eslint-error-on-next-line object-curly-spacing, key-spacing
                res.status(403).json({"error": res.message}); // ошибка: ожидается err.message
                return;
            }
            // eslint-error-on-next-line object-curly-spacing, key-spacing
            res.json({"message":"Удалено", rows: this.changes});
    });
});

// Если никуда не попали
// eslint-error-on-next-line quotes, no-unused-vars
router.get("/", (req, res, next) => {
    // eslint-error-on-next-line object-curly-spacing, key-spacing
    res.json({"message":"Ok"});
});
// в данном случае, лучше реализовать маршрут `notfound` и делать перенаправление на него.

module.exports = router;

/**
 * Общие замечания по модулю:
 * 1. Исправить именование маршрутов для POST, PUT, DELETE, GET item
 *    согласно рекомендациями именования ресурсов-коллекций https://restfulapi.net/resource-naming/.
 *    Иными словами, переименовать `article` в `articles`.
 * 2. Использовать единый подход к возвращаемым данным.
 *    Например:
 *    {
 *      status: <op_status>,
 *      data: <returned_data_here_or_error_message>
 *    }
 *    То есть, меняем `rows` на `data`, а `message` на `status`.
 * 3. Вынести локализацию в отдельный файл, а лучше модуль.
 * 4. Вместо статуса `403` использовать статус `404` или `410`.
 *
 * reviewed by Petrov Aleksei
 */
