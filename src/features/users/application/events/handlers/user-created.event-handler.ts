import { UserCreatedEvent } from '../user-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// https://docs.nestjs.com/recipes/cqrs#queries
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor() {}

  handle(event: UserCreatedEvent) {
    // Ошибки в EventHandlers не могут быть пойманы фильтрами исключений:
    // необходимо обрабатывать вручную
    try {
      // do logic
      console.log(
        `UserCreatedEventHandler / User with name: ${event.name} successful created`,
      );
    } catch (e) {
      console.error(e);
    }
  }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler2
  implements IEventHandler<UserCreatedEvent>
{
  constructor() {}

  handle(event: UserCreatedEvent) {
    try {
      // do logic
      console.log(
        `UserCreatedEventHandler2 User with name: ${event.name} successful created`,
      );
    } catch (e) {
      console.error(e);
    }
  }
}
