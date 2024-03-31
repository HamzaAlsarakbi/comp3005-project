export interface Class {
  class_id: number;
  name: string;
  type: ClassType;
  description: string;
}

export enum ClassType {
  PERSONAL = 'personal',
  GROUP = 'group'
}