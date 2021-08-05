import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuylistService } from './buylist.service';
import { CreateBuylistDto } from './dto/create-buylist.dto';

@Controller('buylist')
export class BuylistController {
  constructor(private readonly buylistService: BuylistService) {}
  @Post()
  createList(@Body() list: CreateBuylistDto) {
    return this.buylistService.create(list);
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
