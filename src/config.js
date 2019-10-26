export default {
  app_id: 'c6744783c6',
  searchRequest: {
    directions: [
      {
        departure_code: "",
        arrival_code: "",
        date: "",
      }
    ],
    adult_qnt: 1,
    class: "",
    fare_types: ["PUB", "NEG"],
  },
  responceErrorKeys: {
    'class': {
      key: 'flight_class',
      name: 'Flight Class',
    },
    'directions.0.departure_code': {
      key: 'departure_code',
      name: 'Departure airport code',
    },
    'directions.0.arrival_code': {
      key: 'arrival_code',
      name: 'Arrival airport code',
    },
    'directions.0.date': {
      key: 'date',
      name: 'Date',
    }
  },
  sliderBar: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,'> 24'],
  sliderBarMarks: [1,3,5,7,9,11,13,15,17,19,21,23,'> 24'],
}
