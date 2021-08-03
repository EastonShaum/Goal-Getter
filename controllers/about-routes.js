const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('extra-pages/about', { layout: "main"})
})

module.exports = router;