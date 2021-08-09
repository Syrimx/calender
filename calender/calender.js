const today = new Date();

//get header
const header = document.querySelector('.header');

//reqex
//check auf ..tag und ..woch
tag = /tag/
woch = /woch/
wochentag = /wochentag/
//Such Fenster Oben
let month = today.getMonth();
let year = today.getFullYear();

//Monat in String ausgeben Funktion
function getMonthString(month) {
	switch(month + 1) {
		case(1):
			monthString = 'Januar';
			break
		case(2):
			monthString = 'Februar';
			break
		case(3):
			monthString = 'März';
			break
		case(4):
			monthString = 'April';
			break
		case(5):
			monthString = 'Mai';
			break
		case(6):
			monthString = 'Juni';
			break
		case(7):
			monthString = 'Juli';
			break
		case(8):
			monthString = 'August';
			break
		case(9):
			monthString = 'September';
			break
		case(10):
			monthString = 'Oktober';
			break
		case(11):
			monthString = 'November';
			break
		case(12):
			monthString = 'Dezember';
			break
	}
	return monthString;
} 


//Datum zuweisen
header.innerText = `${getMonthString(month)}, ${year}`;
//setWeekDate funktion
let tagesAdd = [0, 7 ,14, 21, 28]
//-> Teil von getDateDays()
//Um Wochentages childNodes zu durchlaufen und Klassenname sowie innerText zu ändern
function setWeekDay(target, day) {
	let counter2 = 0;
	let kalender = document.querySelector('.kalender');
	let elements = document.querySelector(target).childNodes;
	elements.forEach((element) => {
		//Wochentage vor dem ersten ausgrauen
		if (day === 1) {
			let check = true;
			kalender.childNodes.forEach((wochentag) => {
				//bedingung testen!! -> Break aus dem Loops sobald wochentag.className == target.split('.')[1];
				if(wochentag.nodeName !== '#text' && wochentag.className !== target.split('.')[1] && check === true) {
					wochentag.childNodes[3].className = 'x';
				}
				//Markierungsbedingung, bei durchlaufen des gesuchten Wochentags umstellen
				if (wochentag.className == target.split('.')[1]) {
					check = false;
				}

			})
		}

		//Wochentage zuordnen
		//Wochentagen werden ihre Tage des Monats zugeordnet
		if (element.nodeName !== '#text' && !wochentag.test(element.className) && element.className !== 'x') {
			if ((month+1)%2 === 0) {
				element.innerText = day + tagesAdd[counter2] <= 30 ? day + tagesAdd[counter2] : '';
				counter2++;
			}
			else if ((month+1)%2 === 1) {
				element.innerText = day + tagesAdd[counter2] <= 31 ? day + tagesAdd[counter2] : '';
				counter2++;
			}
			else if (month + 1 === 2) {
				element.innerText = day + tagesAdd[counter2] <= 28 ? day + tagesAdd[counter2] : '';
				counter2++;			
			}
		}
			//Aktuellen Tag anzeigen
		if(day === today.getDate() && month +1  === today.getḾonth() && year === today.getFullYear()) {
			element.setAttribute('style', 'color:gold')
		}
		
	})
}

/********************/
//Wochentage eintragen
//vars 

function getDateDays(month, year) {
	//Inhalt der Tabelle bei Aufruf auf Null setzen (funktioniert)
	//Klassennamen welche ein X beinhalten werden wieder auf Ihren ursprünglichen
	//Wochentagsnamen zurückgesetzt (ungetestet)
	const tage 	= document.querySelectorAll('.tag');
	const x 	= document.querySelectorAll('.x')
	tage.forEach((tag) => {
		if (tag.nodeName !== '#text') {
			tag.innerText = '';
		}
	})

	x.forEach((element) => {
		if (element.nodeName !== '#text') {
			element.className = 'tag';

		}
	})



	//Wochentage neu zuordnen (ungetestet)
	let day = 1;
	while (day <=7) {
		let date = new Date(year, month, day);
		switch(date.getDay()) {
			case(0):
				setWeekDay('.Sonntag', day)
				break

			case(1):
				setWeekDay('.Montag', day)
				break

			case(2):
				setWeekDay('.Dienstag', day)
				break

			case(3):
				setWeekDay('.Mittwoch', day)
				break

			case(4):
				setWeekDay('.Donnerstag', day)
				break

			case(5):
				setWeekDay('.Freitag', day)
				break

			case(6):
				setWeekDay('.Samstag', day)
				break
		}
		console.log(`${date.getDate()}, ${date.getMonth()}, ${date.getFullYear()}`);
		day++;
	}
}

/*********************/
//Dynamic des Suchfensters
const pfeilLinks = document.querySelector('.fa-chevron-left');
const pfeilRechts = document.querySelector('.fa-chevron-right');


//pfeil links
pfeilLinks.addEventListener('click', () => {
	if (month - 1 >= 0) {
		month = month - 1;
		header.innerText = `${getMonthString(month)}, ${year}`;
	}

	else {
		month = month + 11;
		year = year - 1;
		header.innerText = `${getMonthString(month)}, ${year}`;
	}

	getDateDays(month, year);
})

//pfeil rechts
pfeilRechts.addEventListener('click', () => {
	if (month + 1 <= 11) {
		month = month + 1;
		header.innerText = `${getMonthString(month)}, ${year}`;
	}

	else {
		month = month -11;
		year = year + 1;
		header.innerText = `${getMonthString(month)}, ${year}`;
	}

	getDateDays(month, year);
})

//Funktionalitäten
const tage = document.querySelectorAll('.tag');

tage.forEach((tag) => {
	tag.addEventListener('dblclick', () => {
		console.log(`${tag.innerText}, ${month+1}, ${year}`)
	})	
})

