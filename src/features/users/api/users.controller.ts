import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersQueryRepository } from '../infrastructure/users.query-repository';
import { UserCreateModel } from './models/input/create-user.input.model';
import { UserOutputModel } from './models/output/user.output.model';
import { UsersService } from '../application/users.service';
import { NumberPipe } from '../../../common/pipes/number.pipe';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { Request, Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  VeryBigCalculateQueryPayload,
  VeryBigCalculateResultData,
} from '../infrastructure/queries/very-big-calculate';
import { InterlayerNotice } from '../../../base/models/Interlayer';
import {
  CreateUserCommand,
  CreateUserResultData,
} from '../application/usecases/create-user.usecase';

// Tag для swagger
@ApiTags('Users')
@Controller('users')
// Установка guard на весь контроллер
//@UseGuards(AuthGuard)
export class UsersController {
  usersService: UsersService;
  constructor(
    usersService: UsersService,
    private readonly usersQueryRepository: UsersQueryRepository,
    // шина для command
    private readonly commandBus: CommandBus,
    // шина для query
    private readonly queryBus: QueryBus,
  ) {
    this.usersService = usersService;
  }

  @Get()
  async hello(
    // Для работы с query применяя наш кастомный pipe
    @Query('id', NumberPipe) id: number,
    // Для работы с request (импорт Request из express)
    @Req() req: Request,
    // Для работы с response (импорт Response из express)
    // При работе с данным декоратором необходимо установить passthrough: true
    // чтобы работал механизм возврата ответа с помощью return data; или res.json(data)
    @Res({ passthrough: true }) res: Response,
  ) {
    return 'Hello';
  }

  @Get('calculate')
  @ApiOperation({ summary: 'Very Big Calculate' })
  async veryBigCalculate(): Promise<VeryBigCalculateResultData | null> {
    const payload = new VeryBigCalculateQueryPayload();

    const result = await this.queryBus.execute<
      VeryBigCalculateQueryPayload,
      InterlayerNotice<VeryBigCalculateResultData>
    >(payload);

    return result.data;
  }

  @Post()
  // Для переопределения default статус кода https://docs.nestjs.com/controllers#status-code
  @HttpCode(200)
  async create(@Body() createModel: UserCreateModel): Promise<UserOutputModel> {
    const command = new CreateUserCommand(createModel.name, createModel.email);
    const creatingResult = await this.commandBus.execute<
      CreateUserCommand,
      InterlayerNotice<CreateUserResultData>
    >(command);

    if (creatingResult.hasError()) {
      throw new BadRequestException(creatingResult.extensions);
    }

    return await this.usersQueryRepository.getById(creatingResult.data!.userId);
  }

  // :id в декораторе говорит nest о том что это параметр
  // Можно прочитать с помощью @Param("id") и передать в property такое же название параметра
  // Если property не указать, то вернется объект @Param()
  @Delete(':id')
  // Установка guard на данный роут
  @UseGuards(AuthGuard)
  // Pipes из коробки https://docs.nestjs.com/pipes#built-in-pipes
  async delete(@Param('id', ParseIntPipe) id: number) {
    return id;
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return this.usersQueryRepository.getById(id);
  }
}
