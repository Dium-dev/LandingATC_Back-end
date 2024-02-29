import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) { }

  @HttpCode(201)
  @Post()
  async createReview(
    @Body() review: CreateReviewDto
  ) {
    return await this.reviewsService.createReview(review);
  }

  @Get()
  async findAllReview() {
    return await this.reviewsService.findAllReview()
  }

  @Get(':id')
  async findOneReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.reviewsService.findOneReview(id)
  }

  @Patch()
  async updateReview(@Body() updatenReview: UpdateReviewDto) {
    return await this.reviewsService.updateReview(updatenReview);
  }

  @Delete(':id')
  async removeReview(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.reviewsService.removeReview(id);
  }
}
