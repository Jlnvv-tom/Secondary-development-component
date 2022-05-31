<template>
  <el-popover
    placement="bottom-start"
    :width="400"
    v-model:visible="visible"
    trigger="click"
  >
    <template #reference>
      <div class="result" @click="visible = true">
        <div>{{ result }}</div>
        <div>
          <el-icon :class="{ rotate: visible }"><arrowDown /></el-icon>
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :offset="2" :span="14">
          <el-select
            v-model="selectValue"
            placeholder="请搜索城市"
            filterable
            :filter-method="filterMethod"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <!-- 头部字母区域 -->
          <div
            class="city-item"
            @click="clickChat(item)"
            v-for="(item, index) in Object.keys(cities)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="400px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row style="margin-bottom: 10px" :id="key">
              <el-col :span="2">{{ key }}:</el-col>
              <el-col :span="22" class="city-name">
                <div
                  class="city-name-item"
                  v-for="(item, index) in value"
                  @click="clickCity(item)"
                  :key="item.id"
                >
                  <div>{{ item.name }}</div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <div
            class="province-item"
            @click="clickChat(item)"
            v-for="(item, index) in Object.keys(provinces)"
            :key="index"
          >
            {{ item }}
          </div>
          <el-scrollbar max-height="400px">
            <template
              v-for="(item, index) in Object.values(provinces)"
              :key="index"
            >
              <template v-for="(item1, index1) in item" :key="index1">
                <el-row style="margin-bottom: 10px" :id="item1.id">
                  <el-col :span="3">{{ item1.name }}:</el-col>
                  <el-col :span="21" class="province-name">
                    <div
                      class="province-name-item"
                      v-for="(item2, index2) in item1.data"
                      @click="clickProvince(item2)"
                      :key="index2"
                    >
                      <div>{{ item2 }}</div>
                    </div>
                  </el-col>
                </el-row>
              </template>
            </template>
          </el-scrollbar>
        </div>
      </template>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import city from "../lib/city";
import province from "../lib/province.json";
import { City } from "./types";

let result = ref<string>("请选择");
let visible = ref<boolean>(false);
let radioValue = ref<string>("按城市"); // 选项

// 搜索框数据
let selectValue = ref<string>("");
let options = ref<City[]>([]);
let allCity = ref<City[]>([]);

// 滚动数据
let cities = ref(city.cities);
let provinces = ref(province);

let emits = defineEmits(["changeCity", "changeProvince"]);

let clickCity = (item: string) => {
  // 给结果赋值
  console.log(item);
  result.value = item;
  visible.value = false;
  emits("changeCity", item);
};

let clickProvince = (item: string) => {
  // 给结果赋值
  result.value = item;
  // 关闭弹出层
  visible.value = false;
  emits("changeProvince", item);
};

let clickChat = (item: string) => {
  console.log(item);
  let el = document.getElementById(item);
  // 使用DOM原生的 scriollIntoView 方法，跳转的标签位置要绑定id， （a标签锚点跳转的方法会影响路由）
  if (el) el.scrollIntoView(); 
};

// 自定义搜索过滤
let filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2);
  if (val === "") {
    options.value = values;
  } else {
    if (radioValue.value === "按城市") {
      // 中文和拼音一起过滤
      options.value = values.filter((item) => {
        return item.name.includes(val) || item.spell.includes(val);
      });
    } else {
      // 中文过滤
      options.value = values.filter((item) => {
        return item.name.includes(val);
      });
    }
  }
};

// 下拉框选择
let changeSelect = (val: number) => {
  let city = allCity.value.find(item => item.id === val)!
  result.value = city.name
  if (radioValue.value === '按城市') {
    emits('changeCity', city)
  } else {
    emits('changeProvince', city.name)
  }
}

onMounted(() => {
  // 获取下拉框的城市数据
  let values = Object.values(cities.value).flat(2);
  // console.log(values);
  allCity.value = values;
  options.value = values;
});
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s linear;
}
.rotate {
  transform: rotate(180deg);
}
.container {
  padding: 6px;
}
.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    cursor: pointer;
  }
}
.city-name,
.province-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .city-name-item,
  .province-name-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>
