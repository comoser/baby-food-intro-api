import { CreateParentResponseDto } from '../../parents/dtos/create/create-parent.response.dto';

export type BabyResponseDto = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isActive: boolean;
  parents: CreateParentResponseDto[] | string[];
};
