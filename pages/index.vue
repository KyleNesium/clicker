<template>
  <div class="container flex mt-4" @selectstart.prevent>
    <div class="flex-none w-40">
      <ClickPanel />
    </div>

    <div class="flex-none mt-4 w-64">
      <CommercePanel />
      <BuildingList />
    </div>

    <div class="flex-grow mt-4">
      <UpgradesPanel />
    </div>
  </div>
</template>

<script>
import BuildingList from '~/components/BuildingList'
import ClickPanel from '~/components/ClickPanel'
import CommercePanel from '~/components/CommercePanel'
import UpgradesPanel from '~/components/UpgradesPanel'

export default {
  components: {
    BuildingList,
    ClickPanel,
    CommercePanel,
    UpgradesPanel,
  },
}
</script>
