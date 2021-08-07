import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtReqUser } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BuylistService } from './buylist.service';
import { CreateBuylistDto } from './dto/create-buylist.dto';

@Controller('buylist')
export class BuylistController {
  constructor(private readonly buylistService: BuylistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createList(
    @Request() req: { user: JwtReqUser },
    @Body() list: CreateBuylistDto,
  ) {
    return this.buylistService.create(list, req.user);
  }

  @Get()
  getAll() {
    return this.buylistService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.buylistService.getOne(id);
  }
}
