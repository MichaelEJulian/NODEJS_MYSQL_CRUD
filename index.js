const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'shop_db',
    password: 'shop_db',
    database: 'shop_db'
});

db.connect((err) => {
    if (!err){
        console.log('DB Connected')
    }
    else{
        throw err;
    }
});

app.listen(3000, () => console.log('Server running at port 3000') );

//Get One Product
app.get('/products/:id', (req, res) => {
    const sql = 'SELECT p.name, p.description, p.price, c.name FROM PRODUCTS p, CATEGORIES c WHERE p.category_id = c.id and p.id = ?';
    mysqlConnection.query(sql, req.params.id, (err, rows, field) => {
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err)
        }
    });
});


//Get all Products
app.get('/products', (req, res) => {
    const sql = 'SELECT p.id, p.name, p.description, p.price, c.name FROM PRODUCTS p, CATEGORIES c WHERE p.category_id = c.id ';
    db.query(sql, (err, rows, field) => {
        if (!err){
            res.json({
                data: rows
            });
        }
        else{
            console.log(err)
        }
    });
});

//Get One Product
app.delete('/products/:id', (req, res) => {
    const sql = 'DELETE FROM PRODUCTS WHERE ID = ?';
    db.query(sql, req.params.id, (err, rows, field) => {
        if (!err){
            res.send('Deleted record ' + req.params.id + ' successfully');
        }
        else{
            console.log(err)
        }
    });
});

//Insert a product
app.post('/products', (req, res) => {
    let product = req.body;

    console.log(product);
    var sql = "INSERT INTO PRODUCTS(name, description, price, category_id) VALUES(?, ?, ?, ?)";
    db.query(sql, [product.name, product.description, product.price, product.category_id], (err, result) => {
        if (!err)
            res.send('Successfully inserted product');
        else
            console.log(err);
    })
});

//Update a product
app.put('/products', (req, res) => {
    let product = req.body;
    var sql = "UPDATE PRODUCTS set name=?, description=?, price=?, category_id=? WHERE id=?";
    db.query(sql, [product.name, product.description, product.price, product.category_id, product.id], (err, result) => {
        if (!err)
            res.send('Updated record successfully');
        else
            console.log(err);
    })
});