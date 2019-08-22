let fetchedData, time, date;

let stopTime = new Date();
stopTime.setDate(stopTime.getDate() + 10);
stopTime = stopTime.getTime();

const dateParagraph = document.querySelector(".passing-date");
const pastEvents = document.querySelector(".events-container");
const footer = document.querySelector(".footer")

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}, false;


const url = 'http://localhost:7000'

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    fetchedData = data;
    date = new Date();
    displayDate(date);

  })
  .catch(err => {
    console.log(err)
  });



const displayPastEvents = (currentDate) => {
  fetchedData = fetchedData.filter(el => {
    if ((Date.parse(el.date) < currentDate.getTime()) && el.title != "") {
      const event = document.createElement("div");
      event.className = "event";
      event.appendAfter(dateParagraph);
      const eventsTitle = document.createElement("span");
      const eventsParagraph = document.createElement("p");
      const eventsDate = document.createElement("span");
      eventsTitle.className = "event-title";
      eventsDate.className = "event-time";
      eventsParagraph.className = "event-description";
      eventsParagraph.innerHTML = `${el.description} <br/>`;
      eventsTitle.innerHTML = `${el.title}<br/>`;
      eventsDate.innerHTML = `${renderDate} ${time}`;
      event.appendChild(eventsDate);
      event.insertBefore(eventsParagraph, event.firstChild);
      event.insertBefore(eventsTitle, event.firstChild);
    }
    return Date.parse(el.date) > currentDate.getTime();
  });

}

const displayDate = (currentDate) => {
  const day = currentDate.getDay();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daym = currentDate.getDate();
  let dayArr = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  let monthArr = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
  dayArr = dayArr.map(x => x.replace(x[0], x[0].toUpperCase()));
  monthArr = monthArr.map(x => x.replace(x[0], x[0].toUpperCase()));
  renderDate = `${dayArr[day]}, ${daym} ${monthArr[month]} ${year}`;


  if (currentDate.getTime() < stopTime) {
    currentDate.setSeconds(currentDate.getSeconds() + 50);
    time = `${currentDate.getHours() < 10 ? "0"+currentDate.getHours():currentDate.getHours()}:${currentDate.getMinutes() < 10 ? "0"+currentDate.getMinutes():currentDate.getMinutes() }:${currentDate.getSeconds() < 10 ? "0"+currentDate.getSeconds():currentDate.getSeconds()}`
    dateParagraph.innerHTML = `${renderDate} <br/>${time}`;

    setTimeout(() => {
      displayDate(date);
      displayPastEvents(date);
    }, 1)
  } else {
    currentDate.setSeconds(currentDate.getSeconds() - 100);
  }
}