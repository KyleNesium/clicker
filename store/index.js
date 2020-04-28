import costs from '~/mixins/costs'

const units = costs.data().units

export const state = () => ({
  buildings: {
    cursor: {
      count: 10,
      cost: 15,
      cps: 0.1,
    },
    cpu: {
      count: 5,
      cost: 100,
      cps: 1,
    },
    process: {
      count: 0,
      cost: 1.1 * units.kilo,
      cps: 8,
    },
    service: {
      count: 0,
      cost: 12 * units.kilo,
      cps: 47,
    },
    computer: {
      count: 0,
      cost: 130 * units.kilo,
      cps: 260,
    },
    cluster: {
      count: 0,
      cost: 1.4 * units.mega,
      cps: 1.4 * units.kilo,
    },
    dataCenter: {
      count: 0,
      cost: 20 * units.mega,
      cps: 7.8 * units.kilo,
    },
  },
  clicks: 0,
  defaultPurchaseAmount: 1,
  factor: 1,
  purchaseAmount: 1,
  purchaseAmounts: [1, 10, 100],
  upgrades: {},
})

export const mutations = {
  build(state, { id }) {
    let building = state.buildings[id]
    let cost = costs.methods.buildingCost(building, state.purchaseAmount)

    if (cost <= state.clicks) {
      state.clicks = Math.round(state.clicks - cost)
      state.buildings[id].count += state.purchaseAmount
    } else {
      console.error('cannot afford this', { cost, clicks: state.clicks })
    }
  },
  click(state, { amount }) {
    state.clicks += amount
  },
  resetPurchaseAmount(state) {
    state.purchaseAmount = state.defaultPurchaseAmount
  },
  setDefaultPurchaseAmount(state, { amount }) {
    state.purchaseAmount = state.defaultPurchaseAmount = amount
  },
  setPurchaseAmount(state, { amount }) {
    state.purchaseAmount = amount
  },
  upgrade(state, { id }) {
    let upgrade = state.upgrades[id]

    if (upgrade.cost <= state.clicks) {
      if (upgrade.building) {
        state.buildings[upgrade.building].cps +=
          state.buildings[upgrade.building].cps * upgrade.factor
      } else {
        state.factor += state.factor * upgrade.factor
      }
      state.clicks = Math.round(state.clicks - upgrade.cost)
      upgrade.bought = true
    } else {
      console.error('cannot afford this', {
        cost: upgrade.cost,
        clicks: state.clicks,
      })
    }
  },
}
