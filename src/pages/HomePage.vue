<template>
    <NBackTop :right="100" />
    <NFlex vertical>
        <NAlert title="使用前提醒" type="warning" v-if="showWarning" closable v-on:close="closeWarning">
            <span>
                欢迎使用 LingYu Byte AI，
                请先阅读 <a href="/price">价格说明</a>
                ，了解使用限制和价格。
                您可以在页面底部加入 QQ 交流群。
            </span>
        </NAlert>
        <NCard>
            <NSpace justify="space-between">
                <div style="display: flex; align-items: center;">
                    <NAvatar :size="65" round :style="{ display: isHidden ? 'none' : 'flex' }"
                        src="https://www.loliapi.com/acg/pp/" />
                    <div :style="textStyle">
                        <h3 style="margin: 0;">{{ greeting }}</h3>
                        <NSkeleton v-if="loadingTest" width="100%" style="margin-top: 8px" :sharp="false" text />
                        <p v-else style="margin: 0; margin-top: 4px;">{{ apiText }}</p>
                    </div>
                </div>
            </NSpace>
        </NCard>
        <NGrid style="margin-top: 15px" cols="1 s:2 m:4" responsive="screen" :x-gap="15" :y-gap="20">
            <NGridItem v-for="(card, index) in cards" :key="index">
                <NCard :style="cardStyle" :title="card.title" size="small">
                    <NFlex justify="space-between" align="center">
                        <NIcon size="32">
                            <component :is="card.icon" />
                        </NIcon>
                        <NStatistic tabular-nums>
                            <NNumberAnimation :from="0" :to="card.value" :precision="card.precision" />
                            <template v-if="card.suffix" #suffix>
                                {{ card.suffix }}
                            </template>
                        </NStatistic>
                    </NFlex>
                </NCard>
            </NGridItem>
        </NGrid>
        <NGrid style="margin-top: 15px" cols="24" responsive="screen" :x-gap="32" :y-gap="20">
            <NGridItem :span="12">
                <NCard>
                    <div v-if="loadingTrafficInfo">
                        <NSkeleton text style="width: 40%" />
                        <NSkeleton text :repeat="16" />
                        <NSkeleton text style="width: 60%" />
                    </div>
                    <div v-else id="main" style="width: 100%; height: 400px;"></div>
                </NCard>
            </NGridItem>
            <NGridItem :span="12">
                <NCard>
                    <div v-if="loadingTrafficInfo">
                        <NSkeleton text style="width: 40%" />
                        <NSkeleton text :repeat="16" />
                        <NSkeleton text style="width: 60%" />
                    </div>
                    <div v-else id="usage" style="width: 100%; height: 400px;"></div>
                </NCard>
            </NGridItem>
        </NGrid>
    </NFlex>
</template>

<script lang="ts" setup>
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';
import { useThemeVars, NSkeleton, NCard, NBackTop, NFlex, NGrid, NGridItem, NIcon, NStatistic, NNumberAnimation, NSpace, useMessage, NAvatar, NAlert } from 'naive-ui';
import { EChartsOption, init as Einit, graphic } from 'echarts';
import { CheckmarkCircle } from '@vicons/ionicons5';
// 根据主题自适应样式背景颜色
import { useStyleStore } from '@/stores/style';
// 获取登录信息
import { useUserStore } from '@/stores/user';
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue';
import request from '@/utils/request';
const showWarning = ref(localStorage.getItem('closeWarning') === null ? true : false);
function closeWarning() {
    localStorage.setItem('closeWarning', 'true');
    showWarning.value = false;
}
const userStore = useUserStore();
userStore.loadUser();
const userInfo = userStore.userInfo;

const loadingTest = ref(true)
const loadingTrafficInfo = ref(true)
const message = useMessage();
const styleStore = useStyleStore();
const cardStyle = computed(() => styleStore.getCardStyle());
const cards = ref([
    {
        title: '总余额',
        icon: CheckmarkCircle,
        value: userInfo?.balance ?? 0,
        precision: 3,
        suffix: '元',
    },
    {
        title: '您的使用次数',
        icon: CheckmarkCircle,
        value: 0,
        precision: 0,
        suffix: '次',
    },
]);

const screenStore = useScreenStore();
const { isHidden, screenWidth } = storeToRefs(screenStore);

const textStyle = computed(() => ({
    marginLeft: screenWidth.value >= 600 ? '16px' : '0',
    textAlign: 'left' as const
}));

// 根据时间设置欢迎文字
const currentTime = shallowRef(new Date());


const greeting = computed(() => {
    const hour = currentTime.value.getHours();
    if (hour >= 0 && hour < 6) {
        return `夜深了，${userInfo?.username??`旅行者` }，夜晚依然静谧，但新的希望已经开始萌芽。`;
    }
    else if (hour >= 6 && hour < 11) {
        return `早上好，${userInfo?.username??`旅行者`}，今天又是充满活力的一天。`;
    }
    else if (hour >= 11 && hour < 14) {
        return `中午好，${userInfo?.username??`旅行者`}，享受这温暖的阳光和美味的午餐吧。`;
    }
    else if (hour >= 14 && hour < 15) {
        return `饮茶先啦，${userInfo?.username??`旅行者`}，做那么多都没用的，老板不会喜欢你的，喂喝一下茶先吧`;
    }
    else if (hour >= 15 && hour < 17) {
        return `下午好，${userInfo?.username??`旅行者`}，午后的时光总是最适合专注与思考。`;
    }
    else if (hour >= 17 && hour < 22) {
        return `晚上好，${userInfo?.username??`旅行者`}，夜幕降临，是时候享受片刻宁静了。`;
    }
    else {
        return `少熬夜，${userInfo?.username??`旅行者`}，愿你有一个宁静而甜美的梦境。`;
    }
});

