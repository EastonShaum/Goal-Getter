const withAuth = (req, res, nest) => {
    
    if (!req.session.user_id) {  

    } else {

    next();

    }
}

module.exports = withAuth