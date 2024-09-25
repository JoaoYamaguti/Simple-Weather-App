import express from 'express'

const port = 3369
let app = express()

app.use(express.json())

app.route('/').get((req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => "Servidor Rodando...")