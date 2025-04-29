import { BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

interface QueryOptions {
  qb: SelectQueryBuilder<any>;
  alias: string;
  allowedFields: string[];
  query: any; // The full incoming query object
  relations?: string[];
}

export class QueryToolkitService {
  applyQuery({
    qb,
    alias,
    allowedFields,
    query,
    relations,
  }: QueryOptions): SelectQueryBuilder<any> {
    this.validateFields(query.search_field?.split('|') || [], allowedFields);
    this.autoJoinRelations(qb, alias, query.search_field, relations);
    this.applySearch(qb, alias, allowedFields, query);
    this.applySorting(qb, alias, allowedFields, query);
    this.applyPagination(qb, query);
    return qb;
  }

  private validateFields(fields: string[], allowedFields: string[]) {
    for (const field of fields) {
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(
          `Field "${field}" is not allowed for search or sort.`,
        );
      }
    }
  }

  private applySearch(
    qb: SelectQueryBuilder<any>,
    alias: string,
    allowedFields: string[],
    query: any,
  ) {
    const {
      search_field,
      search_value,
      search_mode = 'or',
      match_mode = 'fuzzy',
    } = query;
    const fields = search_field?.split('|') || [];
    const values = search_value?.split('|') || [];

    const conditions = [];

    fields.forEach((field, i) => {
      const value = values[i] ?? '';
      if (!value || !allowedFields.includes(field)) return;

      const paramKey = `search_val_${i}`;
      const dbField = field.includes('.') ? field : `${alias}.${field}`;
      const operator = match_mode === 'exact' ? '=' : 'ILIKE';
      const paramValue = match_mode === 'exact' ? value : `%${value}%`;

      qb.setParameter(paramKey, paramValue);
      conditions.push(`${dbField} ${operator} :${paramKey}`);
    });

    if (conditions.length > 0) {
      const clause = conditions.join(search_mode === 'and' ? ' AND ' : ' OR ');
      qb.andWhere(`(${clause})`);
    }
  }

  private applySorting(
    qb: SelectQueryBuilder<any>,
    alias: string,
    allowedFields: string[],
    query: any,
  ) {
    const { sort_by, sort_order = 'asc' } = query;

    if (sort_by && allowedFields.includes(sort_by)) {
      const dbField = sort_by.includes('.') ? sort_by : `${alias}.${sort_by}`;
      qb.addOrderBy(
        dbField,
        sort_order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      );
    }
  }

  private applyPagination(qb: SelectQueryBuilder<any>, query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;

    const offset = (page - 1) * limit;

    qb.skip(offset).take(limit);
  }

  private autoJoinRelations(
    qb: SelectQueryBuilder<any>,
    alias: string,
    searchField?: string,
    relationsToJoin?: string[],
  ) {
    if (relationsToJoin) {
      // Always join relations
      relationsToJoin.forEach((relation) => {
        const alreadyJoined = qb.expressionMap.joinAttributes.some(
          (join) => join.alias.name === relation,
        );

        if (!alreadyJoined) {
          qb.leftJoinAndSelect(`${alias}.${relation}`, relation); // Join the relation
        }
      });
    }

    if (!searchField) return;

    const fields = searchField.split('|') || [];

    fields.forEach((field) => {
      if (field.includes('.')) {
        const [relation] = field.split('.');
        console.log(relation);

        const alreadyJoined = qb.expressionMap.joinAttributes.some(
          (join) => join.alias.name === relation,
        );
        console.log(alreadyJoined);
        console.log(qb);

        if (!alreadyJoined) {
          qb.leftJoinAndSelect(`${alias}.${relation}`, relation); // Automatically join relations
        }
      }
    });
  }
}
