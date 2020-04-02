var http = require('http');

const events = [
  {
      date: '4.8.2019',
      title: '10 osób zginęło...',
      description: '10 osób zginęło, a 26 zostało rannych w wyniku strzelaniny w Dayton.',
  },
  {
      date: '5.8.2019',
      title: 'Gubernator zdymisjonowany',
      description: 'Gubernator Portoryko Ricardo Rosselló oficjalnie podał się do dymisji, w odpowiedzi na trwające od kilku tygodni masowe protesty wywołane ujawnieniem jego homofobicznych i seksistowskich wypowiedzi oraz aferami korupcyjnymi w jego otoczeniu.',
  },
  {
      date: '6.8.2019',
      title: 'Satelita EAK wystrzelony',
      description: 'Z Gujańskiego Centrum Kosmicznego na orbitę został wystrzelony satelita naukowy Europejskiej Agencji Kosmicznej ADM-Aeolus, wyposażony w nowatorski instrument do badania wiatrów Ziemi.',
  },
  {
      date: '7.8.2019',
      title: 'Nowy premier Słowenii',
      description: 'Marjan Šarec został desygnowany na urząd premiera Słowenii.',
  },
  {
      date: '8.8.2019',
      title: 'Trzęsienie ziemi',
      description: 'Na południowym zachodzie Turcji wystąpiło trzęsienie ziemi o magnitudzie 5.7, w wyniku którego zostało rannych ponad 20 osób, a kilka budynków zostało uszkodzonych. Ognisko wstrząsów znajdowało się około 9 km na wschód od popularnej wśród turystów miejscowości Denizli.',
  },
  {
      date: '9.8.2019',
      title: 'Siwakow zwycięża w Polsce',
      description: 'Rosjanin Pawieł Siwakow zwyciężył w 76. edycji Tour de Pologne.',
  },
  {
      date: '10.8.2019',
      title: 'Decyzja zapadła!',
      description: 'Marek Kuchciński złożył rezygnację z funkcji Marszałka Sejmu.',
  },
  {
      date: '11.8.2019',
      title: 'Ulewy w Indiach',
      description: 'Ulewne deszcze wywołały powódź w indyjskiej prowincji Kerala.',
  },
  {
      date: '12.8.2019',
      title: 'Pompeje znów na językach',
      description: 'Na terenie wykopalisk w Pompejach na południu Włoch znaleziono resztki szkatułki z drewna i metalu pełnej amuletów i różnych przedmiotów z bursztynu, kryształu i ametystu, zbiór nadzwyczajnych talizmanów w kształcie dzwonków i laleczek oraz kobiecą biżuterię. W skład kolekcji wchodzą przede wszystkim dziesiątki amuletów, mających odstraszać złe moce i przynosić szczęście[1].',
  },
  {
      date: '13.8.2019',
      title: 'Vuelta Espana wystartowała!',
      description: 'Rozpoczęła się 73. edycja hiszpańskiego wyścigu kolarskiego Vuelta a España.',
  },
  {
      date: '14.8.2019',
      title: 'Zielonogórzanin milionerem!',
      description: 'W dniu dzisiejszym w Zielonej Górze padła rekordowa wygrana w loterii Multi-Super-Hiper-Szał. Zielonogórzanin, który szczęśliwy los kupił dwa dni wcześniej tłumaczy, że chciał się pocieszyć niepowodzeniem podczas kursu programistycznego.',
  },
  {
      date: '15.8.2019',
      title: 'Przyznano Medal Fieldsa',
      description: 'Caucher Birkar, Alessio Figalli, Peter Scholze, Akshay Venkatesh otrzymali Medal Fieldsa, nagrodę przyznawaną w dziedzinie matematyki.',
  },
  {
      date: '16.8.2019',
      title: 'Bilion dolarów za JS',
      description: 'JavaScript Ninjas sp. z o.o. stało się pierwszą polską publicznie notowaną firmą wycenianą na ponad bilion dolarów amerykańskich.',
  },
  {
      date: '17.8.2019',
      title: 'Moc jest silna w Meksyku',
      description: 'W Meksyku odnotowano nadzwyczajne fluktuacje mocy. Najprawdopodobniej jest to związane z faktem, iż kraj ten odwiedził ostatni potomek Jedi. Jego tożsamość nie jest jednak znana. Niezły meksyk...',
  },
  {
      date: '18.8.2019',
      title: 'Koniec demokracji w Tonga',
      description: 'Król Tonga Tupou VI rozwiązał parlament i zarządził przedterminowe wybory, które mają się odbyć nie później niż 16 listopada.',
  },
  {
      date: '19.8.2019',
      title: 'Koniec uniwersjady',
      description: 'Zakończyła się, rozgrywana w stolicy Tajwanu – Tajpej, uniwersjada.',
  },
  {
      date: '20.8.2019',
      title: 'Druga rocznica odnalezienia wraku',
      description: '20 sierpnia 2017 roku na Oceanie Spokojnym odnaleziono wrak okrętu USS „Indianapolis”, którego zatopienie podczas II wojny światowej było największą katastrofą w historii US Navy.',
  },
  {
      date: '21.8.2019',
      title: 'Honorowa Obywatelka - to brzmi dumnie!',
      description: 'Helena Kmieć została pośmiertnie Honorową Obywatelką Libiąża.',
  },
  {
      date: '22.8.2019',
      title: 'Dzień jak codzień w Chinach',
      description: 'Władze Chin ukarały 197 osób za szerzenie w internecie pogłosek dotyczących ostatniego załamania na giełdzie.',
  },
  {
      date: '23.8.2019',
      title: '',
      description: '',
  },
  {
      date: '24.8.2019',
      title: '',
      description: '',
  },
];

function formatDate(date) {
  return date.getUTCDate() + "." + (( 1 * date.getUTCMonth() ) + 1) + "." + date.getUTCFullYear()
}

function updateData(data) {

  function randomValue() {
    const random = Math.random();
    return Math.floor( 10 * random ) * (random > 0.9 ? -1 : 1);
  }

  function findNewEvent() {
    const event = events[Math.floor(Math.random() * events.length)];
    if(data.find( item => item.date === event.date)) {
      return findNewEvent();
    }
    return event;
  }

  for(let a=0;a<10;a++) {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + randomValue() + 1);
    newDate.setHours(newDate.getHours() + randomValue());
    newDate.setMinutes(newDate.getMinutes() + randomValue());
    newDate.setSeconds(newDate.getSeconds() + randomValue());
    const event = findNewEvent();
    const item = {
      date: newDate,
      title: event ? event.title : 'Event title '+a,
      description: event ? event.description : 'Event description '+a,
    }
    data.push(item);
  }
}

var server=http.createServer((function(request,response)
{
  console.log('Request received...');
  response.writeHead(200,
    {
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  );
  const data = [];
  updateData(data);
  response.end(JSON.stringify(data));
}));

server.listen(7000);
console.log("Server is running at 7000")
