const day = document.querySelector('.day');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const celebration = document.querySelector('.celebration');
const image = document.querySelector('.celebration-image')
const comingSoon = document.querySelector('.coming-soon');
const ironMan = "images/iron-man-snap.gif";
const lightning = "images/new-year.gif";

displayCelebration = () =>{
    celebration.style.display = "block";
    comingSoon.style.display = "none";
    console.log(image.getAttribute('src'));
    setTimeout(()=>{
        if(image.getAttribute('src') == ironMan){
            image.setAttribute('src', lightning);
        }
    }, 1400);
    
}

class EventCountdown{
    constructor(eventDate){
        this.eventDate = new Date(eventDate).getTime();     // event date in milisecond
        this.defaultTimeValues();
        this.prev;
        setInterval(this.counter.bind(this), 1000);     // calls counter func every 1 second
    }

    // default value of second, minute, hour, day
    defaultTimeValues(){
        this.sec = 1000;        // 1000 miliseconds equals 1 second
        this.min = this.sec * 60;       // 1 minute equals 60 second
        this.hr = this.min * 60;        // 1 hour equals 60 * 60 = 3600 second
        this.d = this.hr * 24;          // 1 day equals 3600 * 24 = 86,400 second
        }

    // gives time left between event and latest time (in miliseconds) 
    eventGap(){
        this.nowDate = new Date().getTime();        // latest time in milisecond
        this.gap = this.eventDate - this.nowDate;       // time left for event in milisecond
    }

    // calculate the time for event time
    counter(){
        this.eventGap();
        var eventDay = Math.floor(this.gap / this.d);     // time for event day left
        var eventHour = Math.floor((this.gap % this.d) / this.hr);    // time for event hour left
        var eventMinute = Math.floor((this.gap % this.hr) / this.min);        // time for event minute left
        var eventSecond = Math.floor((this.gap % this.min) / this.sec);     // time for event second left
        
        // after event time is finished
        if(this.gap < 1000){
            clearInterval(this.setInterval);
            displayCelebration();
        }

        this.updateUi(eventDay, eventHour, eventMinute, eventSecond);       // calling updateUi function to update ui
    }

    // update UI
    updateUi(eventDay, eventHour, eventMinute, eventSecond){
        if(this.gap <= 0){
            day.classList.remove("change"); 
            hour.classList.remove("change");
            minute.classList.remove("change"); 
            second.classList.remove("change");
        }else{

            console.log(eventSecond, parseInt(second.innerHTML));
            // update day
            eventDay = (eventDay < 10) ? "0" + eventDay : eventDay.toString();
            if(day.innerHTML.toString() !== eventDay){
                day.classList.add("change");
            }else{
                day.classList.remove("change");
            }
            day.innerHTML = eventDay;

            // update hour
            eventHour = (eventHour < 10) ? "0" + eventHour : eventHour.toString();
            if(hour.innerHTML.toString() !== eventHour){
                hour.classList.add("change");
            }else{
                hour.classList.remove("change");
            }
            hour.innerHTML = eventHour;

            // update minute
            eventMinute = (eventMinute < 10) ? "0" + eventMinute : eventMinute.toString();
            if(minute.innerHTML.toString() !== eventMinute){
                minute.classList.add("change");
            }else{
                minute.classList.remove("change");
            }
            minute.innerHTML = eventMinute;

            // update second
            eventSecond = (eventSecond < 10) ? "0" + eventSecond : eventSecond.toString();
            if(second.innerHTML.toString() !== eventSecond){
                second.classList.add("change");
            }else{
                second.classList.remove("change");
            }
            second.innerHTML = eventSecond;
        }
    }

}

const eventCountdown = new EventCountdown("Jan 3 2022 20:45:00");