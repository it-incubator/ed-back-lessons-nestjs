import {Controller, Get,} from '@nestjs/common';
import {CommentsService} from "../application/comments.service";

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) {
    }

    @Get()
    async request() {
        return this.commentsService.method();
    }
}
