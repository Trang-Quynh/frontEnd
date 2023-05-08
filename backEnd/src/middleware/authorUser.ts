

export const authorUser = (req, res, next) => {
    if(req.decode.role === 'user'){
        next()
    }else{
        res.status(401).json({
            message: 'You must be an user'
        })
    }
}