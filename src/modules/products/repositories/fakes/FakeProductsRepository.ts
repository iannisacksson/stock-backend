import { uuid } from 'uuidv4';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import IProductsPaginationDTO from '@modules/products/dtos/IProductsPaginationDTO';
import Product from '../../infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async findAll({
    limit,
    page,
  }: IPaginationDTO): Promise<IProductsPaginationDTO> {
    const total = this.products.length;

    const products = this.products.slice((page - 1) * limit, page * limit);

    return { products, total };
  }

  public async findByIdentifierCode(
    code: string,
  ): Promise<Product | undefined> {
    const findProduct = this.products.find(
      product => product.identifier_code === code,
    );

    return findProduct;
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, productData);

    this.products.push(product);

    return product;
  }

  public async save(productData: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === productData.id,
    );

    this.products[findIndex] = productData;

    return productData;
  }

  public async remove(productData: Product): Promise<void> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === productData.id,
    );

    this.products.splice(findIndex, 0);
  }
}

export default FakeProductsRepository;
