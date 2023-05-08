"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../entity/color");
const data_source_1 = require("../data-source");
class ColorService {
    constructor() {
        this.getAll = async () => {
            let colors = await this.colorRepository.find({});
            return colors;
        };
        this.colorRepository = data_source_1.AppDataSource.getRepository(color_1.Color);
    }
}
exports.default = new ColorService();
//# sourceMappingURL=ColorService.js.map