import Header from '../sections/Header/Header.vue';
import get from 'lodash-es/get';

export default {
  components: {
    Header,
  },
  data() {
    return {
      socketUrl: 'wss://echo.websocket.org',
      socket: null,
      sse: null,
      sending: null,
      number: 0,
      messages: [],
      stockData: [],
    }
  },
  computed: {
    shovedMessages() {
      return this.messages.join('<br>');
    }
  },
  methods: {
    onOpen() {
      this.socket = new WebSocket(this.socketUrl);
      this.setSocketHandlers(this.socket);
    },
    onClose() {
      this.socket.close();
    },
    onSend() {
      this.sending = setInterval(() => {
        this.socket.send(JSON.stringify({ name: 'Dima' }));
      }, 1000);
      setTimeout(() => {
        clearInterval(this.sending);
      }, 5000);
    },
    setSocketHandlers(socket) {
      socket.onopen = (event) => {
        console.log(event);
        this.messages = [...this.messages, 'WebSocket is connected.'];
      };
      socket.onerror = (error) => {
        console.log(error);
        this.messages = [...this.messages, `WebSocket Error: ${error}`];
      };
      socket.onclose = (event) => {
        console.log(event);
        this.messages = [...this.messages, 'Disconnected from WebSocket.'];
      };
      socket.onmessage = (event) => {
        this.number += 1;
        const user = JSON.parse(event.data);
        console.log(event);
        this.messages = [...this.messages, `${this.number} WebSocket message received: ${user.name}`];
      };
    },
    SSEOpen() {
      if(this.sse) {
        this.SSEClean();
      }
      this.sse = new EventSource('http://express-eventsource.herokuapp.com/events');
      this.setSSEHandlers(this.sse);
    },
    setSSEHandlers(sse) {
      sse.onopen = (event) => {
        console.log(event);
        console.log("Событие: open");
      };
      sse.onerror = (error) => {
        console.log(error);
        console.log("Произошла ошибка.");
      };
      sse.onmessage = (event) => {
        console.log(event);
        log("Событие: message, данные: " + event.data);
      };
      sse.addEventListener('data', (event) => {
        const time = JSON.parse(get(event, 'data', {}));
        this.stockData = [...this.stockData, time];
        if(time.final) {
          this.SSEClose();
        }
        console.log(time);
      });
    },
    SSEClean() {
      this.stockData = [];
      this.SSEClose();
    },
    SSEClose() {
      this.sse.close();
    },
  },
};



// let eventSource;
//
// function start() { // когда нажата кнопка "Старт"
//   if (!window.EventSource) {
//     // Internet Explorer или устаревшие браузеры
//     alert("Ваш браузер не поддерживает EventSource.");
//     return;
//   }
//
//   eventSource = new EventSource('digits');
//
//   eventSource.onopen = function(e) {
//     log("Событие: open");
//   };
//
//   eventSource.onerror = function(e) {
//     log("Событие: error");
//     if (this.readyState == EventSource.CONNECTING) {
//       log(`Переподключение (readyState=${this.readyState})...`);
//     } else {
//       log("Произошла ошибка.");
//     }
//   };
//
//   eventSource.addEventListener('bye', function(e) {
//     log("Событие: bye, данные: " + e.data);
//   });
//
//   eventSource.onmessage = function(e) {
//     log("Событие: message, данные: " + e.data);
//   };
// }
//
// function stop() { // когда нажата кнопка "Стоп"
//   eventSource.close();
//   log("Соединение закрыто");
// }
//
// function log(msg) {
//   logElem.innerHTML += msg + "<br>";
//   document.documentElement.scrollTop = 99999999;
// }
