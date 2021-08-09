const router = require('express').Router();

// gets info for the about us page
router.get('/', (req, res) => {
    const loggedIn = req.session.loggedIn 
    
    if (loggedIn){
        
        res.render('extra-pages/about-us', { layout: "main", loggedIn: true})
    } else {
        
        res.render('extra-pages/about-us', { layout: "main", loggedIn: false})
    }
    
})

module.exports = router;