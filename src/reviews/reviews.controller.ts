import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @HttpCode(201)
  @Post()
  async createReview(
    @Body() review: CreateReviewDto
  ) {
    return await this.reviewsService.createReview(review);
  }

  @HttpCode(200)
  @Get()
  async findAllReview() {
    return this.reviewsService.findAllReview();
  }

  @Get('one')
  async findOneReview() {

  }

  @Patch()
  async updateReview(@Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.updateReview(updateReviewDto);
  }

  @Delete(':id')
  async removeReview(@Param('id') id: string) {
    return this.reviewsService.removeReview(+id);
  }
}
