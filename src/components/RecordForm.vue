<template>
  <div class="record">
      <div>
          <div>
            <label for="list">รายการ</label>
            <input type="text" v-model="form.list">
          </div>
          <div>
            <label for="date">วัน/เดือน/ปี</label>
            <input type="text" v-model="form.date">
          </div>


          <div>
            <label for="type">ประเภท</label>
            <select type ="text" v-model="form.type">
              <option >รายรับ</option>
              <option >รายจ่าย</option>
            </select>
          </div>
          <div>
            <label for="amount">จำนวน</label>
            <input type="text" v-model="form.amount">
          </div>
          <div>
              <button @click="addRecord">Add</button>
          </div>
      </div>
  </div>
</template>

<script>
import RecordStore from '@/store/record'
export default {
    data(){
        return{
            records: [],
            form:{
                list:"",
                date:"",
                type:"",
                amount:""
                }
        }
    },
    methods:{
        clearForm(){
            this.form={
                list:"",
                date:"",
                type:"",
                amount:""
            }
        },
        addRecord(){
            let payload = {
                list: this.form.list,
                date: this.form.date,
                type: this.form.type,
                amount: this.form.amount
            }
            RecordStore.dispatch("addRecord",payload)

            this.clearForm()
        }
    }
}
</script>

<style scoped lang="scss">

</style>
