import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/styles/themes.css'
import '@/assets/styles/global.scss'
import persist from 'pinia-plugin-persistedstate';
const app = createApp(App)

const pinia = createPinia();
pinia.use(persist)
app.use(pinia);
router.beforeEach((to, _from, next) => {
    const meta = to.meta as { title?: string; keywords?: string; description?: string };
    if (meta) {
        if (meta.title) {
            document.title = meta.title;
        }
        if (meta.keywords) {
            const keywords = document.querySelector('meta[name="keywords"]');
            if (keywords) {
                keywords.setAttribute('content', meta.keywords);
            } else {
                const metaTag = document.createElement('meta');
                metaTag.name = 'keywords';
                metaTag.content = meta.keywords;
                document.head.appendChild(metaTag);
            }
        }
        if (meta.description) {
            const description = document.querySelector('meta[name="description"]');
            if (description) {
                description.setAttribute('content', meta.description);
            } else {
                const metaTag = document.createElement('meta');
                metaTag.name = 'description';
                metaTag.content = meta.description;
                document.head.appendChild(metaTag);
            }
        }
    }
    next();
}
);

app.use(router);
app.mount('#app');