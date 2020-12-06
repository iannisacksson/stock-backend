import { PRIORITIES } from '@shared/contants/priorities';

export default interface ICreateOrderSkuDTO {
  product_id: string;
  variant_category_id: string;
  priority: PRIORITIES;
}
