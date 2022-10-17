<template>
  <div class="container-fluid">
    <div class="main-toolbar text-center">
      <div class="main-toolbar__title">
        <h1>Chart</h1>
      </div>
      <div class="main-toolbar__actions row"></div>
    </div>
    <div class="row">
      <div class="col-md-9">
        <trading-vue :data="chart" :width="width" :height="height" :color-back="colors.colorBack"
          :color-grid="colors.colorGrid" :color-text="colors.colorText" :toolbar="true"></trading-vue>
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h5>Sàn Giao Dịch</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <b-form-select v-model="exchange" :options="exchangeList"></b-form-select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-4">
            <div class="card">
              <div class="card-header">
                <h5>Đồng tiền khả dụng</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <b-form-select v-model="symbol" :options="symbolList"></b-form-select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-4">
            <b-form-datepicker id="startDate" placeholder="Start Date" v-model="startDate" class="mb-2">
            </b-form-datepicker>
          </div>
          <div class="col-md-12">
            <b-form-datepicker id="endDate" placeholder="End Date" v-model="endDate" class="mb-2"></b-form-datepicker>
          </div>

          <div class="col-md-12 text-center mt-4">
            <b-button variant="primary" @click="handleLoadData()">
              Load Data
            </b-button>
          </div>
          <div class="col-md-12 text-center mt-4">
            <b-button variant="primary " @click="handleExport()">
              Download Excel
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TradingVue, DataCube } from 'trading-vue-js'
import Data from '../data.json'
import axios from 'axios'
import service from '@/utils/service';
import { convertTime } from "@/helper/toTimeStamp"
export default {
  name: 'ChartComponent',
  components: { TradingVue },
  methods: {
    onResize() {
      this.width = window.innerWidth - 550
      this.height = window.innerHeight - 50
    },
    async handleLoadData() {
      console.log(convertTime(this.startDate));
      console.log(convertTime(this.endDate));

      switch (this.exchange) {
        case "binance":
          this.dataSending = {
            symbol: this.symbol,
            interval: '1m',
            from: convertTime(this.startDate) * 1000,
            to: convertTime(this.endDate) * 1000,
            limit: 1000
          }
          break;
        case "bitmex":
          this.dataSending = {
            symbol: "ETH_USDT",
            resolution: '1m',
            from: 1654304400,
            to: 1654390800,
          }
          break;
      }

      const dataRequest = this.dataSending
      const response = await axios.post(
        'http://localhost:6969/api/binance/ticker',
        dataRequest
      )
      this.dataExport = response.data.data
      Data.ohlcv = response.data.data;
      this.chart = new DataCube(Data);
    },
    handleExport() {
      const rows = this.dataExport
      console.log(rows);
      let csvContent = "data:text/csv;charset=utf-8,";

      rows.forEach(function (rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.csv");
      document.body.appendChild(link);

      link.click();
    }
  },
  computed: {
    changeSelectExchage() {
      return this.exchange
    },
  },
  watch: {
    changeSelectExchage() {
      service.post("symbol/list", {
        type: this.exchange
      }).then((data) => {
        data && data.map((dt) => {
          this.symbolList.push({ text: dt.symbol, value: dt.symbol })
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  data() {
    return {
      chart: new DataCube(Data),
      width: 1400,
      height: 700,
      colors: {
        colorBack: '#fff',
        colorGrid: '#eee',
        colorText: '#333',
      },
      exchange: null,
      exchangeList: [
        { value: null, text: 'Lựa chọn sàn giao dịch' },
        { value: 'binance', text: 'Binance' },
        { value: 'kucoin', text: 'Kucoind' },
        { value: 'bitmex', text: 'Bitmex' },
        { value: 'ftx', text: 'FTX' },
      ],
      symbol: null,
      symbolList: [
        { value: null, text: 'Lựa chọn loại tiền tệ' },
      ],
      startDate: null,
      endDate: null,
      dataSending: null,
      dataExport: [],
    }
  },
}
</script>
