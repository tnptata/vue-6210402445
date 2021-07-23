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
        <GChart
            type="ColumnChart"
            :data="chartData"
             :options="chartOptions"
             /> 
        <div>
            <label for="start">ตั้งแต่วันที่</label>
            <input type="text" v-model="date.start">
        </div>
        <div>
            <label for="end" >ถึงวันที่</label>
            <input type="text" v-model="date.end">
        </div>
        <div>
            <button @click="calDate">Add</button>
        </div>
    </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import RecordStore from '@/store/record'
export default {
    components: {
        GChart
    },
    data(){
        return{
            records: [],
            chartData: [
            ["Date", "จำนวนเงิน"],
            ["รายรับ", 0],
            ["รายจ่าย", 0]
            ],
            date:{
                start:"",
                end:""
            }
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
        upDateChart(income,expenses){
            this.chartData=[        
                ["Date", "จำนวนเงิน"],
                ["รายรับ", income],
                ["รายจ่าย", expenses]
            ]
        },
        sortDate(date){
            let oldDate=date.split("/");
            let month = oldDate[1];
            oldDate[1]=oldDate[0];
            oldDate[0]=month;
            let newDate = oldDate.join("/");
            return newDate
        },
        calDate(){
            let income =0;
            let expenses =0;
            
            const start_date = Date.parse(this.sortDate(this.date.start));
            const end_date = Date.parse(this.sortDate(this.date.end));
            console.log(start_date);
            console.log(end_date);
            for(let i =0;i<this.records.length;i++){
                const rec_date = Date.parse(this.sortDate(this.records[i].date));
                if(rec_date >= start_date && rec_date<=end_date ){
                    if(this.records[i].type == "รายรับ"){
                        income+=parseInt(this.records[i].amount)
                    }else{
                        expenses+=parseInt(this.records[i].amount)
                    }
                }
            }
            
            // console.log(start);
            this.upDateChart(income,expenses)
        },
        
    }
}
</script>

<style>
    .rc{
        margin: 20px;
    }
</style>