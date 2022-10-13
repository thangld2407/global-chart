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
        <trading-vue
          :data="chart"
          :width="width"
          :height="height"
          :color-back="colors.colorBack"
          :color-grid="colors.colorGrid"
          :color-text="colors.colorText"
          :toolbar="true"
        ></trading-vue>
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
                  <b-form-select
                    v-model="exchange"
                    :options="exchangeList"
                  ></b-form-select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-4">
            <div class="card">
              <div class="card-header">
                <h5>Loại Biểu Đồ</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <b-form-select
                    v-model="symbol"
                    :options="symbolList"
                  ></b-form-select>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-4">
            <b-form-datepicker
              id="startDate"
              placeholder="Start Date"
              v-model="startDate"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="col-md-12">
            <b-form-datepicker
              id="endDate"
              placeholder="End Date"
              v-model="endDate"
              class="mb-2"
            ></b-form-datepicker>
          </div>

          <div class="col-md-12 text-center mt-4">
            <b-button variant="primary">Load Data</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TradingVue, DataCube } from 'trading-vue-js'
import Data from '../data.json'
export default {
  name: 'ChartComponent',
  components: { TradingVue },
  methods: {
    onResize() {
      this.width = window.innerWidth - 550
      this.height = window.innerHeight - 50
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    window.dc = this.chart
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
        { value: 'ftx', text: 'FTX' },
      ],
      symbol: null,
      symbolList: [
        { value: null, text: 'Lựa chọn loại tiền tệ' },
        { value: 'btc_usdt', text: 'BTC_USDT' },
        { value: 'ETH', text: 'ETH' },
        { value: 'LUNA', text: 'LUNA_USDT' },
      ],
    }
  },
}
</script>
