"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = 'secret';
const auth = (req, res, next) => {
    try {
        let authorization = req.headers.authorization;
        if (authorization) {
            let accessToken = authorization.split(' ')[1];
            if (!accessToken) {
                res.status(401).json({
                    message: 'You are anonymous 1'
                });
            }
            else {
                jsonwebtoken_1.default.verify(accessToken, exports.SECRET, (err, data) => {
                    if (err) {
                        res.status(401).json({
                            message: 'You are anonymous 2'
                        });
                    }
                    else {
                        req.decode = data;
                        next();
                    }
                });
            }
        }
        else {
            res.status(401).json({
                message: 'You are anonymous 3'
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map