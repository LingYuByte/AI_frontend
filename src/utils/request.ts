import { useUserStore } from "@/stores/user";
import axios from "axios";
let userStore = useUserStore();
export const request = axios.create(
    {
        headers:
        {
            Authorization: userStore.userInfo?.password,
            uid: userStore.userInfo?.id,
        },
        responseType: "json"
    }
);
export default request;