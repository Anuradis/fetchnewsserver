let fetchedData, date, time;

let stopTime = new Date();
stopTime.setDate(stopTime.getDate() + 10);
stopTime = stopTime.getTime();

let dateParagraph = document.querySelector(".passing-date");
let pastEvents = document.querySelector(".past-events");


let url = 'http://localhost:7000'

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



let displayPastEvents = (currentDate) => {
  fetchedData = fetchedData.filter(el => {
    if ((Date.parse(el.date) < currentDate.getTime()) && el.title != "") {
      let event = document.createElement("div");
      event.className = "event";
      event.innerHTML = `${el.description} <br/>`;
      pastEvents.appendChild(event);
      let eventsTitle = document.createElement("span");
      let eventsDate = document.createElement("span");
      eventsTitle.className = "event-title";
      eventsDate.className = "event-time"
      eventsTitle.innerHTML = `${el.title}<br/>`;
      eventsDate.innerHTML = `${renderDate} ${time}`
      event.appendChild(eventsDate);
      
      event.insertBefore(eventsTitle, event.firstChild);
    }
    return Date.parse(el.date) > currentDate.getTime();
  });

}

let displayDate = (currentDate) => {
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
    currentDate.setSeconds(currentDate.getSeconds() + 100);
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