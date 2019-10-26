import { api, auth, entities } from '@helpers';
import assign from 'lodash-es/assign';
import config from '@config'
import Datepicker from 'vuejs-datepicker';
import get from 'lodash-es/get';
import Header from '../sections/Header/Header.vue'
import { mapGetters } from 'vuex';
import Loading from '../widgets/Loading/Loading.vue'
import Islands from '../Islands/Islands.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    Datepicker,
    Header,
    Loading,
    Islands,
    VueSlider,
  },
  data() {
    return {
      title: 'Seach page',
      authKey: sessionStorage.getItem('etm-auth-key'),
      currency: 'USD',
      disabledDates: {
        to: new Date(),
      },
      isLoading: false,
      flightTime: [0, 1],
      offers: [],
      searchData: {
        departure_code: "KBP",
        arrival_code: "SSH",
        date: "2019-11-13",
        flight_class: "E",
      },
      serverErrors: {},
      shownOffers: {},
      slideBar: config.sliderBar,
      sliderBarMarks: config.sliderBarMarks,
    };
  },
  computed: {
    ...mapGetters(['notFilteredOffers']),
  },
  methods: {
    cleanField(field){
      this.serverErrors[field] = '';
    },
    async onSearch() {
      this.isLoading = true;
      this.offers = [];
      try {
        const data = entities.makeSearchRequest(this.searchData);
        let response = await api.search({ data, authKey: this.authKey });
        this.getOffers({ requestId: get(response, 'data.request_id', '') });
      } catch(err) {
        if (err.response.status === 405) {
          this.serverErrors = entities.getServerErrors(get(err, 'response.data.message', {}));
        } else if (err.response.status === 403) {
          this.authKey = await auth.authorization();
        } else {
          console.error(err)
        }
        this.isLoading = false;
      }
    },
    filterResults() {
      this.offers = this.notFilteredOffers.map((offer) => {
        const offers = offer.offers.filter((companyOffer) =>{
          const from = this.flightTime[0]*60;
          const to = Number.isInteger(this.flightTime[1]) ? this.flightTime[1]*60 : Infinity;
          const duration = companyOffer.duration_minutes;
          return duration >= from && duration <= to;
        });
        return { ...offer, offers};
      });
    },
    cancelFilter() {
      this.offers = this.notFilteredOffers;
    },
    toggleOffers (carrier_code) {
      this.shownOffers[carrier_code] = !get(this.shownOffers, carrier_code, false);
      this.shownOffers = assign({}, this.shownOffers);
    },
    async getOffers({ requestId }) {
      try {
        let response = await api.offers({ requestId, authKey: this.authKey });
        const status = get(response, 'data.status', '');
        switch (status) {
          case 'InProcess': {
            setTimeout(() => {
              this.getOffers({ requestId });
            }, 3000);
            break;
          }
          case 'Ready': {
           this.offers = entities.getMappedOffers(get(response, 'data.offers', []));
            this.$store.dispatch('saveOffers', this.offers);
            this.isLoading = false;
            break;
          }
          default:
            break;
        }
      } catch(err) {
        console.error(err);
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    if (!this.authKey) {
      this.authKey = await auth.authorization();
    }
  }
};
