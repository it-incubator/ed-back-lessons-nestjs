import {CommentsController} from "./comments/api/comments.controller";
import {CommentsService} from "./comments/application/comments.service";
import {PostsService} from "./posts/application/posts.service";
import {Module} from "@nestjs/common";
import {PostsController} from "./posts/api/posts.controller";
import {BlogsController} from "./blogs/api/blogs.controller";
import {BlogsService} from "./blogs/application/blogs.service";

@Module({
    imports: [],
    controllers: [CommentsController, PostsController, BlogsController],
    providers: [CommentsService, BlogsService, PostsService],
})
export class BlogsModule {
}


