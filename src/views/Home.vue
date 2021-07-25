<template>
  <div class="home">
    <record-form></record-form>
    <record-table></record-table>
  </div>
</template>

<script>
import RecordForm from '@/components/RecordForm.vue'
import RecordTable from '@/components/RecordTable.vue'

export default {
  components: {
    RecordForm,
    RecordTable,
  }
}
</script>
<style scoped>
</style>
