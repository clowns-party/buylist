import { CreateProductBuyList } from './dto/create-product-buylist.dto';
import { ProductService } from './product.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProductInList(@Body() newProduct: CreateProductBuyList) {
    return this.productService.createProductForBuylist(newProduct);
  }
}
