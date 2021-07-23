<template>
  <div class="rc">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>รายการ</th>
                    <th>วัน/เดือน/ปี</th>
                    <th>ประเภท</th>
                    <th>จำนวน</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in records" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ record.list}}</td>
                    <td>{{ record.date}}</td>
                    <td>{{ record.type}}</td>
                    <td>{{ record.amount}}</td>
                </tr>
            </tbody>
            <tfoot class="tb-foot">
                <tr>
                    <th>รวมรายรับ</th>
                    <td>{{ calculate("รายรับ") }}</td>
                    <th>รวมรายจ่าย</th>
                    <td>{{ calculate("รายจ่าย") }}</td>
                    <th>คงเหลือ</th>
                    <td>{{ calculate("รายรับ") - calculate("รายจ่าย")}}</td>
                </tr>
            </tfoot>
        </table>
            
    </div>
</template>

<script>

import RecordStore from '@/store/record'
export default {
      
    data(){
        return{
            records: [],
            
        }
    },
    created(){
            this.fetchRecord()
    },
    methods: {
        fetchRecord(){
                //  เรียก action in store ใช้ dispatch
            RecordStore.dispatch("fetchRecord")

                //เรียก getter in store
            this.records = RecordStore.getters.records
        },
        calculate(type){
            let x=0
            for(let i=0;i<this.records.length;i++){
                
                if(this.records[i].type==type){
                    x+=parseInt(this.records[i].amount);
                }
            }
            return x
        },
        
    }
}
</script>

<style>
    .rc{
        margin: 20px;
    }
</style>