import cloneDeep from 'lodash-es/cloneDeep';
import get from 'lodash-es/get';
import Header from '../sections/Header/Header.vue'
import { mapGetters } from 'vuex';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    Header,
    VueSlider,
  },

  data() {
    return {
      rows: 4,
      column: 5,
      title: 'Islands page',
      islands: [],
      islandsCount: 0,
    };
  },
  computed: {
    ...mapGetters(['generatedIslands'])
  },
  methods: {
    generateIslands({ n, m } = { n: this.rows, m: this.column }) {
      this.islandsCount = 0;
      let generatedArr = [[]];
      for (let x = 0; x < n; x++) {
        generatedArr[x] = [];
        for (let y = 0; y < m; y++) {
          generatedArr[x][y] = Math.random() < 0.7 ? 0 : 1;
        }
      }
      this.islands = cloneDeep(generatedArr);
      this.$store.dispatch('saveIslands', cloneDeep(generatedArr));
    },
    islandCount() {
      this.islands = cloneDeep(this.generatedIslands);
      let mark = 0;
      let islands = 0;
      let rows = this.islands.length, cols = this.islands[0].length;

      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
          if (this.islands[x][y] === 1 ) {
            islands++;
            mark = Math.ceil(Math.random() * 200);
            this.markIsland(x, y, mark);
          }
        }
      }
      this.islandsCount = islands;
      return islands;
    },
    markIsland (x, y, mark) {
      if(get(get(this.islands, x, []), y, 0) !== 1) {
        return false;
      } else {
        this.islands[x][y] = mark;
        for(let i = x - 1; i <= x + 1; i++){
          for(let j = y - 1; j <= y + 1; j++){
            if((i !== x && j === y) || (i === x && j !== y)) {
              this.markIsland (i, j, mark);
            }
          }
        }
      }
    },
  },
  created() {
    this.generateIslands();
  }
};
