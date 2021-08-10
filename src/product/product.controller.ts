import { CreateProductBuyList } from './dto/create-product-buylist.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtReqUser } from 'src/auth/auth.types';
import { Delete } from '@nestjs/common';
import { UpdateProductBuyList } from './dto/update-product-buylist.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProduct(@Request() req: { user: JwtReqUser }, @Param('id') id: string) {
    return this.productService.findProduct(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProductInList(
    @Request() req: { user: JwtReqUser },
    @Body() newProduct: CreateProductBuyList,
  ) {
    return this.productService.createProduct(newProduct, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId/:buyListId')
  deleteProductInList(
    @Request() req: { user: JwtReqUser },
    @Param('productId') productId: string,
    @Param('buyListId') buyListId: string,
  ) {
    return this.productService.deleteProduct(
      Number(productId),
      Number(buyListId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':productId/:buyListId')
  updateProductInList(
    @Request() req: { user: JwtReqUser },
    @Param('productId') productId: string,
    @Param('buyListId') buyListId: string,
    @Body() updateProduct: UpdateProductBuyList,
  ) {
    const product = {
      fields: updateProduct,
      productId: Number(productId),
      buyListId: Number(buyListId),
    };
    return this.productService.updateProduct(product);
  }
}
