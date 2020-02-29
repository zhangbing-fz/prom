<template>
  <DatePicker
    v-bind="$attrs"
    type="daterange"
    format="yyyy-MM-dd"
    transfer
    :options="options"
    @on-change="valueChange"
    :value="value"
  ></DatePicker>
</template>

<script>
import {
  todayrange,
  yesterdayrange,
  toweekrange,
  lastweekrange,
  tomonthrange,
  lastmonthrange
} from "@/util/date";
export default {
  name: "quick-daterange",
  props: {
    // 为空则默认全部
    quickItems: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {},
  data() {
    return {
      allOptions: [
        {
          type: "today",
          text: "今日",
          value() {
            return todayrange;
          }
        },
        {
          type: "yesterday",
          text: "昨日",
          value() {
            return yesterdayrange;
          }
        },
        {
          type: "toweek",
          text: "本周",
          value() {
            return toweekrange;
          }
        },
        {
          type: "lastweek",
          text: "上周",
          value() {
            return lastweekrange;
          }
        },
        {
          type: "tomonth",
          text: "本月",
          value() {
            return tomonthrange;
          }
        },
        {
          type: "lastweek",
          text: "上月",
          value() {
            return lastmonthrange;
          }
        }
      ]
    };
  },
  computed: {
    shortcuts() {
      if (this.quickItems.length == 0) {
        return this.allOptions;
      }
      return this.allOptions.filter(item => {
        return this.quickItems.indexOf(item.type) > -1;
      });
    },
    options() {
      return {
        shortcuts: this.shortcuts
      };
    }
  },
  methods: {
    valueChange(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
