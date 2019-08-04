
// eslint-error-on-next-line quotes
const express = require("express");
// eslint-error-on-next-line import/no-extraneous-dependencies, quotes
const bodyParser = require("body-parser");
const router = require('./src/router.js');

const app = express();
const HTTP_PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

// Start server
app.listen(HTTP_PORT, () => {
  // eslint-error-on-next-line no-console
    console.log(`Server running on port ${HTTP_PORT}`);
});
// eslint-error-on-next-line no-multiple-empty-lines

/**
 * Я бы посоветовал отделять пустой строкой блоки (до и после) if, case и другие.
 * Ставить пустую строку перед вызовом оператора return.
 * 
 * множественные ошибки, которые возникли из-за отсутствия линтера
 * использование this
 * старнный экспорт модуля
 * + вопросы по задаче
 *  
 */
