import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './app.dto';
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}