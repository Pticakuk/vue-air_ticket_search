<template>
  <div class="a-page p-home">
    <Header/>
    <main class="p-home__main">
      <div class="a-container">
        <div class="p-home__links">
          <router-link
            class="p-home__links-search"
            :to="{name: 'search'}">
            <img
              class="p-home__links-image"
              src="@images/search.svg"
              width="300"
              alt="Search"
              title="Search">
            <div class="p-home__link-name">Search</div>
          </router-link>
          <router-link
            class="p-home__links-islands"
            :to="{name: 'islands'}">
            <img
              class="p-home__links-image"
              src="@images/island.svg"
              width="300"
              alt="Island"
              title="Island">
            <div class="p-home__link-name">Islands</div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>
<script src="./Home.js"></script>
<style src="./Home.scss" scoped lang="scss"></style>
