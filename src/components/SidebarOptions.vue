<template>
    <div>
        <table>
            <tr>
                <td>
                    <div class="section-block" @click="togglePage(0)" :class="activeNav(0)">Início</div></td>
                <td><div class="section-block" @click="togglePage(1)" :class="activeNav(1)">Posts</div></td>
            </tr>
                <td><div class="section-block" @click="togglePage(2)" :class="activeNav(2)">Sobre Mim</div></td>
                <td><div class="section-block" @click="togglePage(3)" :class="activeNav(3)">Portfólio</div></td>
            <tr>
                <td colspan="2">
                    <i class="fa fa-github"></i>
                    <a href="#">Veja meu Github!</a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data: () => ({
        selectedIndex: 0,
        navUrlList: ['/', '/posts', '/about', '/projects']
    }),
    methods: {
        togglePage(index) {
            this.selectedIndex = index;
            this.$router.push(this.navUrlList[index]);
        },
        activeNav(index) {
            return {
                activenav: (index == this.selectedIndex)
            };
        }
    },
    watch:{
        $route(to, from){
            if (to.path.includes('/post/')) {
                this.selectedIndex = 1;
            }
        }
    } 
}
</script>

<style scoped>
.activenav {
    background-color: rgb(55, 43, 102);
    color: white;
}

table {
    width: 80%;
    margin: 20px 10% 2px 10%;
    text-align: center;
    font-size: 12px;
}

td {
    text-align: center;
    width: 33%;
}

i {
    font-size: 25px;
    padding-top: 15px;
    cursor: pointer;
}

.section-block {
    margin: 4px 4px 4px 4px;
    border-radius: 5px;
    border: 1px solid black;
    cursor: pointer;
}

.section-block:hover {
    background-color: black;
    color: white;
}


span {
    color: black;
    padding: 8px;
    margin: 2% 20% 2% 20%;
    border: 1px solid black;
    border-radius: 2px;
    text-decoration: none;
    text-align: center;
    font-family: 'Nanum Gothic', sans-serif; 
    font-size: 15px;
}

span.active {
    background-color: #4CAF50;
    color: white;
}

/* a:hover:not(.active) {
    background-color: #555;
    color: white;
} */

/* On screens that are less than 700px wide, make the sidebar into a topbar */
/* @media screen and (max-width: 700px) {
    .sidebar a {
        float: left;
    }
} */

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>