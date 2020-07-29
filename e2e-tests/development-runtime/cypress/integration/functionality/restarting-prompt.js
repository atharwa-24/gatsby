describe(`gatsby-config.js`, () => {
  beforeEach(() => {
    cy.visit(`/`).waitForRouteChange()
  })

  afterEach(async () => {
    cy.task(`resetGatsbyConfig`)
  })

  it(`prompts to restart when changed`, () => {
    cy.on(`window:confirm`, str => {
      expect(str).to.contain(`gatsby-config.js`)

      // Press "Restart"
      return true
    })

    cy.task(`changeGatsbyConfig`)
    cy.get(`[data-cy="restarting-screen"]`).should(`be.visible`)
    // Restarting gatsby develop can take a while
    cy.get(`[data-testid="page-component"]`, { timeout: 30000 }).should(
      `be.visible`
    )
  })
})
