const city=document.getElementById("city");
const search=document.getElementById("search");
const loc=document.getElementById("cityname");
const time=document.getElementById("time");
const temp=document.getElementById("temp");

async function getData(name) {
    const data=await fetch(`http://api.weatherapi.com/v1/current.json?key=363d72b378d54bcab6f93623240910&q=${name}&aqi=yes`);
    return await data.json();
}
search.addEventListener('click',async ()=>{
    const res= await getData(city.value);
    loc.innerText=`location:${res.location.name}, ${res.location.region},${res.location.country}`
    time.innerText=`Time:${res.location.localtime}`;
    temp.innerText=`Temperature:${res.current.temp_c}`;
});