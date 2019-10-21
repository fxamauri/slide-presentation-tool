import React, {useState} from 'react';
import Button from './src/components/Button';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Text,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import request from './src/request';

function App() {
  const [ip, setIp] = useState('');
  const [code, setCode] = useState('');
  const [connected, setConnected] = useState(false);
  const [connectedIp, setConnectedIp] = useState('');

  async function storeData(ipStore, codeStore) {
    try {
      await AsyncStorage.setItem('@ip', ipStore);
      await AsyncStorage.setItem('@code', codeStore);
    } catch (err) {
      Alert.alert('Ops', 'problemas ao tentar armazenar informações');
    }
  }

  async function getStoredData() {
    try {
      const ipStored = await AsyncStorage.getItem('@ip');
      const codeStored = await AsyncStorage.getItem('@code');
      return {ipStored: ipStored || '', codeStored: codeStored || ''};
    } catch (err) {
      throw err;
    }
  }

  function clearConnect() {
    setConnected(false);
    storeData('', '');
    setConnectedIp('');
  }

  async function connect() {
    try {
      await request(ip + '/testconnection', 'POST', code);
      setConnected(true);
      storeData(ip, code);
      const {ipStored} = await getStoredData();
      setConnectedIp(ipStored);
    } catch (err) {
      clearConnect();
      Alert.alert('Ops', 'Problemas ao tentar conectar');
    }
  }

  async function handleConnect() {
    if (connected) {
      clearConnect();
    } else {
      connect();
    }
  }

  async function handlePrevious() {
    try {
      await request(ip + '/previous', 'POST', code);
    } catch (err) {
      clearConnect();
      Alert.alert('Problemas ao conectar com o servidor');
    }
  }

  async function handleNext() {
    try {
      await request(ip + '/next', 'POST', code);
    } catch (err) {
      clearConnect();
      Alert.alert('Problemas ao conectar com o servidor');
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          enabled={Platform.OS === 'ios'}
          behavior={'padding'}
          style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>Ip do servidor</Text>
            <TextInput
              style={styles.textInput}
              placeholder="http://192.168.10.10"
              underlineColorAndroid="transparent"
              value={ip}
              onChangeText={setIp}
            />
            <Text style={styles.label}>Chave</Text>
            <TextInput
              style={styles.textInput}
              placeholder="#000"
              underlineColorAndroid="transparent"
              value={code}
              onChangeText={setCode}
            />
            <Button
              style={[
                styles.connectButton,
                connected ? styles.connectedButton : styles.notConnectedButton,
              ]}
              title={connected ? 'Desconectar' : 'Conectar'}
              onPress={handleConnect}
            />
            {connected && <Text style={styles.textInfo}>Conectado</Text>}
            <Text style={styles.textInfo}>{connectedIp}</Text>
          </View>
          <View style={styles.actionView}>
            <View style={styles.buttonsContainer}>
              <Button title="Voltar" onPress={handlePrevious} />
            </View>
            <View style={styles.buttonsContainer}>
              <Button title="Avançar" onPress={handleNext} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  content: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
  textInfo: {
    marginTop: 2,
    textAlign: 'center',
  },
  actionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    paddingTop: 60,
    margin: 5,
  },
  connectedButton: {
    backgroundColor: '#FFBB00',
  },
  notConnectedButton: {
    backgroundColor: '#3ccbda',
  },
  connectButton: {
    marginTop: 15,
  },
  label: {
    color: '#2b2b2b',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 2,
  },
  textInput: {
    borderColor: '#9c9c9c',
    color: '#2b2b2b',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
    height: 45,
    marginBottom: 10,
  },
});

export default App;
