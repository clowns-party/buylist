import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtReqUser } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BuylistService } from './buylist.service';
import { CreateBuylistDto } from './dto/create-buylist.dto';
import { UpdateBuylistDto } from './dto/update-buylist.dto';

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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req: { user: JwtReqUser }, @Param('id') id: string) {
    return this.buylistService.delete(Number(id), req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: { user: JwtReqUser },
    @Body() dto: UpdateBuylistDto,
  ) {
    return this.buylistService.update(Number(id), dto, req.user);
  }
}
