<template>
    <NFlex vertical align="center" justify="center">
        <n-upload v-model:file-list="list" @change="handleFileChange" accept=".png" :multiple="false">
            <n-button>上传图片</n-button>
        </n-upload>
        <div style="overflow:scroll;max-width: 100%;max-height: 60vh;">
            <div ref="canvasContainer" class="canvas-container" :style="{
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`
            }">
            </div>
            <!-- 主画布和蒙版画布将在这里被创建 -->
        </div>
        <NFlex style="width: 40%;" align="center" justify="center">
            <n-button @click="toggleMask">切换蒙版</n-button>
            <n-button v-if="routeAble" @click="rotateImage">旋转</n-button>
            <n-slider v-if="resizAble" v-model:value="scale" :min="0.1" :max="2" :step="0.02" style="width: 100%;" />
            <div @click="exportImage">
                <n-button>导出</n-button>
            </div>
        </NFlex>
    </NFlex>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { NUpload, NButton, NSlider, NFlex, UploadFileInfo } from 'naive-ui';
import { dataURLtoBlobAsync } from '@/utils/url';
const list = ref<UploadFileInfo[]>([]);
let { routeAble = true, resizAble = true, exportFunc = null } = defineProps<{
    routeAble?: boolean,
    resizAble?: boolean,
    exportFunc?: (blob: [Blob, Blob | null]) => void
}>()
const canvasContainer = ref<HTMLDivElement | null>(null);
const maskCanvas = ref<HTMLCanvasElement | null>(null);
let img: HTMLImageElement | null = null;
let mainCanvas: HTMLCanvasElement | null = null;
let mainCtx: CanvasRenderingContext2D | null = null;
let maskCtx: CanvasRenderingContext2D | null = null;

let translateX = ref(0);
let translateY = ref(0);

// 固定的canvas尺寸
let canvasWidth = ref(1024);
let canvasHeight = ref(1024);

// 图片缩放比例
const scale = ref(1.0);
// 旋转角度
let rotationAngle = ref(0);
// 控制蒙版是否开启
let maskEnabled = ref(true);

function handleFileChange(uploadChangeParam) {
    list.value = [uploadChangeParam.fileList[uploadChangeParam.fileList.length - 1]];
    const file = uploadChangeParam.file.file as File;
    const reader = new FileReader();
    reader.onload = () => {
        img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
            setupCanvas();
        };
    };
    reader.readAsDataURL(file);
}

function setupCanvas() {
    if (!canvasContainer.value || !img) return;

    // 计算缩放比例
    const widthCalc = 1;
    const heightCalc = 1;
    // canvasWidth.value = widthCalc * img.width;
    // canvasHeight.value = heightCalc * img.height;
    scale.value = widthCalc > heightCalc ? canvasWidth.value / img.width : canvasHeight.value / img.height;
    console.log(img.width, img.height, scale.value);
    canvasWidth.value = img.width;
    canvasHeight.value = img.height;
    console.log(canvasWidth.value, canvasHeight.value);
    // 创建主画布
    mainCanvas = document.createElement('canvas');
    mainCanvas.width = canvasWidth.value;
    mainCanvas.height = canvasHeight.value;
    canvasContainer.value.appendChild(mainCanvas);
    mainCtx = mainCanvas.getContext('2d');

    // 绘制图片
    drawImageWithTransform();

    // 创建蒙版画布
    maskCanvas.value = document.createElement('canvas');
    maskCanvas.value.width = canvasWidth.value;
    maskCanvas.value.height = canvasHeight.value;
    canvasContainer.value.appendChild(maskCanvas.value);
    maskCtx = maskCanvas.value?.getContext('2d');
    maskCanvas.value.style.position = 'absolute';
    maskCanvas.value.style.top = '0';
    maskCanvas.value.style.left = '0';

    // 根据maskEnabled状态添加事件监听
    toggleEventListeners();
}

function toggleMask() {
    maskEnabled.value = !maskEnabled.value;
    toggleEventListeners();
}

function toggleEventListeners() {
    if (maskEnabled.value) {
        if (maskCanvas.value) {
            maskCanvas.value.addEventListener('mousedown', startPainting);
            maskCanvas.value.addEventListener('mousemove', painting);
            maskCanvas.value.addEventListener('mouseup', stopPainting);
            maskCanvas.value.addEventListener('mouseleave', stopPainting);
            maskCanvas.value!.style.display = 'block';
        }

    } else {
        maskCanvas.value?.removeEventListener('mousedown', startPainting);
        maskCanvas.value?.removeEventListener('mousemove', painting);
        maskCanvas.value?.removeEventListener('mouseup', stopPainting);
        maskCanvas.value?.removeEventListener('mouseleave', stopPainting);
        maskCanvas.value!.style.display = 'none';
    }
}
let flag = false;
// 绘图函数
function drawImageWithTransform() {
    if (!mainCtx || !img) return;

    mainCtx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    mainCtx.save();
    mainCtx.translate(translateX.value, translateY.value);
    mainCtx.rotate(rotationAngle.value);
    // mainCtx.scale(scale.value, scale.value);
    console.log(img.width, img.height, scale.value);
    mainCtx.drawImage(img, 0, 0);
    mainCtx.restore();

    // 绘制蒙版
    if (maskCtx) {
        console.log(img.width, img.height);
        maskCtx.save();
        console.log(mainCtx.getTransform());
        maskCtx.translate(translateX.value, translateY.value);
        // maskCtx.setTransform(mainCtx.getTransform());
        maskCtx.globalAlpha = 0.8;
        console.log(maskCtx);
        maskCtx.fillStyle = 'gray';
        if (!flag) {
            maskCtx.fillRect(0, 0, 10000, 10000);
            flag = true;
        }
        maskCtx.restore();
    }
}

// 蒙版绘画函数
let isPainting = ref(false);
let lastX = ref(0);
let lastY = ref(0);

function startPainting(event: MouseEvent) {
    if (!maskEnabled.value || !maskCtx) return;
    isPainting.value = true;
    const rect = maskCanvas.value!.getBoundingClientRect();
    lastX.value = event.clientX - rect.left;
    lastY.value = event.clientY - rect.top;
}

function painting(event: MouseEvent) {
    if (!isPainting.value || !maskCtx) return;
    const rect = maskCanvas.value!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    maskCtx.globalCompositeOperation = 'destination-out';
    maskCtx.beginPath();
    maskCtx.lineWidth = 20 * scale.value;
    maskCtx.lineCap = 'round';
    maskCtx.moveTo(lastX.value, lastY.value);
    maskCtx.lineTo(x, y);
    maskCtx.stroke();
    maskCtx.closePath();
    lastX.value = x;
    lastY.value = y;
}

function stopPainting() {
    isPainting.value = false;
}
function rotateImage() {
    rotationAngle.value += Math.PI / 4;
    drawImageWithTransform();
}

watch(scale, () => {
    if (!mainCtx || !img) return;
    drawImageWithTransform();
});

function exportImage() {
    if (!mainCanvas || !maskCanvas.value || !img) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasWidth.value;
    tempCanvas.height = canvasHeight.value;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx || !maskCtx) return;

    tempCtx.drawImage(mainCanvas, 0, 0);
    const maskData = maskCtx.getImageData(0, 0, canvasWidth.value, canvasHeight.value);
    const imgData = tempCtx.getImageData(0, 0, canvasWidth.value, canvasHeight.value);

    for (let i = 0; i < maskData.data.length; i += 4) {
        if (maskData.data[i + 3] < 128) { // 涂抹的地方，alpha接近0
            imgData.data[i + 3] = 0;
        }
    }
    tempCtx.putImageData(imgData, 0, 0);
    tempCanvas.toBlob(async (blob) => {
        // blob = await scaleBlob(blob!, img!.width, img!.height);
        if (exportFunc) {
            exportFunc([await dataURLtoBlobAsync(img?.src as string), blob]);
        }
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'edited_image.png';
            a.click();
            URL.revokeObjectURL(url);
        }

    }, 'image/png');
}
</script>

<style lang="scss" scoped>
.canvas-container {
    position: relative;
    border: 1px solid #ccc;
    display: inline-block;
    overflow: hidden;
}

canvas {
    image-rendering: crisp-edges;
}
</style>