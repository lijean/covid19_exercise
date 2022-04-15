<script>
import { defineComponent, h } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'DoughnutChart',
  components: { Doughnut },
  props: {
    chartData: {
      type: Object
    },
    chartTitle: {
      type: String
    },
    chartTitleIsShow: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 400
    }
  },
  setup (props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: props.chartTitleIsShow,
          text: props.chartTitle
        }
      }
    }

    return () =>
      h(Doughnut, {
        chartData: props.chartData,
        chartOptions,
        height: props.height
      })
  }
})
</script>
