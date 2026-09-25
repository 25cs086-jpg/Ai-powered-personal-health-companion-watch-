const $=s=>document.querySelector(s);
const modal=$("#modal"), count=$("#count"), modalTitle=$("#modalTitle"), modalText=$("#modalText"), modalIcon=$("#modalIcon");
let timer=null;

function addEvent(title, detail="Just now"){
  const wrap=$("#events"); const el=document.createElement("div"); el.className="event";
  el.innerHTML=`<span class="event-dot"></span><div><b>${title}</b><small>${detail}</small></div><em>!</em>`;
  wrap.prepend(el);
}
function openEmergency(title="Emergency Alert", text="Emergency workflow started.", icon="🚨", countdown=true){
  clearInterval(timer); modal.classList.remove("hidden"); modalTitle.textContent=title; modalText.textContent=text; modalIcon.textContent=icon;
  let n=countdown?10:0; count.textContent=n;
  if(countdown){
    timer=setInterval(()=>{n--;count.textContent=n;if(n<=0){clearInterval(timer);sendAlert();}},1000);
  }
}
function closeModal(){clearInterval(timer);modal.classList.add("hidden")}
function phone(){
  return ($("#guardian").value||localStorage.getItem("guardian")||"").replace(/[^\d+]/g,"");
}
function message(){return "SOS from AI Health Companion Watch. I may need help. Please contact me immediately. Location: "+(window.demoLocation||"Location permission not granted");}
function sendAlert(){
  addEvent("Emergency alert triggered","Guardian notification flow");
  modalText.textContent="Demo alert triggered. You can now contact your guardian or emergency services.";
  count.textContent="SOS";
}
$("#okBtn").onclick=()=>{addEvent("User confirmed: I'M OK");closeModal()};
$("#sendBtn").onclick=()=>{sendAlert(); const p=phone(); if(p) window.open("https://wa.me/"+p.replace("+","")+"?text="+encodeURIComponent(message()),"_blank");};
$("#sosBtn").onclick=()=>{addEvent("Manual SOS pressed","Women’s safety / emergency mode");openEmergency("SOS Emergency","Your safety workflow is active. Countdown to guardian alert.","🚨")};
$("#fallBtn").onclick=()=>{addEvent("Fall detected","MPU6050 simulation");openEmergency("Fall Detected","Are you okay? Press I'M OK before the countdown ends.","⚠️")};
$("#fallBtn2").onclick=()=>$("#fallBtn").click();
$("#womenBtn").onclick=()=>{addEvent("Women’s safety mode activated","Silent SOS + location sharing");openEmergency("Women’s Safety SOS","Silent alert mode started. Guardian notification will be prepared.","🛡️")};
$("#callBtn").onclick=()=>{addEvent("Emergency dialer opened","India emergency number");window.location.href="tel:112"};
$("#locBtn").onclick=()=>{
  if(!navigator.geolocation){alert("Geolocation is not supported.");return}
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude,longitude}=pos.coords; window.demoLocation=`https://maps.google.com/?q=${latitude},${longitude}`;
    addEvent("Current location captured","GPS permission granted");
    alert("Location captured for demo:\\n"+window.demoLocation);
  },()=>alert("Please allow location permission in the browser."));
};
$("#saveContact").onclick=()=>{const p=$("#guardian").value.trim();localStorage.setItem("guardian",p);addEvent("Guardian contact saved")};
const saved=localStorage.getItem("guardian"); if(saved) $("#guardian").value=saved;
$("#waBtn").onclick=()=>{const p=phone(); if(!p)return alert("Enter guardian number first."); window.open("https://wa.me/"+p.replace("+","")+"?text="+encodeURIComponent(message()),"_blank")};
$("#smsBtn").onclick=()=>{const p=phone(); if(!p)return alert("Enter guardian number first."); window.location.href="sms:"+p+"?body="+encodeURIComponent(message())};

setInterval(()=>{
  const base=72+Math.floor(Math.random()*9-4); $("#hr").textContent=base;
  $("#spo2").textContent=(97+Math.floor(Math.random()*2))+"%";
  const s=6842+Math.floor(Math.random()*50); $("#steps").textContent=s.toLocaleString();
},2500);
