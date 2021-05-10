/// <reference types="Cypress" />

describe('Public page sanity checks', () => {
  it('Successfully loads', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/graphql'
      },
      req => {
        if (req.body.operationName === 'ProjectOwner') {
          return {
            data: {
              name: 'mockName'
            }
          }
        }
      }
    )
    cy.visit('/')
  })
})
