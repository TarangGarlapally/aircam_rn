import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
  Button,
  TextInput
} from 'react-native';


import { NodeCameraView } from "react-native-nodemediaclient";

const styles = StyleSheet.create({
  view: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'relative',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 50,
    position: 'absolute',
    zIndex: 2,
    bottom: 50,
  },
  buttonWrapper2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 50,
    position: 'absolute',
    zIndex: 2,
    top: 50,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#014484',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  redtext: {
    width: 500,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'system',
  },
  buttonText2: {
    color: 'red',
    fontFamily: 'roboto',
  },
});

const config = {
  cameraConfig: {
    cameraId: 1,
    cameraFrontMirror: false
  },
  videoConfig: {
    preset: 4,
    bitrate: 2000000,
    profile: 2,
    fps: 30,
    videoFrontMirror: true,
  },
  audioConfig: {
    bitrate: 128000,
    profile: 1,
    samplerate: 44100,
  }
};
class App extends React.Component {
  vb = null;


  state = {
    isStreaming: false,
    dispmodal:false,
    urlval:"192.168.0.3"
  };


  videoSettings = {
    preset: 12,
    bitrate: 400000,
    profile: 1,
    fps: 15,
    videoFrontMirror: false,
  };






  get height() {
    return Dimensions.get('window').height;
  }


  get width() {
    return Dimensions.get('window').width;
  }


  toggleStream = async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);


    if (this.state.isStreaming) {
      this.vb.stop();
    } else {
      this.vb.start();
    }
    this.setState({
      isStreaming: !this.state.isStreaming,
    });
  };


  getUrl = () => {
    if(!this.state.isStreaming){
    this.setState({
      dispmodal: !this.state.dispmodal,
    });
    }
    else{
      this.toggleStream();
    }
  }

  handleUrlIpChange = ()=>{

  }
  handleStreamClick = ()=>{
    this.toggleStream();
    this.setState({dispmodal: !this.state.dispmodal})
  }

  render() {
    const streamKey = 'abc';
    const url = `rtmp://${this.state.urlval}/stream/${streamKey}`;

    return (
      <>
        <StatusBar barStyle="dark-content" />
          <Modal            
          animationType = {"fade"}  
          transparent = {false}  
          visible = {this.state.dispmodal}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          {/*All views of Modal*/}  
              <View style = {{justifyContent: 'center',  
                alignItems: 'center',   
                backgroundColor : "#ffffff",   
                height: 300 ,  
                width: '80%',  
                borderRadius:10,  
                borderWidth: 1,  
                borderColor: '#fff',    
                marginTop: 80,  
                marginLeft: 40,  }}>  
              <Text style = {styles.text}>Enter your PC's/laptop's IP address</Text>  
                <TextInput
                  style={{ height: 40,margin:10, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.setState({urlval: text})}
                  value={this.state.urlval}
                />
              <Button title="Stream now!" onPress = {this.handleStreamClick}/>  
          </View>  
        </Modal>  
        <View style={styles.view}>
          
          <NodeCameraView
            style={{
              height: this.height,
              width: this.width,
              zIndex: 1,
              backgroundColor: '#000000',
            }}
            ref={vb => {
              this.vb = vb;
            }}
            outputUrl={url}
           camera={config.cameraConfig}
        audio={config.audioConfig}
        video={config.videoConfig}
            autopreview={true}></NodeCameraView>

            {this.state.isStreaming?<View style={styles.buttonWrapper2}>
            <TouchableOpacity>
              <View style={styles.redtext}>
                <Text style={styles.buttonText2}>
                  Streaming to
                </Text>
                <Text style={styles.buttonText2}>{url}</Text>
              </View>
            </TouchableOpacity>
          </View>:null}



          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={this.getUrl}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {this.state.isStreaming
                    ? 'Stop Streaming'
                    : 'Start Streaming'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}


export default App;

