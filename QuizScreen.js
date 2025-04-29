import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const quizData = [
  {
    question: 'React Native hangi platformlar için mobil uygulama geliştirmeye olanak sağlar?',
    options: ['Android ve iOS', 'Android', 'iOS', 'Windows'],
    correctAnswer: 0,
    explanation: 'React Native, Android ve iOS platformlarında mobil uygulamalar geliştirmek için kullanılır.',
  },
  {
    question: 'React Native hangi dilde yazılmaktadır?',
    options: ['JavaScript', 'Java', 'Swift', 'Python'],
    correctAnswer: 0,
    explanation: 'React Native, JavaScript ile yazılmaktadır.',
  },
  {
    question: 'React Native ile native modülleri nasıl kullanabiliriz?',
    options: ['Native Modules', 'Java', 'Swift', 'Objective-C'],
    correctAnswer: 0,
    explanation: 'React Native, native modülleri kullanmak için JavaScript ile bağlanan "Native Modules" kullanır.',
  },
  // ...diğer sorular
];

export default function QuizScreen() {
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex, selectedIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = selectedIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === quizData[index].correctAnswer).length;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Quiz</Text>

      {!showResults ? (
        quizData.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
            {item.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: selectedAnswers[index] === optionIndex ? '#d3d3d3' : '#f0f0f0',
                  },
                ]}
                onPress={() => handleAnswerSelect(index, optionIndex)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}

            {selectedAnswers[index] !== null && selectedAnswers[index] !== item.correctAnswer && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanation}>{item.explanation}</Text>
              </View>
            )}
          </View>
        ))
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>Sonuç: {calculateScore()} / {quizData.length}</Text>
          {selectedAnswers.map((answer, index) => (
            <View key={index} style={styles.resultRow}>
              <Text style={styles.resultText}>
                {answer === quizData[index].correctAnswer ? 'Doğru' : 'Yanlış'} - {quizData[index].question}
              </Text>
            </View>
          ))}
          <TouchableOpacity style={styles.retryButton} onPress={() => setShowResults(false)}>
            <Text style={styles.buttonText}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showResults && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sonuçları Göster</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
  questionContainer: {
    marginBottom: hp('3%'),
  },
  question: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  optionButton: {
    padding: wp('4%'),
    borderRadius: 8,
    marginBottom: hp('1%'),
  },
  optionText: {
    fontSize: wp('4%'),
  },
  explanationContainer: {
    padding: wp('4%'),
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: hp('2%'),
  },
  explanation: {
    fontSize: wp('4%'),
    color: '#555',
  },
  submitButton: {
    padding: wp('4%'),
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: hp('3%'),
  },
  resultText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  resultRow: {
    marginBottom: hp('1%'),
  },
  retryButton: {
    padding: wp('4%'),
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
});
