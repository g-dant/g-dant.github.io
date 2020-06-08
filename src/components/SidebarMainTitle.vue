<template>
    <div>
        <h4 class="title"><slot></slot></h4>
        <p>
            As aventuras de um programador nerd que crê
            que robôs podem preparar até o seu café!
        </p>
    </div>
</template>

<style scoped>
.title { 
    text-transform: uppercase;
    text-align: center;
    margin: 25px 32px 15px 32px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-bottom: 1px solid #000;
    border-top: 1px solid #000
}
p {
    font-size: 12px;
    padding: 2px 8% 0px 8%;
    text-align: center;
    font-weight: bold;
}
</style>