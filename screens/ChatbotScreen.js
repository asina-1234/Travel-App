import React, { useState, useRef, useEffect } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
ScrollView,
KeyboardAvoidingView,
Platform,
Keyboard,
ImageBackground,
SafeAreaView
} from "react-native";

export default function ChatbotScreen() {

const destinationsDB = {

Ooty:{country:"India",state:"Tamil Nadu",famous:["Botanical Garden","Ooty Lake","Doddabetta Peak"],hidden:["Avalanche Lake","Pykara Falls"],alert:"Cold weather, carry jackets"},
Kodaikanal:{country:"India",state:"Tamil Nadu",famous:["Kodai Lake","Coaker's Walk","Bryant Park"],hidden:["Guna Cave","Pillar Rocks"],alert:"Fog and slippery roads"},
Yercaud:{country:"India",state:"Tamil Nadu",famous:["Yercaud Lake","Pagoda Point"],hidden:["Emerald Lake"],alert:"Hill driving roads"},
Kutralam:{country:"India",state:"Tamil Nadu",famous:["Main Falls","Five Falls"],hidden:["Old Temple paths"],alert:"High water flow in season"},
Rameswaram:{country:"India",state:"Tamil Nadu",famous:["Ramanathaswamy Temple","Pamban Bridge"],hidden:["Dhanushkodi ruins"],alert:"Hot climate"},
Dhanushkodi:{country:"India",state:"Tamil Nadu",famous:["Ghost Town","Sea Point"],hidden:["End of India"],alert:"Strong winds"},
Kanyakumari:{country:"India",state:"Tamil Nadu",famous:["Vivekananda Rock","Sunset Point"],hidden:["Hidden Beach Trails"],alert:"Crowded during sunset"},
Madurai:{country:"India",state:"Tamil Nadu",famous:["Meenakshi Temple","Thirumalai Nayakkar Palace"],hidden:["Local food streets"],alert:"Very hot weather"},
Chennai:{country:"India",state:"Tamil Nadu",famous:["Marina Beach","Kapaleeshwarar Temple"],hidden:["Elliot’s Beach"],alert:"Hot and humid"},
Coimbatore:{country:"India",state:"Tamil Nadu",famous:["Marudhamalai Temple","Siruvani Waterfalls"],hidden:["Valparai route"],alert:"Moderate climate"},
Thanjavur:{country:"India",state:"Tamil Nadu",famous:["Brihadeeswarar Temple"],hidden:["Village art spots"],alert:"Hot climate"},
Mahabalipuram:{country:"India",state:"Tamil Nadu",famous:["Shore Temple","Pancha Rathas"],hidden:["Hidden rock carvings"],alert:"Sunny weather"},
Yelagiri:{country:"India",state:"Tamil Nadu",famous:["Punganoor Lake","Swamimalai Hill"],hidden:["Nature Park"],alert:"Moderate climate"},
Valparai:{country:"India",state:"Tamil Nadu",famous:["Tea Estates","Monkey Falls"],hidden:["Sholayar Dam"],alert:"Wildlife zone"},
Hogenakkal:{country:"India",state:"Tamil Nadu",famous:["Waterfalls","Coracle Ride"],hidden:["Rock formations"],alert:"Slippery rocks"},

Munnar:{country:"India",state:"Kerala",famous:["Tea Gardens","Eravikulam Park"],hidden:["Hidden waterfalls"],alert:"Cold and misty"},
Alleppey:{country:"India",state:"Kerala",famous:["Backwaters","Houseboats"],hidden:["Village canals"],alert:"Mosquito protection needed"},
Wayanad:{country:"India",state:"Kerala",famous:["Edakkal Caves","Banasura Dam"],hidden:["Forest trails"],alert:"Wildlife area"},
Thekkady:{country:"India",state:"Kerala",famous:["Periyar Wildlife Sanctuary"],hidden:["Spice plantations"],alert:"Forest safety rules"},
Kochi:{country:"India",state:"Kerala",famous:["Fort Kochi","Chinese Fishing Nets"],hidden:["Art cafes"],alert:"Hot humid climate"},
Varkala:{country:"India",state:"Kerala",famous:["Cliff Beach","Sunset View"],hidden:["Hidden beach caves"],alert:"Cliff safety needed"},
Kovalam:{country:"India",state:"Kerala",famous:["Lighthouse Beach"],hidden:["Secret coves"],alert:"Crowded beaches"},
Bekal:{country:"India",state:"Kerala",famous:["Bekal Fort","Beach View"],hidden:["Backwater edges"],alert:"Windy coastal area"},
Kumarakom:{country:"India",state:"Kerala",famous:["Backwaters","Bird Sanctuary"],hidden:["Village canoe rides"],alert:"Water safety"},
Thrissur:{country:"India",state:"Kerala",famous:["Vadakkumnathan Temple"],hidden:["Cultural villages"],alert:"Festival crowd season"}

};

const placeList = Object.keys(destinationsDB).join(", ");

const [messages,setMessages] = useState([
{sender:"bot",text:"Hello! I am your Travel Assistant 🤖"},
{sender:"bot",text:"You can search places like:\n\n" + placeList},
{sender:"bot",text:"Type any place name"}
]);

const [input,setInput] = useState("");
const scrollRef = useRef();

useEffect(()=>{
scrollRef.current?.scrollToEnd({animated:true});
},[messages]);

function addMessage(sender,text){
setMessages(prev => [...prev,{sender,text}]);
}

function handleSend(){

if(input.trim()==="") return;

const userText = input;
addMessage("user", userText);
setInput("");
Keyboard.dismiss();

const key = userText.trim().toLowerCase();
let result = null;

for(let place in destinationsDB){
  if(place.toLowerCase() === key){
    result = destinationsDB[place];
    break;
  }
}

if(result){
  addMessage("bot",
    "📍 Country: " + result.country + "\n" +
    "📍 State: " + result.state + "\n\n" +
    "🏞️ Famous: " + result.famous.join(", ") + "\n\n" +
    "🧭 Hidden: " + result.hidden.join(", ") + "\n\n" +
    "⚠️ Alert: " + result.alert
  );
}else{
  addMessage("bot","❌ Place not found. Please type from the list.");
}

}

return (

<SafeAreaView style={{flex:1}}>

<ImageBackground
source={require("../assets/background.jpg")}
style={{flex:1}}
resizeMode="cover"
>

<KeyboardAvoidingView
style={{flex:1}}
behavior={Platform.OS === "ios" ? "padding" : "height"}
keyboardVerticalOffset={Platform.OS === "android" ? 90 : 0}
>

<View style={{flex:1, paddingTop:10}}>

<ScrollView
ref={scrollRef}
contentContainerStyle={{padding:10}}
keyboardShouldPersistTaps="handled"
>

{messages.map((msg,i)=>(
<View key={i}
style={{
alignSelf: msg.sender==="user" ? "flex-end":"flex-start",
backgroundColor: msg.sender==="user" ? "#90EE90" : "#87CEEB",
padding:10,
margin:5,
borderRadius:10,
maxWidth:"80%"
}}>
<Text style={{color:"#000"}}>
{msg.text}
</Text>
</View>
))}

</ScrollView>

<View style={{
flexDirection:"row",
padding:10,
backgroundColor:"rgba(255,255,255,0.9)",
borderTopWidth:1,
borderColor:"#ccc",
marginBottom:25
}}>

<TextInput
style={{
flex:1,
borderWidth:1,
borderColor:"#ccc",
borderRadius:8,
padding:10,
backgroundColor:"#fff"
}}
value={input}
placeholder="Type place name"
onChangeText={setInput}
/>

<TouchableOpacity
onPress={handleSend}
style={{
backgroundColor:"#0b79d0",
padding:12,
marginLeft:5,
borderRadius:8
}}
>
<Text style={{color:"#fff"}}>Send</Text>
</TouchableOpacity>

</View>

</View>

</KeyboardAvoidingView>
</ImageBackground>

</SafeAreaView>
);
}