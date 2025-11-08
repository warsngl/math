<template>
  <nav class="bg-purple-800 bg-opacity-90 rounded-xl p-4 shadow-xl">
    <ul class="navbar flex justify-around items-center">
      <li>
        <router-link 
          to="/" 
          class="px-6 py-2 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200"
          active-class="bg-green-500"
        >
          Задачи
        </router-link>
      </li>
      <li>
        <router-link 
          to="/settings" 
          class="px-6 py-2 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200"
          active-class="bg-green-500"
        >
          Настройки
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>