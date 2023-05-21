<script setup>
import router from '../router';

</script>
 
<template>
    <div class="w-screen h-screen flex justify-center items-center flex-col space-y-8 bg-gradient-to-r from-red-200 via-sky-300 to-sky-600">
        <div class=" flex w-full h-full mr-6">
            <div class=" flex items-center">
            <img src="/images/404.png" class="w-6/12 h-auto ">
            <div class="flex-col  w-full flex justify-end items-center">
            <h1 class="text-7xl text-center flex text-white mb-8  bounce2">Page Not Found !!</h1>
        <button @click="router.push('/')" class="text-2xl rounded-2xl p-4 bg-sky-600 w-72 h-16 flex flex-col text-white items-center justify-center but">
            <p class="a">Back to home page!</p>
            <img src="/icons/home.svg" alt="" class="h-10 w-10 b">
        </button>
    </div>
             </div>
       
    </div>
    </div>
</template>
 
<style scoped>


.but .b {
    display: none;
}

.but:hover .b {
    display: inline;
}

.but:hover .a {
    display: none;
}



.pulse {
  animation: pulse 2s infinite ease-in-out alternate;
}
@keyframes pulse {
  from { transform: scale(0.8); }
  to { transform: scale(1.0); }
}


.bounce2 {
  animation: bounce2 2s ease infinite;
}
@keyframes bounce2 {
	0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
	40% {transform: translateY(-30px);}
	60% {transform: translateY(-15px);}
}
</style>