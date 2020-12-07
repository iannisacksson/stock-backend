import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Sku from '@modules/skus/infra/typeorm/entities/Sku';
import ProductVariant from './ProductVariant';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ProductVariant, productVariant => productVariant.product)
  product_variant: ProductVariant[];

  @OneToMany(() => Sku, sku => sku.product)
  skus: Sku[];

  @Column()
  name: string;

  @Column()
  identifier_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
