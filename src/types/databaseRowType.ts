export type DatabaseRowType = {
  [key in 'name' | 'profile' | 'date_of_birth']: string;
};
