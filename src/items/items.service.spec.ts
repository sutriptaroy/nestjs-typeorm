import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';

describe('ItemsService', () => {
  let service: ItemsService;
  let itemRepository: Repository<Item>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn()
          }
        },
        {
          provide: EntityManager,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('find all', async () => {
    await service.findAll()
    expect(itemRepository.find).toHaveBeenCalled()
  })
});
