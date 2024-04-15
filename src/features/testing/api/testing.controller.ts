import {Controller, Delete,} from '@nestjs/common';
import {TestingService} from "../application/testing.service";

@Controller('testing')
export class TestingController {
    constructor(private readonly testingService: TestingService) {
        console.log("TestingController")
    }

    @Delete()
    async deleteAllData() {
        return await this.testingService.deleteAllData();
    }
}
