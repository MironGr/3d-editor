export type TInput = "text" | "select";

export type TSelectOption = { 
  value: string; 
  label: string 
};

export type TParamAction = { 
  type: string; 
  payload?: {
    param: string; 
    value: any;
  },
} 