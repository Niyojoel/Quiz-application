
export const getTimeRemaining = (time)=> {
    let hour, minutes, seconds;
    
    if(time >= 3600) {
        hour = Math.floor((time/60)/60);
        minutes = Math.floor((time / 60) % 60);
    }  
    minutes = Math.floor(time / 60);
    seconds = Math.floor(time % 60);

    let timeRender;

    if (time >= 0) {
        if(hour !== undefined) { 
         timeRender = `${hour > 9 ? hour : "0" + hour}":"${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
        }
        return timeRender = `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
    }else timeRender = `00:00`;
    return timeRender;
};
