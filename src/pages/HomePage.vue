<template>
    <n-back-top :right="100" />
    <n-flex vertical>
        <n-card>
            <n-space justify="space-between">
                <div style="display: flex; align-items: center;">
                    <n-avatar :size="72" round :style="{ display: isHidden ? 'none' : 'flex' }"
                        :src="userInfo?.userimg" />
                    <div :style="textStyle">
                        <h3 style="margin: 0;">{{ greeting }}</h3>
                        <n-skeleton v-if="loadingTest" width="100%" style="margin-top: 8px" :sharp="false" text />
                        <p v-else style="margin: 0; margin-top: 4px;">{{ apiText }}</p>
                    </div>
                </div>
            </n-space>
        </n-card>
        <n-grid style="margin-top: 15px" cols="1 s:2 m:4" responsive="screen" :x-gap="15" :y-gap="20">
            <n-gi v-for="(card, index) in cards" :key="index">
                <n-card :style="cardStyle" :title="card.title" size="small">
                    <n-flex justify="space-between" align="center">
                        <n-icon size="32">
                            <component :is="card.icon" />
                        </n-icon>
                        <n-statistic tabular-nums>
                            <n-number-animation :from="0" :to="card.value" :precision="card.precision" />
                            <template v-if="card.suffix" #suffix>
                                {{ card.suffix }}
                            </template>
                        </n-statistic>
                    </n-flex>
                </n-card>
            </n-gi>
        </n-grid>
        <n-grid style="margin-top: 15px" cols="24" responsive="screen" :x-gap="32" :y-gap="20">
            <n-gi :span="12">
                <n-card>
                    <div v-if="loadingTrafficInfo">
                        <n-skeleton text style="width: 40%" />
                        <n-skeleton text :repeat="16" />
                        <n-skeleton text style="width: 60%" />
                    </div>
                    <div v-else id="main" style="width: 100%; height: 400px;"></div>
                </n-card>
            </n-gi>
            <n-gi :span="12">
                <n-card>
                    <div v-if="loadingTrafficInfo">
                        <n-skeleton text style="width: 40%" />
                        <n-skeleton text :repeat="16" />
                        <n-skeleton text style="width: 60%" />
                    </div>
                    <div v-else id="usage" style="width: 100%; height: 400px;"></div>
                </n-card>
            </n-gi>
        </n-grid>
    </n-flex>
</template>

<script lang="ts" setup>
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';
import { useThemeVars, NSkeleton, NCard,NBackTop,NFlex,NGrid,NGi,NIcon,NStatistic,NNumberAnimation,NSpace } from 'naive-ui';
import { EChartsOption, init as Einit, graphic } from 'echarts';
import { CheckmarkCircle } from '@vicons/ionicons5';
import axios from 'axios';
// 根据主题自适应样式背景颜色
import { useStyleStore } from '@/stores/style';
// 获取登录信息
import { useUserStore } from '@/stores/user';
import ip from '@/utils/ip';
import { computed, nextTick, onMounted, ref } from 'vue';

const userStore = useUserStore();
const userInfo = userStore.userInfo;

const loadingTest = ref(true)
const loadingPanelInfo = ref(true)
const loadingTrafficInfo = ref(true)


const styleStore = useStyleStore();
const cardStyle = computed(() => styleStore.getCardStyle());


const cards = ref([
    {
        title: '总余额',
        icon: CheckmarkCircle,
        value: 0,
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

axios.post(`${ip}/getCart`, null, {
    headers: {
        Authorization: useUserStore().userInfo?.password
    }
}).then((res) => {
    cards.value[0].value = res.data.cart;
})

axios.post(`${ip}/getCartDetail`, null, {
    headers: {
        Authorization: useUserStore().userInfo?.password
    }
}).then((res) => {
    cards.value[1].value = res.data.totalRecords;
})
const screenStore = useScreenStore();
const { isHidden, screenWidth } = storeToRefs(screenStore);

const textStyle = computed(() => ({
    marginLeft: screenWidth.value >= 600 ? '16px' : '0',
    textAlign: 'left' as const
}));

// 根据时间设置欢迎文字
const currentTime = ref(new Date());


const greeting = computed(() => {
    const hour = currentTime.value.getHours();
    if (hour >= 0 && hour < 6) {
        return `夜深了，${userInfo?.username}，夜晚依然静谧，但新的希望已经开始萌芽。`;
    }
    else if (hour >= 6 && hour < 11) {
        return `早上好，${userInfo?.username}，今天又是充满活力的一天。`;
    }
    else if (hour >= 11 && hour < 14) {
        return `中午好，${userInfo?.username}，享受这温暖的阳光和美味的午餐吧。`;
    }
    else if (hour >= 14 && hour < 15) {
        return `饮茶先啦，${userInfo?.username}，做那么多都没用的，老板不会喜欢你的，喂喝一下茶先吧`;
    }
    else if (hour >= 15 && hour < 17) {
        return `下午好，${userInfo?.username}，午后的时光总是最适合专注与思考。`;
    }
    else if (hour >= 17 && hour < 22) {
        return `晚上好，${userInfo?.username}，夜幕降临，是时候享受片刻宁静了。`;
    }
    else {
        return `少熬夜，${userInfo?.username}，愿你有一个宁静而甜美的梦境。`;
    }
});

onMounted(() => {
    yiyan(); //加载一言
    panelinfo(); //加载面板信息
    trafficInfo(); //加载流量信息
});

// 一言
const apiText = ref('');
const yiyan = async () => {
    try {
        const response = await axios.get(`https://api.oj.cnryh.cn/getOneWord`);
        apiText.value = response.data.hitokoto;
        loadingTest.value = false;
    } catch (error) {
        console.error('一言API调用失败：', error);
    }
};


interface FriendLinks {
    name: string;
    url: string;
    description: string;
}

const friendLinks = ref<FriendLinks[]>([]);
const tunnel_amount = ref('');
const node_amount = ref('');
const user_amount = ref('');
const panelinfo = async () => {
    loadingPanelInfo.value = true
    try {
        const response = await axios.get('https://cf-v2.uapis.cn/panelinfo');
        if (response.data.code === 200) {
            tunnel_amount.value = response.data.data.tunnel_amount;
            node_amount.value = response.data.data.node_amount;
            user_amount.value = response.data.data.user_amount;
            friendLinks.value = response.data.data.friend_links.map((links: FriendLinks) => ({
                name: links.name,
                url: links.url,
                description: links.description,
            }));
        }
    } catch (error) {
        console.error('面板信息API调用失败', error);
    }
    loadingPanelInfo.value = false
};



// ECharts
const themeVars = useThemeVars();

const trafficInfo = async () => {
    loadingTrafficInfo.value = true;
    try {
        const response = await axios.post(`${ip}/getCollection`, null, {
            headers: {
                Authorization: useUserStore().userInfo?.password
            }
        });
        const apiData = response.data;

        // if (apiData.status === 'success') {
        loadingTrafficInfo.value = false;
        await nextTick();
        updateChart(apiData);

    } catch (error) {
        console.error('流量统计API调用错误:', error);
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
        const option2: EChartsOption= {
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