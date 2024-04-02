export interface IEquipment {
  equipment_id: number;
  name: string;
  wear_rate: number;
  condition: number;
  last_checkup: Date;
}

export interface UEquipment {
  equipment_id: number;
  // no need to include wear_rate because it is const
  condition: number;
}