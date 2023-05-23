import {sequelize} from "../database/models";
import {Product} from "./product";
import {Subproduct} from "./subproduct";
import {Barcode} from "./barcode";

const productRepository = sequelize.getRepository(Product)
const subProductRepository = sequelize.getRepository(Subproduct)
const barcodeRepository = sequelize.getRepository(Barcode)

export async function createProduct(
  name: string,
  price: number,
  category: string,
  subProducts: {
    name: string,
    quantity: number,
    barcodes: string[]
  }[]
): Promise<Product> {
  const transaction = await sequelize.transaction();
  try {
    const product = await productRepository.create({
      name: name,
      price: price,
      category: category
    }, {transaction});

    const subProductPromises = subProducts.map(async subProduct => {
      const newSubProduct = await subProductRepository.create({
        productId: product.id,
        quantity: subProduct.quantity,
        name: subProduct.name
      }, {transaction});

      const barCodePromises = subProduct.barcodes.map(barcode => {
        return barcodeRepository.create({
          subproductId: newSubProduct.id,
          code: barcode
        }, {transaction})
      })
      await Promise.all(barCodePromises)
    });

    await Promise.all(subProductPromises);
    await transaction.commit();
    return product;
  } catch (error) {
    console.log(error)
    await transaction.rollback();
    throw error;
  }
}
