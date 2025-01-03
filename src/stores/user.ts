import ip from '@/utils/ip';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface UserInfo {
    id: number;
    username: string,
    password: string
    userimg?: string,
    balance: number,
    group: number,
    group_end_time: number
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

    const checkUser = async (reload:boolean = false) => {
        let username = userInfo.value?.username;
        let password = ((userInfo.value?.password)??``) as string;
        const response = await axios.post(`${ip}/user/login`, {
            username,
            password: password.toLowerCase()
        });
        if (response.data.code === 200) {
            if(reload)
            {
                setUser(response.data.data, 'permanent');
            }
            return true;
        } else {
            clearUser();
            return false;
        }
    }

    return {
        userInfo,
        setUser,
        loadUser,
        clearUser,
        checkUser
    };
});