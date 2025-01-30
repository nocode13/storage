import { ProductTypes } from '~/shared/api/types/product';

const productTypeOptions: Record<ProductTypes, { label: string; value: ProductTypes }> = {
  continuous: {
    label: 'Не штучный',
    value: 'continuous',
  },
  discrete: {
    label: 'Штучный',
    value: 'discrete',
  },
};

const useProductTypeOptions = () => {
  return Object.values(productTypeOptions);
};

export default {
  productTypeOptions,
  useProductTypeOptions,
};
