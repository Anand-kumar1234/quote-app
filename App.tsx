import React, { useState, useEffect,  } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Clipboard,Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import tts from 'react-native-Tts';
tts.setDefaultLanguage('en-GB');
tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
tts.setDefaultRate(0.5)
tts.setDefaultPitch(1.2)
const App = () => {
  const [quote, setQuote] = useState('Loading');
  const [author, setauthor] = useState('Loading');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);
const speaknow=()=>{
  tts.stop();
tts.speak(quote +'by'+author);

}
const copytoClipboard=()=>{
  Clipboard.setString('hello world');
  Snackbar.show({
    text:'quote copied',
    duration:Snackbar.LENGTH_SHORT,
  });
}
const tweetnow=()=>{
  const url="https://twitter.com/intent/tweet?text="+quote;
  Linking.openURL(url);
}
  const fetchQuote = () => {
    setisLoading(true);
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of objects with 'text' and 'author' properties
        const { text, author } = data[Math.floor(Math.random() * data.length)];
        setQuote(text);
        setauthor(author);
        setisLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(23,123,223)',
      }}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
        }}>
        <Text style={{ textAlign: 'center', fontSize: 26 }}>
          Quote of the Day
        </Text>

        <FontAwesome5
          name="quote-left"
          style={{ fontSize: 20, textAlign: 'left' }}
          color="#000"
        />

        <Text
          style={{
            color: 'rgb(123,22,213)',
            fontSize: 16,
            lineHeight: 26,
            letterSpacing: 2.1,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: 10,
            paddingHorizontal: 30,
          }}>
          {quote}
        </Text>

        <FontAwesome5
          name="quote-right"
          style={{
            fontSize: 20,
            textAlign: 'right',
            marginTop: -20,
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            textAlign: 'right',
            fontWeight: '300',
            fontStyle: 'italic',
            fontSize: 20,
            color: 'black',
          }}>
          - {author}
        </Text>

        <TouchableOpacity
          onPress={fetchQuote}
          style={{
            backgroundColor: 'rgb(34,222,146)',
            padding: 20,
            borderRadius: 40,
            marginVertical: 20,
          }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
            {isLoading ? 'Loading...' : 'New Quote'}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={speaknow}
            style={{
              borderWidth: 2,
              borderColor: 'rgb(22,123,22)',
              borderRadius: 50,
              padding: 20,
            }}>
            <FontAwesome name="volume-up" size={22} color="rgb(22,221,122)" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={tweetnow}
            style={{
              borderWidth: 2,
              borderColor: 'rgb(22,123,22)',
              borderRadius: 50,
              padding: 20,
            }}>
            <FontAwesome name="twitter" size={22} color="rgb(22,221,122)" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={copytoClipboard}
            style={{
              borderWidth: 2,
              borderColor: 'rgb(22,123,22)',
              borderRadius: 50,
              padding: 20,
            }}>
            <FontAwesome name="copy" size={22} color="rgb(22,221,122)" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;
