cube(`Products`, {
  sql: `SELECT * FROM public.products`,
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    main: {
      measures: [CUBE.count],
      dimensions: [Suppliers.address],
      timeDimension: CUBE.createdAt,
      granularity: `day`,
      type: `rollup`,
      external: true
    },
    withoutGranularity: {
      measures: [Products.count],
      dimensions: [ProductCategories.name],
      type: `rollup`,
      external: true
    },
    withGranularity: {
      measures: [Products.count],
      dimensions: [ProductCategories.name],
      timeDimension: Products.createdAt,
      granularity: `day`,
      type: `rollup`,
      external: true
    }
  },
  joins: {
    Suppliers: {
      sql: `${CUBE}.supplier_id = ${Suppliers}.id`,
      relationship: `belongsTo`
    },
    ProductCategories: {
      sql: `${CUBE}.product_category_id = ${ProductCategories}.id`,
      relationship: `belongsTo`
    }
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, createdAt]
    },
    supplier: {
      type: `number`,
      sql: `supplier_id`
    },
    productCategory: {
      type: `number`,
      sql: `product_category_id`
    },
    percentage: {
      type: `number`,
      format: `percent`,
      sql: `${supplier} * 100.0 / ${productCategory}`
    }
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    name: {
      sql: `name`,
      type: `string`
    },
    description: {
      sql: `description`,
      type: `string`
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    }
  },
  dataSource: `default`
});
