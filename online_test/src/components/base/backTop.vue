<comment>
    # 返回顶部
</comment>
<template>
    <BackTop :height="100" :bottom="100">
        <div class="top"> ⇦ 返回顶端</div>
    </BackTop>
</template>
<style scoped>
    .top{
        content: '< 返回顶端';
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        writing-mode: vertical-lr;
        text-align: center;
        border-radius: 2px;
        line-height: 20px;
    }
</style>
