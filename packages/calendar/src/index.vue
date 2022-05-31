<template>
  <div id="calendar"></div>
</template>

<script lang="ts" setup>
// 在vite里面使用fullcalendar 需要引入一个包
import "@fullcalendar/core/vdom";
import { Calendar, EventClickArg } from "@fullcalendar/core";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { ref, onMounted, PropType, watch } from "vue";
import { EventItem } from "./types";

let props = defineProps({
  // 日历显示的语言
  local: {
    type: String,
    default: "zh-cn",
  },
  // 视图模式
  initialView: {
    type: String,
    default: "dayGridMonth",
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: "今天",
        month: "月",
        week: "周",
        day: "日",
        prevYear: "上一年",
        nextYear: "下一年",
        prev: "上一月",
        next: "下一月",
      };
    },
  },
  // 头部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: "title",
        center: "",
        end: "prev today next",
      };
    },
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
  },
  // 日历事件
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => [],
  },
  // 自定义渲染内容方法
  eventContent: {
    type: Function,
  },
});

let emits = defineEmits(["date-click", "event-click"]);

// 日历对象
let calendar = ref<Calendar>();

// 生成日历的方法
let renderCalendar = () => {
  let el = document.getElementById("calendar");
  if (el) {
    // 日历的配置选项
    calendar.value = new Calendar(el, {
      // 使用到的插件
      plugins: [daygridPlugin, interactionPlugin],
      // 视图模式
      initialView: props.initialView,
      // 语言
      locale: props.local,
      // 按钮文字
      buttonText: props.buttonText,
      // 头部工具栏
      headerToolbar: props.headerToolbar,
      // 底部工具栏
      footerToolbar: props.footerToolbar,
      // 事件源
      eventSources: [
        {
          // 生成事件
          events(e, callback) {
            if (props.events.length) callback(props.events);
            else callback([]);
          },
        },
      ],
      // 点击日历的某一天
      dateClick(info: DateClickArg) {
        // console.log(info)
        emits("date-click", info);
      },
      // 点击日历上的时间
      eventClick(info: EventClickArg) {
        // console.log('eventClick', info)
        emits("event-click", info);
      },
      // 显示事件的结束时间
      displayEventEnd: true,
      // 自定义渲染内容
      eventContent: props.eventContent,
    });
    calendar.value.render();
  }
};

// 监听事件源的变化
watch(
  () => props.events,
  () => {
    renderCalendar();
  },
  { deep: true }
);
onMounted(() => {
  renderCalendar();
});
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
