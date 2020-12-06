import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import { PRIORITIES } from '@shared/contants/priorities';

@Entity('order_skus')
class OrderSku {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PRIORITIES })
  priority: PRIORITIES;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  variant_category_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'variant_category_id' })
  variant_category: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderSku;
