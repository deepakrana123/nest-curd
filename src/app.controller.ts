// import { Controller, Get } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateStudentDto } from 'src/app.dto';
import { UpdateStudentDto } from 'src/app-update.dto';

@Controller('student')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/true')
  getHello(): string {
    // console.log('hello');
    return 'true';
  }

  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const student = await this.appService.createStudent(createStudentDto);

      return response.status(HttpStatus.CREATED).json({
        student,
        message: 'Student created successfully',
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: err.response,
        message: 'Student not created ',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Body() createStudentDto: UpdateStudentDto,
    @Param('id') studentId: string,
  ) {
    try {
      const studentFound = await this.appService.updateAllStudent(
        studentId,
        createStudentDto,
      );
      return response.status(HttpStatus.OK).json({
        studentFound,
        message: 'Student updated successfully',
      });
    } catch (err) {
      return response.status(err.status).json({
        error: err.response,
        message: 'Id not found ',
      });
    }
  }

  @Get('/:id')
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const existingStudent = await this.appService.getSingleStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllStudent(@Res() response) {
    try {
      const getAllStudent = await this.appService.getAllStudent();
      return response.status(HttpStatus.OK).json({
        message: ' All Student found successfully ',
        getAllStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteSingleStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
    @Param('id') studentId: string,
  ) {
    try {
      const deleteStudent = await this.appService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deleteStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
