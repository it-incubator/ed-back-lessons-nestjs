import {Controller, Get,} from '@nestjs/common';
import {PostsService} from "../application/posts.service";

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService
    ) {
    }

    @Get()
    async request() {
        return this.postsService.method();
    }
}
