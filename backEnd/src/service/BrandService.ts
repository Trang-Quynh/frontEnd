import {Brand} from "../entity/brand";
import {AppDataSource} from "../data-source";

class BrandService {
    private brandRepository;
    constructor() {
        this.brandRepository = AppDataSource.getRepository(Brand);
    }

    getAll = async () => {
        let brands = await this.brandRepository.find({})
        return brands;
    }

}

export default new BrandService();