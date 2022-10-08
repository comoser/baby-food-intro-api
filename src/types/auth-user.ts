import { ParentEntity } from '../parents/parent.entity';

export type AuthUser = Omit<ParentEntity, 'password'>;
