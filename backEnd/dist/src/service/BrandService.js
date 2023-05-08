"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brand_1 = require("../entity/brand");
const data_source_1 = require("../data-source");
class BrandService {
    constructor() {
        this.getAll = async () => {
            let brands = await this.brandRepository.find({});
            return brands;
        };
        this.brandRepository = data_source_1.AppDataSource.getRepository(brand_1.Brand);
    }
}
exports.default = new BrandService();
//# sourceMappingURL=BrandService.js.map