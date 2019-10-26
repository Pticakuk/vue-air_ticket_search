import config from "@config";
import keys from "lodash-es/keys";
import moment from "moment";

export function makeSearchRequest(searchData) {
  const {
    departure_code,
    arrival_code,
    date,
    flight_class,
  } = searchData;
  return {
    ...config.searchRequest,
    directions: [{
      departure_code,
      arrival_code,
      date: moment(date).format('YYYY-MM-DD'),
    }],
    class: flight_class,
  };
}

export function getMappedOffers(offers) {
  return offers.map((offer) => {
    const companySegments = offer.offers.reduce((offers, companyOffer) => {
      return [...offers, ...companyOffer.segments];
    }, []);
    return {...offer, offers: companySegments};
  });
}

export function getServerErrors(responseErrors) {
  return keys(responseErrors).reduce((errors, error) => {
    const responceErrorKeys = config.responceErrorKeys[error];
    errors[responceErrorKeys.key] = responseErrors[error][0].replace(error, responceErrorKeys.name);
    return errors;
  },{});
}
