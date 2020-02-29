<template>
  <div>
    <Select class="kafka-Select" filterable v-model="form.couurse_id">
      <Option v-for="item in course" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select class="kafka-Select" filterable v-model="form.shcool_id">
      <Option v-for="item in school" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        course: { id: 111, name: "xdd" },
        couurse_id: 111,
        shcool: { id: 222, name: "1asdasd" },
        shcool_id: 222
      },
      newCou: [],
      newSchool: [],
      course: [],
      school: []
    };
  },
  methods: {},
  created() {
    var keyMap = {
      id: "value",
      name: "label"
    };
    var obj = {};
    obj = this.form.course;
    for (var key in obj) {
      var newKey = keyMap[key];
      if (newKey) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
    obj = this.form.shcool;
    for (var key in obj) {
      var newKey = keyMap[key];
      if (newKey) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
    this.course.push(this.form.course);
    this.school.push(this.form.shcool);
  }
};
</script>
<style lang="less">
</style>
