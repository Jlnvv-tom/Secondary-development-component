<template>
  <div>
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option
        v-for="item in provincesList"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      placeholder="请选择城市"
      v-model="city"
      :disabled="!province"
    >
      <el-option
        v-for="item in citiesList"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select clearable placeholder="请选择区域" v-model="area" :disabled='!province || !city'>
      <el-option
      v-for="item in areasList"
      :key="item.code"
      :value='item.code'
      :label='item.name'
      ></el-option>
    </el-select>
    <el-select clearable placeholder="请选择街道" v-model="street" :disabled='!province || !city || !area'>
      <el-option
      v-for="item in streetsList"
      :key="item.code"
      :value='item.code'
      :label='item.name'
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from "vue";
import data from "../lib/pcas-code.json";

export interface DataItem {
  code: string;
  name: string;
  children?: DataItem[];
}

export interface ChangeData {
  code: string;
  name: string;
}

let province = ref<string>('');
let city = ref<string>('');
let area = ref<string>('');
let street = ref<string>('')

let provincesList = ref(data);
let citiesList = ref<DataItem[]>([]);
let areasList = ref<DataItem[]>([]);
let streetsList = ref<DataItem[]>([])

let emits = defineEmits(['change'])

watch(() => province.value, (val: string) => {
  if (val) {
    citiesList.value = provincesList.value.find((item: any) => item.code === province.value)!.children!;
  }
  city.value = "";
  area.value = "";
  street.value = "";
});

watch(() => city.value, (val: string) => {
  if(val) {
    areasList.value = citiesList.value.find((item: any) => item.code === city.value)!.children!;
  }
  area.value = '';
  street.value = '';
});

watch(() => area.value, (val: string) => {
  if(val) {
    streetsList.value = areasList.value.find((item: any) => item.code === area.value)!.children!;
  }
  street.value = ''
});

watch(() => street.value, (val: string) => {
  if(val) {
    let provinceData: ChangeData = {
      code: province.value,
      name: province.value && data.find((item:any) => item.code === province.value)!.name
    }
    let cityData: ChangeData = {
      code: city.value,
      name: city.value && citiesList.value.find((item: any) => item.code === city.value)!.name
    }
    let areaData: ChangeData = {
      code: area.value,
      name: area.value && areasList.value.find((item: any) => item.code === area.value)!.name
    }
    let streetData: ChangeData = {
      code: val,
      name: val && streetsList.value.find((item: any) => item.code === val)!.name
    }
    emits('change', {
      province: provinceData,
      city: cityData,
      area: areaData,
      street: streetData
    })
  }
})
</script>

<style lang="scss" scoped></style>
