import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import VariantCategory from './VariantCategory';

@Entity('variants')
class Variant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  variant_category_id: string;

  @ManyToOne(() => VariantCategory)
  @JoinColumn({ name: 'variant_category_id' })
  variant_category: VariantCategory;

  @Column()
  name: string;

  @Column()
  identifier_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Variant;
