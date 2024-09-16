const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
    res.send('hello world shop')

})
module.exports = router