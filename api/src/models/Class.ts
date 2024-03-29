export enum ClassType {
  PERSONAL = 'personal',
  GROUP = 'group'
}

export interface IClass {
  class_id: number;
  name: string;
  type: ClassType;
  description: string;
}