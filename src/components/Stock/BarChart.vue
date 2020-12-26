<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Array,
      required: false,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Price",
            borderColor: "#249EBF",
            pointBackgroundColor: "rgba(0,0,0,0)",
            pointBorderColor: "rgba(0,0,0,0)",
            pointHoverBorderColor: "#249EBF",
            pointHoverBackgroundColor: "#fff",
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointHoverBorderWidth: 1,
            borderWidth: 1,
            backgroundColor: this.gradient,
            data: [],
          },
        ],
      },
      options: {
        showScale: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
              gridLines: {
                display: true,
                color: "#EEF0F4",
                borderDash: [30000, 90000],
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        tooltips: {
          backgroundColor: "#4F5565",
          titleFontStyle: "normal",
          titleFontSize: 18,
          bodyFontFamily: "'Proxima Nova', sans-serif",
          cornerRadius: 3,
          bodyFontColor: "#20C4C8",
          bodyFontSize: 14,
          xPadding: 14,
          yPadding: 14,
          displayColors: false,
          mode: "index",
          intersect: false,
          callbacks: {
            title: (tooltipItem) => {
              return `🗓 ${tooltipItem[0].xLabel}`;
            },
            label: (tooltipItem, data) => {
              let dataset = data.datasets[tooltipItem.datasetIndex];
              let currentValue = dataset.data[tooltipItem.index];
              return `📦 ${currentValue.toLocaleString()}`;
            },
          },
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  beforeMount() {},
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(52, 217, 221, 0.6)");
    this.gradient.addColorStop(0.5, "rgba(52, 217, 221, 0.25)");
    this.gradient.addColorStop(1, "rgba(52, 217, 221, 0)");
    this.datacollection.labels = this.chartLabels;
    this.datacollection.datasets[0].data = this.chartData;
    this.renderChart(this.datacollection, this.options);
  },
};
</script>
