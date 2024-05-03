import { IsString } from 'class-validator';

export class UpdateUserEmailDto {
  @IsString()
  email: string;
}
