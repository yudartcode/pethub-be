import { pageBuilder, resBuilder } from 'src/core/utils/utils';
import { QueryParamsDto } from './dto/query-params.dto';
import { QueryToolkitService } from './query-toolkit.service';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

export abstract class BaseService<T> {
  constructor(
    protected readonly repo: Repository<T>,
    protected readonly queryToolkit: QueryToolkitService,
  ) {}

  async baseFindAll(
    query: QueryParamsDto,
    allowedFields: string[],
    alias = 'entity',
    relations?: string[],
  ) {
    const qb = this.repo.createQueryBuilder(alias);

    this.queryToolkit.applyQuery({
      qb,
      alias,
      allowedFields,
      query,
      relations,
    });

    const [items, total] = await qb.getManyAndCount();

    return resBuilder(
      HttpStatus.OK,
      true,
      `Get data ${alias} successfully`,
      pageBuilder(
        items,
        total,
        Number(query.limit) || 10,
        Number(query.page) || 1,
      ),
    );
  }
}
