import {Injectable} from '@nestjs/common';
import {PostsService} from "../../posts/application/posts.service";

@Injectable()
export class BlogsService {
    constructor(
        private readonly postsService: PostsService
    ) {
    }

    method() {
        return this.postsService.method();
    }

}
