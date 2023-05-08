import {Color} from "../entity/color";
import {AppDataSource} from "../data-source";

class ColorService {
    private colorRepository;
    constructor() {
        this.colorRepository = AppDataSource.getRepository(Color);
    }

    getAll = async () => {
        let colors = await this.colorRepository.find({})
        return colors;
    }

}

export default new ColorService();