import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useProgress } from '../hooks/useProgress';

const { width } = Dimensions.get('window');

export default function LessonScreen({ navigation, route }) {
  const { lesson, theme } = route.params;
  const { completeLesson } = useProgress();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleComplete = async () => {
    const success = await completeLesson(lesson.id, lesson.badge);
    if (success) {
      Alert.alert(
        'Tebrikler! 🎉',
        'Dersi başarıyla tamamladınız!',
        [
          {
            text: 'Devam Et',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {lesson.title}
        </Text>
        
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {lesson.content}
        </Text>

        <View style={styles.quizContainer}>
          <Text style={[styles.quizTitle, { color: theme.colors.text }]}>
            Quiz
          </Text>
          <Text style={[styles.question, { color: theme.colors.text }]}>
            {lesson.quiz.question}
          </Text>

          {lesson.quiz.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                {
                  backgroundColor: selectedAnswer === index
                    ? index === lesson.quiz.correctAnswer
                      ? theme.colors.success
                      : theme.colors.danger
                    : theme.colors.card
                }
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              <Text style={[styles.optionText, { color: theme.colors.text }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}

          {showExplanation && (
            <View style={styles.explanationContainer}>
              <Text style={[styles.explanation, { color: theme.colors.text }]}>
                {lesson.quiz.explanation}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.playgroundContainer}>
          <Text style={[styles.playgroundTitle, { color: theme.colors.text }]}>
            Playground
          </Text>
          <Text style={[styles.task, { color: theme.colors.text }]}>
            {lesson.playground.task}
          </Text>
          <View style={[styles.codeContainer, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.code, { color: theme.colors.text }]}>
              {lesson.playground.template}
            </Text>
          </View>
        </View>

        {showExplanation && (
          <TouchableOpacity
            style={[styles.completeButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>
              Dersi Tamamla
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: wp('4%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  description: {
    fontSize: wp('4%'),
    lineHeight: wp('6%'),
    marginBottom: hp('4%'),
  },
  quizContainer: {
    marginBottom: hp('4%'),
  },
  quizTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  question: {
    fontSize: wp('4%'),
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
    marginTop: hp('2%'),
    padding: wp('4%'),
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  explanation: {
    fontSize: wp('4%'),
  },
  playgroundContainer: {
    marginBottom: hp('4%'),
  },
  playgroundTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  task: {
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
  },
  codeContainer: {
    padding: wp('4%'),
    borderRadius: 8,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: wp('4%'),
  },
  completeButton: {
    padding: wp('4%'),
    borderRadius: 8,
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
}); 