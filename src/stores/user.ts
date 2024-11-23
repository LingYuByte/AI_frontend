import { defineStore } from 'pinia';
import { ref } from 'vue';

interface UserInfo {
    id: number;
    username: string,
    password: string
    userimg?: string
}

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<UserInfo | null>(null);
    const setUser = (info: UserInfo, duration = 'permanent') => {
        const expiry = duration === '1d' ? new Date().getTime() + 86400000 : null;
        const dataToStore = JSON.stringify({ ...info, expiry });

        localStorage.setItem('userInfo', dataToStore);

        if (duration === '1d') {
            sessionStorage.setItem('userInfo', dataToStore);
        }

        userInfo.value = info;
        userInfo.value!.userimg = info.userimg??`https://www.loliapi.com/acg/pp/`;
    };

    const loadUser = () => {
        const savedUserInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
        if (savedUserInfo) {
            const parsedInfo = JSON.parse(savedUserInfo);
            if (parsedInfo.expiry && new Date().getTime() > parsedInfo.expiry) {
                clearUser();
            } else {
                userInfo.value = parsedInfo;
            }
        }
    };

    const clearUser = () => {
        userInfo.value = null;
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('userInfo');
    };

    return {
        userInfo,
        setUser,
        loadUser,
        clearUser,
    };
});