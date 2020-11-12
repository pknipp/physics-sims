import Cookies from 'js-cookie';

//1
const putSession = async (email, password) => {
  const res = await fetch('/api/session', {method: "put",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN") },
    body: JSON.stringify({ email, password })});
  res.data = await res.json();
  console.log(res.data);
}

//2
const deleteSession = async _ => { const res = await fetch('/api/session', {method: "delete",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN") }});
  res.data = await res.json();
  console.log(res.data);
}

//3
const postUser = async (firstName, lastName, email, wantsEmail, password, confirmPassword, optStuff) => {
  const res = await fetch('/api/users', { method: "post",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN") },
    body: JSON.stringify({firstName,lastName,email,wantsEmail,password,confirmPassword,optStuff}) });
  res.data = await res.json();
  console.log(res.data);
}

//4
const getUser = async _ => {
  const res = await fetch("/api/users");
  res.data = await res.json();
  console.log(res.data);
}

//5
const putUser = async (firstName, lastName, email, wantsEmail, password, confirmPassword, optStuff) => {
  const res = await fetch('/api/users', {method: "put",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
    body: JSON.stringify({firstName, lastName, email, wantsEmail, password, confirmPassword, optStuff}) });
  res.data = await res.json();
  console.log(res.data);
}

//6
const deleteUser = async _ => {
  const res = await fetch('/api/users', {method: "delete", body: JSON.stringify({message: "bye" }),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
  await deleteSession();
}

//7
const postClass = async (name, description) => {
  const res = await fetch('/api/classes', {method: "post",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
    body: JSON.stringify({name, description}) });
  res.data = await res.json();
  console.log(res.data);
}

//8
const postClassSubscription = async id => {
  const res = await fetch(`/api/classes/${id}/subscription`, {method: "post",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
  //  body: JSON.stringify({})
  });
  res.data = await res.json();
  console.log(res.data);
}
//9
const getClasses = async _ => {
  const res = await fetch("/api/classes");
  res.data = await res.json();
  console.log(res.data);
}

//10
const getClass = async id => {
  const res = await fetch(`/api/classes/${id}`);
  res.data = await res.json();
  console.log(res.data);
}

//11
const deleteClass = async id => {
  const res = await fetch(`/api/classes/${id}`, {method: "delete", body: JSON.stringify({message: "class gone" }),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
}

//12
const postDeck = async (classId, name, objective) => {
  const res = await fetch('/api/decks', { method: "post",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN") },
    body: JSON.stringify({ classId, name, objective }) });
  res.data = await res.json();
  console.log(res.data);
}

//13
const getDecks = async (classId, deckIds) => {
  const res = await fetch(`/api/decks/${classId}/${deckIds.join("&")}`);
  res.data = await res.json();
  console.log(res.data);
}

//14
const deleteDeck = async id => {
  const res = await fetch(`/api/decks/${id}`, {method: "delete", body: JSON.stringify({}),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
}

//15
const postCard = async (deckId, question, answer) => {
  const res = await fetch(`/api/cards`, {method: "post",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
    body: JSON.stringify({deckId, question, answer})});
  res.data = await res.json();
  console.log(res.data);
}

//16
const getCard = async id => {
  const res = await fetch(`/api/cards/${id}`);
  res.data = await res.json();
  console.log(res.data);
}

//17
const putCard = async (id, question, answer) => {
  const res = await fetch(`/api/cards/${id}`, {method: "put",
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")},
    body: JSON.stringify({question, answer})});
  res.data = await res.json();
  console.log(res.data);
}

//18
const putCardHistory = async (id, confidence) => {
  const res = await fetch(`/api/cards/${id}/confidence`, {method: "put",
    headers: { "Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN") },
    body: JSON.stringify({ confidence })});
  res.data = await res.json();
  console.log(res.data);
}

//19
const deleteCard = async id => {
  const res = await fetch(`/api/cards/${id}`, {method: "delete", body: JSON.stringify({}),
    headers: {"Content-Type": "application/json", "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")}});
  res.data = await res.json();
  console.log(res.data);
}

window.putSession = putSession;                      //1
window.deleteSession = deleteSession;                //2
window.postUser = postUser;                          //3
window.getUser = getUser;                            //4
window.putUser = putUser;                            //5
window.deleteUser = deleteUser;                      //6
window.postClass = postClass                         //7
window.postClassSubscription = postClassSubscription //8
window.getClasses = getClasses                       //9
window.getClass = getClass                           //10
window.deleteClass = deleteClass                     //11
window.postDeck = postDeck                           //12
window.getDecks = getDecks                          //13
window.deleteDeck = deleteDeck                       //14
window.postCard = postCard                           //15
window.getCard = getCard                             //16
window.putCard = putCard                             //17
window.putCardHistory = putCardHistory               //18
window.deleteCard = deleteCard                       //19
