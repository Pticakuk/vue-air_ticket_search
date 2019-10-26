<template>
  <div class="a-page p-search">
    <Header/>
    <main class="p-search__main">
      <div class="a-container">
        <h1 class="a-title">{{ title }}</h1>
        <div v-if="authKey"
             class="p-search-offers">
          <div class="p-container p-search-offers__container">
            <div class="p-search-offers__form">
              <div class="p-search-offers__form-element">
                <label class="p-search-offers__form-label">Departure airport</label>
                <input
                  class="a-form-input p-search-offers__form-input"
                  :class="{'p-search-offers__form-input--error': serverErrors.departure_code}"
                  name="departure_code"
                  v-model="searchData.departure_code"
                  @focus="cleanField('departure_code')">
                <div class="p-search-offers__error-message">
              <span v-if="serverErrors.departure_code">
                {{serverErrors.departure_code}}
              </span>
                </div>
              </div>
              <div class="p-search-offers__form-element">
                <label class="p-search-offers__form-label">Arrival airport</label>
                <input
                  class="a-form-input p-search-offers__form-input"
                  :class="{'p-search-offers__form-input--error': serverErrors.arrival_code}"
                  name="arrival_code"
                  v-model="searchData.arrival_code"
                  @focus="cleanField('arrival_code')">
                <div class="p-search-offers__error-message">
              <span v-if="serverErrors.arrival_code">
                {{serverErrors.arrival_code}}
              </span>
                </div>
              </div>
              <div class="p-search-offers__form-element">
                <label class="p-search-offers__form-label">Date</label>
                <datepicker
                  class="a-form-input p-search-offers__form-input"
                  :class="{'p-search-offers__form-input--error': serverErrors.date}"
                  name="date"
                  v-model="searchData.date"
                  :disabled-dates="disabledDates"
                  format="yyyy-MM-dd"
                  @focusin.native="cleanField('date')">
                </datepicker>
                <div class="p-search-offers__error-message">
                <span v-if="serverErrors.date">
                  {{serverErrors.date}}
                </span>
                </div>
              </div>
              <div class="p-search-offers__form-element">
                <label class="p-search-offers__form-label">Flight Class</label>
                <input
                  class="a-form-input p-search-offers__form-input"
                  :class="{'p-search-offers__form-input--error': serverErrors.flight_class}"
                  name="flight_class"
                  v-model="searchData.flight_class"
                  @focus="cleanField('flight_class')">
                <div class="p-search-offers__error-message">
              <span v-if="serverErrors.flight_class">
                {{serverErrors.flight_class}}
              </span>
                </div>
              </div>
              <div class="p-search-offers__form-element">
                <button class="a-button p-search-offers__form-button"
                  @click="onSearch"
                  :disabled="isLoading">Search</button>
              </div>
            </div>
            <div
              v-if="offers.length > 0"
              class="p-search-offers__form-filter">
              <div class="p-search-offers__form-filter-slider">
                <div class="a-subtitle">Choose flight time</div>
                <vue-slider
                  :enable-cross="false"
                  :min-range="1"
                  :data="slideBar"
                  :marks="sliderBarMarks"
                  v-model="flightTime">
                </vue-slider>
                <div class="p-search-offers__form-range">
                  from <span>{{ flightTime[0] }}</span> to <span>{{ flightTime[1] }}</span>
                </div>
              </div>
              <div class="p-search-offers__form-filter-buttons">
                <button class="a-button p-search-offers__form-filter-button"
                        @click="filterResults">Filter</button>
                <button class="a-button a-button--transparent p-search-offers__form-filter-button"
                        @click="cancelFilter">Cancel</button>
              </div>
            </div>
            <div class="p-search-offers__list">
              <div
                v-for="(offer, index) in offers"
                :key="index"
                v-if="offer.offers.length > 1"
                class="p-search-offers__offer">
                <div class="p-search-offers__company">
                  <div class="p-search-offers__company-logo">
                    <img :src="offer.carrier_logo" width="120">
                  </div>
                  <div class="p-search-offers__company-name">
                    {{ offer.carrier_name }}
                  </div>
                  <div class="p-search-offers__company-show-offers">
                    <button class="a-button p-search-offers__company-show-offers-button"
                            type="button"
                            @click="toggleOffers(offer.carrier_code)">
                      <span v-if="!shownOffers[offer.carrier_code]">Show offers &#9660;</span>
                      <span v-else>Hide offers &#9650;</span>
                    </button>
                  </div>
                </div>
                <div
                  :class="{'p-search-offers__company-offers--open': shownOffers[offer.carrier_code]}"
                  class="p-search-offers__company-offers">
                  <div v-for="(companyOffer, index) in offer.offers"
                       :key="index"
                       :class="{'p-search-offers__company-offer--odd': index % 2 === 0}"
                       class="p-search-offers__company-offer">
                    <div class="p-search-offers__company-offer-info">
                      <div class="p-search-offers__company-offer-label">Departure airport</div>
                      <div class="p-search-offers__company-offer-value">
                        {{ companyOffer.departure_airport }}
                      </div>
                    </div>
                    <div class="p-search-offers__company-offer-info">
                      <div class="p-search-offers__company-offer-label">Departure date</div>
                      <div class="p-search-offers__company-offer-value">
                        {{ companyOffer.departure_date }}
                      </div>
                    </div>
                    <div class="p-search-offers__company-offer-info">
                      <div class="p-search-offers__company-offer-label">Arrival airport</div>
                      <div class="p-search-offers__company-offer-value">
                        {{ companyOffer.arrival_airport }}
                      </div>
                    </div>
                    <div class="p-search-offers__company-offer-info">
                      <div class="p-search-offers__company-offer-label">Arrival date</div>
                      <div class="p-search-offers__company-offer-value">
                        {{ companyOffer.arrival_date }}
                      </div>
                    </div>
                    <div class="p-search-offers__company-offer-info">
                      <div class="p-search-offers__company-offer-label">Price</div>
                      <div class="p-search-offers__company-offer-value">
                        {{ companyOffer.price }} {{ currency }}
                      </div>
                    </div>
                    <div class="p-search-offers__company-offer-info">
                      <div class="p-search-offers__company-offer-label">Flight time</div>
                      <div class="p-search-offers__company-offer-value">
                        {{ companyOffer.duration_formated }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Loading v-if="isLoading"/>
        </div>
        <Loading v-else/>
      </div>
    </main>

  </div>
</template>
<script src="./Search.js"></script>
<style src="./Search.scss" scoped lang="scss"></style>
