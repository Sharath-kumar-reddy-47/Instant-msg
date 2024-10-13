const city=document.getElementById("cityname");
const time=document.getElementById("time");
const temp=document.getElementById("temp");

async function getloc(position) {
    const lat=position.coords.latitude;
    const lng=position.coords.longitude;
    const weather=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`);
    const w_after_json= await weather.json();
    // console.log(w_after_json);
    time.innerText=w_after_json.hourly.time.slice(0,5);
    temp.innerText=w_after_json.hourly.temperature_2m.slice(0,5);
}
function failloc(){
    time.innerText="please allow location permission to see weather";
    console.log("issue");
}
window.addEventListener('load',()=>{
    navigator.geolocation.getCurrentPosition(getloc,failloc);
});