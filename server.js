console.log("hola");

// EXPRESS
const express = require('express')
const app = express()
const PORT = 8000

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


// FAKER API 
const { faker } = require('@faker-js/faker');

const crearUsuario = () => {
    return {
        _id:faker.datatype.uuid(),
        nombre:faker.name.firstName(),
        apellido:faker.name.lastName(),
        email:faker.internet.email(),
        password:faker.internet.password(),
        telefono:faker.phone.number(),
    }
}

//MIDDLEWARE
// Toma los datos del post y los añade al campo body del objeto request
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// PSEUDO BASE DE DATOS
const usuarios = []


// ??? RUTAS LECTURAS (GET)   ????
app.get('/usuario', (req, res)=>{
    // console.log(req)
    const nuevoUsuario = crearUsuario()
    // console.log(nuevoUsuario)
    // res.json(nuevoUsuario)
    usuarios.push(nuevoUsuario)
    res.json(usuarios)
})

app.get('/todosusuarios', (req,res) =>{
    res.json(usuarios)
})

app.get('/usuario/:mensaje/:numero', (req, res)=>{
    console.log(req.params)
    const nuevoUsuario = crearUsuario()
    // console.log(nuevoUsuario)
    res.json(nuevoUsuario)
})


// ??? RUTA GUARDAR (POST)   ????
app.post('/crearusuario', (consulta, respuesta)=>{
    console.log(consulta.body)
    // res.json(consulta)
    respuesta.json(consulta.body)
})


// ??? RUTA EDICION (PUT)  ????
app.put('/editarusuario/:id', (req, res)=>{
    const id = req.params.id
    const nuevoArreglo = usuarios.map((personaje)=>{
        if(personaje._id == id){
            personaje.nombre = "SONIC"
        }
        return personaje
    })
    res.json(nuevoArreglo)

} )

// ??> RUTA ELIMINAR (DELETE)  ????
app.delete('/eliminarusuario/:id', (req, res)=>{
    const id = req.params.id
    const nuevoArreglo = usuarios.filter((personaje)=>{
        return personaje._id != id
    })
    res.json(nuevoArreglo)
})


