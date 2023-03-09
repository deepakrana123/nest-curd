import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from './app.interface';
import { CreateStudentDto } from './app.dto';
import { UpdateStudentDto } from './app-update.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}
  // getHello(): string {
  //   return 'Hello World!';
  // }
  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  async getSingleStudent(studentId: string): Promise<IStudent> {
    const singleStudent = await this.studentModel.findById(studentId);
    if (!singleStudent) {
      throw new NotFoundException('student doesnot exist');
    }
    return singleStudent;
  }

  async getAllStudent(): Promise<IStudent[]> {
    const getAllStudent = await this.studentModel.find();
    if (!getAllStudent || getAllStudent.length == 0) {
      throw new NotFoundException('Students not found in this model');
    }
    return getAllStudent;
  }

  async updateAllStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const existStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
      { new: true },
    );
    if (!existStudent) {
      throw new NotFoundException('student doesnot exist');
    }
    return existStudent;
  }

  async deleteStudent(studentId: string): Promise<IStudent> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return deletedStudent;
  }
}
