import { CreateProductBuyList } from './dto/create-product-buylist.dto';
import { ProductService } from './product.service';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtReqUser } from 'src/auth/auth.types';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createProductInList(
    @Request() req: { user: JwtReqUser },
    @Body() newProduct: CreateProductBuyList,
  ) {
    return this.productService.createProductForBuylist(newProduct, req.user);
  }
}
