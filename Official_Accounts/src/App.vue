<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>|
            <router-link to="/submit_scheme">submit_scheme</router-link>|
            <router-link to="/submit_question">submit_question</router-link>
            <router-link to="/submit_apply">submit_apply</router-link>
        </div> -->
        <router-view />
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    position: absolute;
    z-index: 99;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
