import {Injectable} from '@nestjs/common';
import {CommentsService} from "../../comments/application/comments.service";

@Injectable()
export class PostsService {
    constructor(
        private readonly commentsService: CommentsService
    ) {
    }

    method() {
        return this.commentsService.method();
    }

}
