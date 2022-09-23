const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const multiparty = require('connect-multiparty')
const cors = require('cors')
const fs = require('fs')

const path = require('path')
const { fstat } = require('fs')

const multipartyMiddleware = multiparty({
    uploadDir: '../images'
})

const PORT = process.env.PORT || 8002

const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is ok"
    })
})

app.post('/uploads', multipartyMiddleware, (req, res) => {
    let tempFile = req.files.upload;
    let temPathFile = tempFile.path

    let targetPathUrl = path.join(__dirname, "../uploads/" + tempFile.name)

    if(path.extname(tempFile.originalFilename).toLowerCase() === "png" || ".jpg" || ".jpeg") {
        fs.rename(temPathFile, targetPathUrl, err => {
            if(err) {
                return console.log(err);
            }

            res.status(200).json({
                uploaded: true,
                url: `localhost:3000/${temPathFile}`
            })
        })
    }

    console.log(req.files.upload);
})

app.listen(PORT, () => {
    console.log(`Server started at : + ${PORT}`);
})