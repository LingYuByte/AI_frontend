import { defineStore } from 'pinia';

// 定义 store
export const useCartStore = defineStore('cart', {
    state: () => ({
        products: [] as ICartItem[],
    }),
    actions: {
        // 添加商品到购物车
        addToCart(product: ICartItem) {
            const existingProduct = this.products.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                this.products.push({ ...product, quantity: 1 });
            }
        },

        // 从购物车移除商品
        removeFromCart(id: number) {
            this.products = this.products.filter(p => p.id !== id);
        },

        // 增加商品数量
        increment(id: number) {
            const product = this.products.find(p => p.id === id);
            if (product) {
                product.quantity++;
            }
        },

        // 减少商品数量
        decrement(id: number) {
            const product = this.products.find(p => p.id === id);
            if (product && product.quantity > 1) {
                product.quantity--;
            } else {
                this.removeFromCart(id);
            }
        },
    },
    persist: true
});

export default useCartStore;