<template>
  <div class="table-graph">
        <h2>ตารางบันทึกรายรับ-รายจ่าย</h2>
        <table class="table-record">
            <thead>
                <tr>
                    <th>#</th>
                    <th>รายการ</th>
                    <th>วัน-เดือน-ปี</th>
                    <th>ประเภท</th>
                    <th>จำนวน</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in records" :key="index">
                    <td>{{ index+1 }}</td>
                    <td v-if="record.list==''">ไม่ระบุ</td>
                    <td v-if="record.list!=''">{{ record.list}}</td>
                    <td v-if="record.date=='--'">ไม่ระบุ</td>
                    <td v-if="record.date!='--'">{{ record.date}}</td>
                    <td v-if="record.type==''">ไม่ระบุ</td>
                    <td v-if="record.type!=''">{{ record.type}}</td>
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
        <h2>กราฟเปรียบเทียบรายรับ-รายจ่าย</h2>
        <GChart
            type="ColumnChart"
            :data="chartData"
             :options="chartOptions"
             /> 
        <h3>เลือกช่วงเวลา</h3>
        <div class="date-scope">
            <div>
                <label for="start">ตั้งแต่วันที่</label>
                <input type="date" id="sDate" name="sDate" class="start-input" v-model="date.start">
            </div>
            <div>
                <label for="end" >ถึงวันที่</label>
                <input type="date" id="eDate" name="eDate" class="end-input"  v-model="date.end">
            </div>
            <div>
                <button @click="calDate" class="okBtn">Ok</button>
            </div>
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
        formatDateInput(editDate){
          let oldDate = editDate.split("-")
          let date = oldDate[2];
          oldDate[2]=oldDate[0];
          oldDate[0]=date;
          let newDate = oldDate.join("-");
          return newDate
        },
        formatRecordDate(date){
            let oldDate=date.split("-");
            let month = oldDate[1];
            oldDate[1]=oldDate[0];
            oldDate[0]=month;
            let newDate = oldDate.join("-");
            return newDate
        },
        calDate(){
            let income =0;
            let expenses =0;
            if(this.date.start=="" && this.date.end==""){
                for(let i =0;i<this.records.length;i++){
                    if(this.records[i].type == "รายรับ"){
                        income+=parseInt(this.records[i].amount)
                    }else{
                        expenses+=parseInt(this.records[i].amount)
                    }
                }
            }
            else if(this.date.start==""){
                const end_date = Date.parse(this.formatRecordDate(this.formatDateInput(this.date.end)));
                for(let i =0;i<this.records.length;i++){
                    const rec_date = Date.parse(this.formatRecordDate(this.records[i].date));
                    if(rec_date<=end_date ){
                        if(this.records[i].type == "รายรับ"){
                            income+=parseInt(this.records[i].amount)
                        }else{
                            expenses+=parseInt(this.records[i].amount)
                        }
                    }
                }
            }
            else if(this.date.end==""){
                const start_date = Date.parse(this.formatRecordDate(this.formatDateInput(this.date.start)));
                for(let i =0;i<this.records.length;i++){
                    const rec_date = Date.parse(this.formatRecordDate(this.records[i].date));
                    if(rec_date >= start_date ){
                        if(this.records[i].type == "รายรับ"){
                            income+=parseInt(this.records[i].amount)
                        }else{
                            expenses+=parseInt(this.records[i].amount)
                        }
                    }
                }
            }
            else{
                const start_date = Date.parse(this.formatRecordDate(this.formatDateInput(this.date.start)));
                const end_date = Date.parse(this.formatRecordDate(this.formatDateInput(this.date.end)));
                for(let i =0;i<this.records.length;i++){
                    const rec_date = Date.parse(this.formatRecordDate(this.records[i].date));
                    if(rec_date >= start_date && rec_date<=end_date ){
                        if(this.records[i].type == "รายรับ"){
                            income+=parseInt(this.records[i].amount)
                        }else{
                            expenses+=parseInt(this.records[i].amount)
                        }
                    }
                }
            }
            
            this.upDateChart(income,expenses)
        },
        
    }
}
</script>

<style>
    .table-graph{
        margin-top: 30px;
    }
    .table-record{
        margin-left: auto;
        margin-right: auto;
        
    }
    thead th,tbody td{
        border: 1px solid #ddd;
        padding: 8px;
    }
    tbody tr:nth-child(even){
        background-color: #f2f2f2;
    }
    tbody tr:hover {
        background-color: #ddd;
    }
    thead th{
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #42b983;
        color: white;
    }
    .start-input{
        margin-left:20px;
    }
    .end-input{
        margin-left:39px;
    }
    tfoot th{
        color: #42b983;
    }
    h3{
        color: #42b983;
    }
    h2{
        color: #42b983;
        margin-top: 30px;
    }
    table{
        border-collapse: collapse;
        width: 70%;
    }
    .date-scope div{
        margin:10px;
    }
    .okBtn{
        padding-left:10px;
        padding-right:10px;
        border-radius: 3px;
        text-align: center;
        background-color: #42b983;
        color: white;  
    }
</style>