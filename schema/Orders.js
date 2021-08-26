cube(`Orders`, {
  sql: `SELECT * FROM public.orders`,

  measures: {

    noOfProjects: {
      type: `count`,
      title: `# Projects`,
      sql: `${CUBE}."status"`,
  },

  noProjectsContractAwarded: {
      type: `count`,
      title: `# Project under Contract Awarded`,
      sql: `${CUBE}."status"`,
      filters: [{
        sql: `${CUBE}."status" = 'completed'`
      }]
    },
  
  noProjectsContractAwardedRatio:{
    type: `number`, 
    format: `percent`, 
    sql:`${noProjectsContractAwarded} * 100 / ${noOfProjects}`
  },

    number: {
      sql: `number`,
      type: `number`
    }, 

    productId: {
      sql: `product_id`,
      type: `number`
    }, 

  },
  
  dimensions: {
    color: {
      type: `string`,
      case: {
        when: [
          {sql: `(${CUBE[`number`]} BETWEEN 23 AND 24) AND (${CUBE[`productId`]} BETWEEN 41 AND 42)`, label: `red`}
        ],
        else: { label: `Unknown` },
      }
    }
  }
});
