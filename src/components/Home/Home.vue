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
    <div class="web-socket">
      <h2>WebSocket</h2>
      <button @click="onOpen">WebSocket Connect</button>
      <button @click="onSend()">WebSocket Send</button>
      <button @click="onClose">WebSocketDisconnect</button>
      <div v-html="shovedMessages"></div>
    </div>
    <br>
    <br>
    <div class="web-socket">
      <h2>Server Sent Events</h2>
      <button @click="SSEOpen">SSE Connect</button>
      <button @click="SSEClose">SSE Disconnect</button>
      <button @click="SSEClean()">SSE Clean</button>
      <div class="times">
        <div class="time"
             v-for="(time, index) in stockData"
            :key="index">
          <div v-if="!time.final">
            {{time.id}}. data: {{ time.data }} time: {{ time.time }}
          </div>
          <div v-else> Buy buy</div>
        </div>
      </div>
    </div>
    <br>
    <br>
  </div>
</template>
<script src="./Home.js"></script>
<style src="./Home.scss" scoped lang="scss"></style>
