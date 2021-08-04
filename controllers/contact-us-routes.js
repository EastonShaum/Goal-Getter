const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('extra-pages/contact-us', { layout: "main"})
})

module.exports = router;