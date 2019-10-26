<template>
  <div class="a-page p-islands">
    <Header/>
    <main class="p-islands__main">
      <div class="a-container">
        <h1 class="a-title">{{ title }}</h1>
        <div class="p-islands__map-size-title a-subtitle">Choose island map sizes</div>
        <div class="p-islands__map-size">
          <div class="p-islands__map-size-sliders">
            <div class="p-islands__map-size-slider">
              <div class="p-islands__map-size-n">
                <vue-slider
                  :min="2"
                  :max="10"
                  :marks="true"
                  v-model="rows">
                </vue-slider>
              </div>
              <div class="p-islands__map-size-name">N: {{rows}}</div>
            </div>
            <div class="p-islands__map-size-slider">
              <div class="p-islands__map-size-m">
                <vue-slider
                  :min="2"
                  :max="10"
                  :marks="true"
                  v-model="column">
                </vue-slider>
              </div>
              <div class="p-islands__map-size-name">M: {{column}}</div>
            </div>
          </div>
          <div class="p-islands__map-generate-button">
            <button class="a-button p-islands__map-generate"
                    @click="generateIslands()">
              Generate
            </button>
          </div>
        </div>
        <div class="p-islands__count">
          <div class="p-islands__count-results">
            <div class="p-islands__list">
              <div class="p-islands__row"
                   v-for="(row, index) in islands"
                   :key="index">
                <div
                  :class="{'p-islands__cell--island': cell === 1, 'p-islands__cell--water': cell === 0}"
                  class="p-islands__cell"
                  :style="`background: rgb(0, ${(cell + 50)}, 0)`"
                  v-for="(cell, index) in row"
                  :key="index">
                  <span v-if="cell === 1 || cell ===0">{{cell}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-islands__count-results-button">
            <button class="a-button" @click="islandCount(islands)">Count islands</button>
            <div class="p-islands__count-result">
              <span v-if="islandsCount">
                Number of islands <br><span class="p-islands__count-result-number">{{ islandsCount }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script src="./Islands.js"></script>
<style src="./Islands.scss" scoped lang="scss"></style>
