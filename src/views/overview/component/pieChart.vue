<template>
	<div :style="{ height: '250px' }">
		<Echarts  :option="option" />
	</div>
</template> 
<script setup lang="ts">
import { reactive } from 'vue';
import Echarts from '@/views/component/Recharts/index.vue';

const pieData = reactive([
	{
		name: '大一',
		value: 2100
	},
	{
		name: '大二',
		value: 2502
	},
	{
		name: '大三',
		value: 3156
	}
]);

const option = reactive({
	color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
	legend: {
		top: '10px',
		icon: 'circle',
		color: '#555',
		itemWidth: 10,
		itemHeight: 10
	},
	tooltip: {
		confine: true,
		trigger: 'item',
		formatter: '{b} : {c}'
	},
	series: [
		{
			avoidLabelOverlap: false,
			type: 'pie',
			roseType: 'area', // 玫瑰图
			center: ['50%', '50%'],
			radius: ['30%', '60%'],
			label: {
				formatter: '{b}\n-------------\n{d}%\t{c}',
				fontSize: 16
			},
			labelLine: {
				length: 10,
				length2: 30
			},
			data: pieData
		}
	]
});
</script>

