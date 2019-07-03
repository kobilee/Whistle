import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
} from 'react-native';
import Voice from 'react-native-voice';
export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      test: "",
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }


componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
render () {
  if (this.state.results[0] == "done"){
      setTimeout(() => {
        this.setState({test: "test"})
      }, 3000);
   }
    console.log(this.state.results[0])
    return (
      <View>
        <Text style={styles.transcript}>
            Transcript
        </Text>
        <Text style={styles.transcript}> {this.state.results[0]} </Text>
        <Text style={styles.transcript}> {this.state.test} </Text>
        <Button style={styles.transcript}
        onPress={this._startRecognition.bind(this)}
        title="Start"></Button>
      </View>
    );
      }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
});
AppRegistry.registerComponent('VoiceNative', () => VoiceNative);