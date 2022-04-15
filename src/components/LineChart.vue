<script>
import { defineComponent, h } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default defineComponent({
  name: 'LineChart',
  components: { Line },
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
      h(Line, {
        chartData: props.chartData,
        chartOptions,
        height: props.height
      })
  }
})
</script>
