

const isAdminRole = ( req, res, next ) => {
    if( !req.user ) return res.status(500).json({
        msg: 'User not available',
    });
    const user = req.user;
    if(user.role !== 'ADMIN_ROLE') return res.status(401).json({
        msg: 'Unauthorized'
    });

    next()
}

const haveRole = ( ...roles )=>{

    return (req, res, next) => {
        if( !req.user ) return res.status(500).json({
            msg: 'User not available',
        });

        if( !roles.includes( req.user.role)) return res.status(401).json({
            msg: 'Unauthorized'
        });
        next()
    }

}

module.exports = {
    isAdminRole,
    haveRole
}
