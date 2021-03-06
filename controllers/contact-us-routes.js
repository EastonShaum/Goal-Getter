const router = require('express').Router();

// provides the contact-us page
router.get('/', (req, res) => {
    const loggedIn = req.session.loggedIn 
    
    if (loggedIn){
        
        res.render('extra-pages/contact-us', { layout: "main", loggedIn: true})
    } else {
        
        res.render('extra-pages/contact-us', { layout: "main", loggedIn: false})
    }
    
    
})

module.exports = router;