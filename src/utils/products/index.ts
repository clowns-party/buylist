import { Buylist } from 'src/buylist/buylist.entity';

export const checkoutExistProductInBuylist = (
  buyList: Buylist,
  productId: number,
) => {
  const notEmpty = buyList?.products?.length;
  const product =
    notEmpty && buyList.products.find((product) => product.id === productId);
  return { notEmpty, product };
};
