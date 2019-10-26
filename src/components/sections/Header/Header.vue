<template>
  <header class="s-header">
    <div class="a-container s-header__container">
        <router-link
          class="s-header__logo"
          :to="{name: 'home'}">
          <img
            class="s-header__logo-image"
            src="@images/logo.svg"
            width="60"
            alt="logo"
            title="logo">
        </router-link>
      <nav class="s-header__nav">
        <ul class="s-header__nav-menu">
          <li
            class="s-header__nav-menu-item"
            v-for="(item, index) in nav"
            :key="index">
            <router-link
              class="s-header__nav-menu-link"
              :to="{name: item.name}">{{ item.label }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script src="./Header.js"></script>
<style scoped lang="scss" src="./Header.scss"></style>
