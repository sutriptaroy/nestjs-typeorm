import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager
  ) {}

  create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0
    })

    const tags = createItemDto.tags.map((createTagDto: CreateTagDto) => new Tag(createTagDto))

    const item = new Item({
      ...createItemDto,
      comments: [],
      tags,
      listing
    })
    return this.entityManager.save(item)
  }

  findAll() {
    return this.itemRepository.find();
  }

  async findOne(id: number) {
    // const item = await this.itemRepository.findOneBy({ id }); ( this is for without relation )
    const item = await this.itemRepository.findOne({ 
      where: { id },
      relations: { listing: true, comments: true, tags: true }
    });

    if (!item) {
      throw new NotFoundException('Item not found')
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('Item not found')
    }

    // Object.assign(item, updateItemDto)

    // const comments = updateItemDto.comments.map((createCommentDto: CreateCommentDto) => new Comment(createCommentDto))
    // item.comments = comments

    // return this.entityManager.save(item)



    // *** Transaction *** //
    await this.entityManager.transaction(async (entityManager) => {
      Object.assign(item, updateItemDto)

      const comments = updateItemDto.comments.map((createCommentDto: CreateCommentDto) => new Comment(createCommentDto))
      item.comments = comments

      await entityManager.save(item)

      const tagContent = `${Math.random()}`
      const tag = new Tag({ content: tagContent })
      await entityManager.save(tag)

      item.tags = [tag]
      const updatedItem = await entityManager.save(item)

      return updatedItem
    })
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('Item not found')
    }

    const res = await this.itemRepository.delete(id);
    if (!res.affected) {
      throw new InternalServerErrorException('Item can\'t be deleted')
    }

    return item
  }
}
