export type Condition = 'overMax' | 'underMin';

export interface Limit {
  threshold: number;
  condition: Condition;
}

export interface Details {
  key: string;
  message: string;
  actual: string | number;
  limit?: Limit;
}
