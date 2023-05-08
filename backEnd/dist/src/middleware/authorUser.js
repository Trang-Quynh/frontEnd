"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorUser = void 0;
const authorUser = (req, res, next) => {
    if (req.decode.role === 'user') {
        next();
    }
    else {
        res.status(401).json({
            message: 'You must be an user'
        });
    }
};
exports.authorUser = authorUser;
//# sourceMappingURL=authorUser.js.map