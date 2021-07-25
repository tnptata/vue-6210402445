<template>
  <div class="record">
      <h1>รายรับ-รายจ่าย</h1>
      <h3>เพิ่มรายการ</h3>
      <div class="form-input">
          <div>
            <label for="list">รายละเอียด</label>
            <input type="text" class="list-input" v-model="form.list">
          </div>
          <div>
            
            <label for="date">วันที่</label>
            <input type="date" id="date" name="date" class="date-input" v-model="form.date">
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
            <input type="number" class="amount-input" v-model="form.amount">
          </div>
          <div>
              <button @click="addRecord" class="addBtn">Add</button>
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
            if(this.form.amount <0){
              this.form.amount*=-1;
            }
            if(this.form.amount==""){
              this.form.amount=0
            }
            let payload = {
                list: this.form.list,
                date: this.formatDate(this.form.date),
                type: this.form.type,
                amount: this.form.amount
            }
            RecordStore.dispatch("addRecord",payload)

            this.clearForm()
        },
        formatDate(editDate){
          let oldDate = editDate.split("-")
          let date = oldDate[2];
          oldDate[2]=oldDate[0];
          oldDate[0]=date;
          let newDate = oldDate.join("-");
          return newDate
        }
    }
}
</script>

<style scoped lang="scss">
  h1,h3{
    color: #42b983;
  }
  .record{
    margin-left: auto;
    margin-right: auto;
  }
  input{
    width: 150px;
  }
  select{
    width: 158px;
    height: 22px;
    margin-left: 31px;
  }
  .date-input{
    margin-left: 51px;
    width: 153px
  }
  .list-input{
    margin-left: 5px;
  }
  .amount-input{
    margin-left: 37px;
  }
  .form-input div{
    margin: 5px;
  }
  .addBtn{
        padding-left:10px;
        padding-right:10px;
        border-radius: 3px;
        text-align: center;
        background-color: #42b983;
        color: white;  
  }
</style>
