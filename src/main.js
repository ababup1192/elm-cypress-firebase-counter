import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAInhHkZyMUectIEi_9MQItdwOnxK-VZnc",
  authDomain: "elm-cypress-counter.firebaseapp.com",
  databaseURL: "https://elm-cypress-counter.firebaseio.com",
  projectId: "elm-cypress-counter",
  storageBucket: "elm-cypress-counter.appspot.com",
  messagingSenderId: "661757424933",
  appId: "1:661757424933:web:948475c85dc6c7fd6456cc",
  measurementId: "G-73MTH28VHJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const DB = firebase.firestore();
const { Elm } = require("./Main.elm");
const app = Elm.Main.init({ node: document.getElementById("main") });
const counter = DB.collection("all").doc("counter");

counter.onSnapshot(doc => {
  const data = doc.data();
  if (data) {
    app.ports.getValue.send(data.value);
  } else {
    DB.collection("all")
      .doc("counter")
      .set({ value: 0 });
  }
});

app.ports.setValue.subscribe(value => {
  counter.set({ value });
});

app.ports.reset.subscribe(value => {
  counter.set({ value: 0 });
});
