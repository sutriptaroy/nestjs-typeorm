import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';

import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ReturnResponse } from './types/user.types';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<ReturnResponse> {
    const item = await this.itemsService.create(createItemDto);
    return {
      message: 'Item created successfully',
      data: item
    }
  }

  @Get()
  async findAll() {
    const items = await this.itemsService.findAll();
    return {
      message: 'All Items',
      data: items
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(+id);
    return {
      message: 'Item details fetched',
      data: item
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const item = await this.itemsService.update(+id, updateItemDto);
    return {
      message: 'Item details updated successfully',
      data: item
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const item = await this.itemsService.remove(+id);
    return {
      message: 'Item deleted successfully',
      data: item
    }
  }
}
