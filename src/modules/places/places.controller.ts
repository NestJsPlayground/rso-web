import { Body, Controller, Get, Inject, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiModelProperty, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Model, Schema } from 'mongoose';
import * as rp from 'request-promise-native';
import { environment } from '../../environment';
import * as moment from 'moment';
import { AuthGuard } from '../auth/auth.guard';

export class PlacesData {
  @ApiModelProperty()
  fid         : string;

  @ApiModelProperty()
  name        : string;

  @ApiModelProperty()
  lat         : number;
  @ApiModelProperty()
  lon         : number;

  @ApiModelProperty()
  rawIndex?   : any;
}

@ApiUseTags('places')
@Controller('places')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PlacesController {

  constructor(
    @Inject('EntryModelToken') private readonly entryModel: Model<any>) {
  }

  @Get()
  @ApiResponse({ status: 200, description: `Returns list of all places`})
  async list() {
    return await this.entryModel.find().lean();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: `Get place by id`})
  async get(@Param() params): Promise<any> {
    return await this.entryModel.findById(params.id).lean();
  }

  @Get('pending')
  @ApiResponse({ status: 200, description: `Get pending places (limit 10)`})
  async pending(@Param('id') id: string): Promise<any> {
    return await this.entryModel.findById(id).lean();
  }

  @Post()
  @ApiResponse({ status: 200, description: `Create job`})
  async create(@Body() e: PlacesData) {
    return await new this.entryModel(e).save();
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: `Update job`})
  async update(@Param('id') id: string, @Body() data: PlacesData) {
    return await this.entryModel.findByIdAndUpdate(id, { $set: data });
  }
}