onMounted(() => {
    yiyan(); //加载一言
    trafficInfo(); //加载流量信息
});

// 一言
const apiText = ref('');
const yiyan = async () => {
    try {
        apiText.value = `一言`;
        loadingTest.value = false;
    } catch (error) {
        console.error('一言API调用失败：', error);
    }
};

// ECharts
const themeVars = useThemeVars();
const trafficInfo = async () => {
    loadingTrafficInfo.value = true;
    try {
        if (!userInfo?.id) {
            return;
        }
        const res = await request.post(`/user/collection`);
        if (res.status !== 200) {
            message.error('用户统计信息获取失败');
            return;
        }
        loadingTrafficInfo.value = false;
        const { useInfos, count }: { useInfos: IUseInfo[], count: number } = res.data.collection;
        cards.value[1].value = count;
        await nextTick();
        updateChart(groupAndSummarize(useInfos));

    } catch (error) {
        message.error('用户统计信息获取失败');
        console.error('用户统计信息获取失败', error);
    } finally {
        loadingTrafficInfo.value = false;
    }
};

interface ApiDataItem {
    time: string;
    completionTokens: number;
    cost: number;
    count: number;
    promptTokens: number;
    totalTokens: number;
}

// 提取“月-日”部分的函数
function getMMDD(dateString: string): string {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
}

// 按天分组并生成ApiDataItem数组的函数
function groupAndSummarize(useInfos: IUseInfo[]): ApiDataItem[] {
    const groupedData: { [key: string]: ApiDataItem } = {};

    for (const item of useInfos) {
        if (!item.createdAt) continue; // 跳过没有createdAt的记录

        const time = getMMDD(item.createdAt);
        if (!groupedData[time]) {
            groupedData[time] = {
                time: time,
                completionTokens: 0,
                cost: 0,
                count: 0,
                promptTokens: 0,
                totalTokens: 0,
            };
        }

        // 汇总各项数值，处理undefined情况
        groupedData[time].completionTokens += (item.completionTokens || 0);
        groupedData[time].cost += (item.cost || 0);
        groupedData[time].count += 1;
        groupedData[time].promptTokens += (item.promptTokens || 0);
        groupedData[time].totalTokens += (item.totalTokens || 0);
    }

    // 将分组数据转换成ApiDataItem数组
    const apiData: ApiDataItem[] = Object.values(groupedData);
    return apiData;
}



const updateChart = (apiData: ApiDataItem[]) => {
    const chartDom = document.getElementById('main');
    if (chartDom) {
        const myChart = Einit(chartDom as HTMLDivElement);
        const myChart2 = Einit(document.getElementById('usage') as HTMLDivElement);
        // 将 API 返回的数据单位从字节转换为 MB
        const times = apiData.map(item => {
            return new Date(item.time).getMonth() + 1 + '-' + new Date(item.time).getDate();
        });
        const costs = apiData.map(item => item.cost);
        const inputTokens = apiData.map(item => item.promptTokens);
        const outputTokens = apiData.map(item => item.completionTokens);

        const option: EChartsOption = {
            title: {
                text: '花费统计',
                textStyle: {
                    color: themeVars.value.textColorBase
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                textStyle: {
                    color: themeVars.value.textColorBase
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: times,
                axisLabel: {
                    color: themeVars.value.textColorBase
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} CA',
                    color: themeVars.value.textColorBase
                }
            },
            series: [
                {
                    name: '花销',
                    type: 'line',
                    data: costs,
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(0, 221, 255)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(77, 119, 255)'
                            }
                        ])
                    },
                },
            ]
        };
        const option2: EChartsOption = {
            title: {
                text: '用量统计',
                textStyle: {
                    color: themeVars.value.textColorBase
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                textStyle: {
                    color: themeVars.value.textColorBase
                }
            },
            xAxis: {
                data: times,

            },
            yAxis: {
                type: 'value' as 'value',
                axisLabel: {
                    formatter: '{value}',
                    color: themeVars.value.textColorBase
                }
            },

            series: [
                {
                    name: '输入token',
                    type: 'bar',
                    data: inputTokens,
                    stack: 'x',
                    barWidth: '40%'
                },
                {
                    name: '输出token',
                    type: 'bar',
                    data: outputTokens,
                    stack: 'x',
                    barWidth: '40%',

                },

            ]
        };
        // @ts-ignore
        myChart.setOption(option);
        // @ts-ignore
        myChart2.setOption(option2);
    } else {
        console.error('[首页]找不到id为“main”(流量统计面积折线图)的元素。');
    }
};

</script>