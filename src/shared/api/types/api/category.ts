export type CreateCategoryBody = {
  name: string;
  description?: string;
};

export type EditCategoryBody = Pick<CreateCategoryBody, 'description'>;
