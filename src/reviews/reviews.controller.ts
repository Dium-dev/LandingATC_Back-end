import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthService } from 'src/auth/jtwAuth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthService)
  @HttpCode(201)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createReview(
    @Body() review: CreateReviewDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/*',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.reviewsService.createReview(review, file);
  }

  @Get()
  async findAllReview() {
    return await this.reviewsService.findAllReview();
  }

  @UseGuards(JwtAuthService)
  @Get(':id')
  async findOneReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.reviewsService.findOneReview(id);
  }

  @UseGuards(JwtAuthService)
  @Patch()
  async updateReview(@Body() updatenReview: UpdateReviewDto) {
    return await this.reviewsService.updateReview(updatenReview);
  }

  @UseGuards(JwtAuthService)
  @Delete(':id')
  async removeReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.reviewsService.removeReview(id);
  }
}
