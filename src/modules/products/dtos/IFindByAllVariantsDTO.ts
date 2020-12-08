import IPaginationDTO from '@shared/dtos/IPaginationDTO';

interface IFindByAllVariantsDTO extends IPaginationDTO {
  variant_category_id?: string;
}

export default IFindByAllVariantsDTO;
