<template>
  <div>
    <!-- <w-notification :value="50"></w-notification>
    <br/>
    <w-notification :value="50" :max="30"></w-notification>
    <br>
    <w-notification :value="50" icon="Bowl"></w-notification>
    <br/>
    <w-notification :value="50" isDot></w-notification> -->
    <br />
    <w-notification :value="50">
      <template #default>
        <w-list
          :list="list"
          :actions="actions"
          @clickItem="clickItem"
          @clickAction="clickAction"
        />
      </template>
    </w-notification>
  </div>
</template>

<script lang="ts" setup>
import { list, actions } from "./data";
let clickItem = (val: any) => {
  console.log(val);
};

let clickAction = (val: any) => {
  console.log(val);
};
</script>

<style lang="scss" scoped></style>
