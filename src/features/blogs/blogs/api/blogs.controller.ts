import {Controller, Get,} from '@nestjs/common';
import {BlogsService} from "../application/blogs.service";
import {PostsService} from "../../posts/application/posts.service";

@Controller('blogs')
export class BlogsController {
    constructor(
        private blogsService: BlogsService,
        private postsService: PostsService
    ) {
    }

    @Get()
    async request() {
        return this.blogsService.method();
    }
}
