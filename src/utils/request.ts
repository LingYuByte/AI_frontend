import { useUserStore } from "@/stores/user";
import axios from "axios";
import ip from "./ip";
let userStore = useUserStore();
export const request = axios.create(
    {
        baseURL: ip,
        headers:
        {
            Authorization: userStore.userInfo?.password,
            uid: userStore.userInfo?.id,
        },
        responseType: "json"
    }
);
export default request;