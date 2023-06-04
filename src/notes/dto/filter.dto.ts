import { IsDateString, IsEnum, IsOptional } from 'class-validator';
export enum Status {
    done = 'done',
    undone = 'undone',
  }


export class FilterDto {
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: string;
  @IsOptional()
  title?: string;
}
