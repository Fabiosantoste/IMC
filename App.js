import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

// Importa a imagem da balança da pasta assets
import BalancaImage from './assets/balança.png';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imc, setImc] = useState(null);
  const [classification, setClassification] = useState('');

  const calculateIMC = () => {
    if (weight && height) {
      const heightInMeters = parseFloat(height);
      const weightInKg = parseFloat(weight);
      const imcValue = weightInKg / (heightInMeters * heightInMeters);

      setImc(imcValue.toFixed(2));
      classifyIMC(imcValue);
    }
  };

  const classifyIMC = (imc) => {
    if (imc < 18.5) {
      setClassification('Abaixo do peso');
    } else if (imc >= 18.5 && imc < 24.9) {
      setClassification('Peso normal');
    } else if (imc >= 25 && imc < 29.9) {
      setClassification('Sobrepeso');
    } else if (imc >= 30 && imc < 39.9) {
      setClassification('Obesidade');
    } else {
      setClassification('Obesidade grave');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      <Image source={BalancaImage} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <Button title="Calcular IMC" onPress={calculateIMC} />
      {imc && (
        <View style={styles.result}>
          <Text style={styles.resultText}>IMC: {imc}</Text>
          <Text style={styles.resultText}>Classificação: {classification}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
