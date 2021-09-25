import {
  Body,
  CacheKey,
  CacheTTL,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtReqUser } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpCacheInterceptor } from 'src/utils/interceptors/httpCache.interceptor';
import { BuylistService } from './buylist.service';
import { GET_BUYLIST_CACHE_KEY } from './constants/buylistCacheKey.constant';
import { CreateBuylistDto } from './dto/create-buylist.dto';
import { UpdateBuylistDto } from './dto/update-buylist.dto';

@UseInterceptors(ClassSerializerInterceptor)
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

  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_BUYLIST_CACHE_KEY)
  @CacheTTL(120)
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
