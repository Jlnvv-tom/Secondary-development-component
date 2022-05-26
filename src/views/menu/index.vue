<template>
  <div class="container">
    <div style="width: 200px">
      <w-menu :data="data1" defaultActive="1" a="2"></w-menu>
    </div>
    <div style="width: 200px">
      <w-infinite-menu
        :data="data2"
        defaultActive="2"
        text-color="green"
      ></w-infinite-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
let data1 = [
  {
    name: "导航一",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航二",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航三",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
      },
    ],
  },
];
let data2 = [
  {
    name: "导航一",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航二",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航三",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
        children: [
          {
            name: "导航3-1-1",
            index: "3-1-1",
            icon: "Document",
            children: [
              {
                name: "导航3-1-1-1",
                index: "3-1-1-1",
                icon: "Document",
                children: [
                  {
                    name: "导航3-1-1-1",
                    index: "3-1-1-1",
                    icon: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
