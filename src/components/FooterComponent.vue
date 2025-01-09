<template>
    <n-layout-footer>
        <div class="footer-content">
            <div class="footer-section">
                <p>© 2023 <strong>Your Company Name</strong>. All rights reserved.</p>
            </div>
            <div class="footer-section">
                <p>联系邮箱: <strong>contact@yourcompany.com</strong></p>
            </div>
        </div>
    </n-layout-footer>
</template>

<script setup lang="ts">
import { NLayoutFooter } from 'naive-ui';
</script>

<style scoped lang="scss">
$footer-bg-start: #333;
$footer-bg-end: #555;
$footer-text-color: #fff;

.footer-content {
    background: linear-gradient(to right, $footer-bg-start, $footer-bg-end);
    color: $footer-text-color;
    padding: 20px;
    border-top: 1px solid darken($footer-bg-end, 10%);
    position: relative;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #666, #999);
        animation: slide 2s infinite;
    }

    p {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 1.2rem;
        line-height: 1.5;
        text-shadow: 1px 1px 2px darken($footer-bg-end, 20%);
        transition: color 0.3s ease;
        letter-spacing: 0.5px;

        &:not(:first-child) {
            margin-top: 10px;
        }

        &:hover {
            color: lighten($footer-text-color, 20%);
        }

        strong {
            font-weight: 600;
        }
    }

    @media (max-width: 768px) {
        padding: 10px;
        flex-direction: column;

        p {
            font-size: 1rem;
        }
    }
}

.footer-section {
    margin-bottom: 10px;
}

@keyframes slide {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 100% 0;
    }
}

@mixin respond-to($device) {
    @if $device ==mobile {
        @media (max-width: 767px) {
            @content;
        }
    }

    @else if $device ==tablet {
        @media (min-width: 768px) and (max-width: 1023px) {
            @content;
        }
    }

    @else if $device ==desktop {
        @media (min-width: 1024px) {
            @content;
        }
    }
}

@include respond-to(mobile) {
    .footer-content {
        font-size: 1rem;
    }
}
</style>