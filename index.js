/*>> Consigna:  En detalle, que incorpore las siguientes rutas:

Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.

*/

//Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos.
const express = require('express');
const {Router} = express;
const app = express();
app.use(express.json())
const productsRouter = Router();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let productos = []

//GET '/api/productos' -> devuelve todos los productos.
productsRouter.get('/', (req, res)=>{
    res.json(productos)
})


//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
productsRouter.post('/', (req, res)=>{

    const productToAdd = req.body;
    

    let id = 1
    let ids = []
    if(productos.length>0){
        productos.forEach((o)=>{
            ids.push(o.id)
        });
        id = Math.max(...ids) + 1             
    }
                  
    productToAdd.id = id;


    productos.push(productToAdd)


    res.status(200).json({added: productToAdd})
})

// GET '/api/productos/:id' -> devuelve un producto según su id.
productsRouter.get('/:id', (req, res)=>{
    const producto = productos.filter(producto=> producto.id == req.params.id)
    const ids = productos.map(producto=> producto.id)
    if (ids.includes(parseInt(req.params.id))){
        res.json(producto)   
    } else {
        res.send({error: "producto no encontrado"})
    }
    
})

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
productsRouter.put('/:id', (req, res)=>{
    const ids = productos.map(producto=> producto.id)
    productos = productos.filter(producto=> producto.id != req.params.id)
    const productToAdd = req.body;
    productToAdd.id = parseInt(req.params.id);
    
    if (ids.includes(parseInt(req.params.id))){
        productos.push(productToAdd)  
        res.status(200).json({modified: productToAdd})
    } else {
        res.send({error: "producto no encontrado"})
    }
    
    
})

// DELETE '/api/productos/:id' -> elimina un producto según su id.
productsRouter.delete('/:id', (req, res)=>{
    const ids = productos.map(producto=> producto.id)
    console.log(ids)
    console.log(ids.includes(parseInt(req.params.id)))
    if (ids.includes(parseInt(req.params.id))){
        const deletedProduct = productos.filter(producto=> producto.id == req.params.id)
        productos = productos.filter(producto=> producto.id != req.params.id)
        
        res.status(200).json({deleted: deletedProduct})
    } else {
        res.send({error: "producto no encontrado"})
    }

})



app.use('/api/productos', productsRouter)

const PORT = 8080
app.listen(PORT, ()=> console.log(`I´m listening in port ${PORT}`))


