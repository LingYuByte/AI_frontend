import { defineStore } from 'pinia';

interface ThemeState {
    theme: string;
    primaryColor: string;
    isAutoTheme: boolean;
    isRGBMode: boolean;
    isDialogBoxHairGlass: boolean;
}
function hexToRgb(hex) {
    let str = hex.replace("#", "");
    if (str.length % 3) {
        return "hex格式不正确！";
    }
    //获取截取的字符长度
    let count = str.length / 3;
    //根据字符串的长度判断是否需要 进行幂次方
    let power = 6 / str.length;
    let r = parseInt("0x" + str.substring(0 * count, 1 * count)) ** power;
    let g = parseInt("0x" + str.substring(1 * count, 2 * count)) ** power;
    let b = parseInt("0x" + str.substring(2 * count)) ** power;

    return `rgb(${r}, ${g}, ${b})`;
}

const THEME_KEY = 'app-theme';
const PRIMARY_COLOR_KEY = 'app-primary-color';
const AUTO_THEME_KEY = 'app-auto-theme';
const RGB_MODE_KEY = 'app-rgb-mode';
const DBH_MODE_KEY = 'app-dialog-box-hair-glass'

export const useThemeStore = defineStore('theme', {
    state: (): ThemeState => ({
        theme: localStorage.getItem(THEME_KEY) || 'light',
        primaryColor: localStorage.getItem(PRIMARY_COLOR_KEY) || '#722ed1',
        isAutoTheme: localStorage.getItem(AUTO_THEME_KEY) === 'true' || localStorage.getItem(AUTO_THEME_KEY) === null,
        isRGBMode: localStorage.getItem(RGB_MODE_KEY) === 'true' || false,
        isDialogBoxHairGlass: localStorage.getItem(DBH_MODE_KEY) === 'true' || false,
    }),
    actions: {
        getTransparentColor(transparent: string): string {
            let color = this.primaryColor;
            if (/#/.test(color)) { color = hexToRgb(color) }
            console.log(color);
            const rgbs = color.match(/\(\s*(\S*)\s*,\s*(\S*)\s*,\s*(\S*)\s*\)/);
            if ((rgbs ?? []).length >= 4) {
                let rgba = `rgba(${rgbs![1]}, ${rgbs![2]}, ${rgbs![3]}, ${transparent})`;
                return rgba;
            }
            else {
                throw new Error(`Invalid color format`);
            }
        },
        setTheme(theme: string) {
            this.theme = theme;
            localStorage.setItem(THEME_KEY, theme);
        },
        setPrimaryColor(color: string) {
            this.primaryColor = color;
            localStorage.setItem(PRIMARY_COLOR_KEY, color);
        },
        setAutoTheme(isAuto: boolean) {
            this.isAutoTheme = isAuto;
            localStorage.setItem(AUTO_THEME_KEY, isAuto.toString());
        },
        setRGBMode(isRGB: boolean) {
            this.isRGBMode = isRGB;
            localStorage.setItem(RGB_MODE_KEY, isRGB.toString());
        },
        setDialogBoxHairGlass(isDBH: boolean) {
            this.isDialogBoxHairGlass = isDBH;
            localStorage.setItem(DBH_MODE_KEY, isDBH.toString())
        }
    },
});
