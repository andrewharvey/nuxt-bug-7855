<template>
</template>
<script>

export default {
  async asyncData ({ params }) {
    const walk = await import(`../store/pages/content.json`)

    return {
      walk: walk.default
    }
  },
  head () {
    return {
      title: this.walk.name
    }
  }
}
</script>
