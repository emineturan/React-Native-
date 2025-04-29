import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput, Image, Button } from 'react-native';





const Tab = createBottomTabNavigator();

// Dersler Listesi
const lessons = [
  {
    id: 1,
    title: "React Native'e Giriş",
    description: "React Native nedir? Neden kullanmalıyız? Temel kavramlar.",
    videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
    duration: "15 dakika"
  },
  {
    id: 2,
    title: "Temel Bileşenler",
    description: "View, Text, Image, ScrollView gibi temel bileşenlerin kullanımı.",
    videoUrl: "https://www.youtube.com/watch?v=1g3_CFmnU7k",
    duration: "20 dakika"
  },
  {
    id: 3,
    title: "Stil ve Layout",
    description: "Flexbox, StyleSheet ve responsive tasarım.",
    videoUrl: "https://www.youtube.com/watch?v=6Vr5QYvZzrA",
    duration: "25 dakika"
  },
  {
    id: 4,
    title: "State ve Props",
    description: "React Native'de state yönetimi ve props kullanımı.",
    videoUrl: "https://www.youtube.com/watch?v=4ORZ1GmjaMc",
    duration: "30 dakika"
  },
  {
    id: 5,
    title: "Navigation",
    description: "React Navigation ile sayfa geçişleri ve yönlendirme.",
    videoUrl: "https://www.youtube.com/watch?v=nQVCkqvU1uE",
    duration: "35 dakika"
  }
];

// Dersler Ekranı
const HomeScreen = () => {
  const handleVideoPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>React Native Dersleri</Text>
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={styles.lessonCard}
          onPress={() => handleVideoPress(lesson.videoUrl)}
        >
          <View style={styles.lessonHeader}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.duration}>{lesson.duration}</Text>
          </View>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
          <View style={styles.videoButton}>
            <Ionicons name="play-circle-outline" size={24} color="#fff" />
            <Text style={styles.videoButtonText}>Dersi İzle</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Quiz Ekranı
const QuizScreen = () => {
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
  ];

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
                  { backgroundColor: selectedAnswers[index] === optionIndex ? '#d3d3d3' : '#f0f0f0' },
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
};

// Yarışmalar Ekranı
const CompetitionScreen = () => {
  const competitors = [
    { name: 'Esma', score: 95, isActive: true },
    { name: 'Deniz', score: 90, isActive: true },
    { name: 'Sude', score: 85, isActive: false },
    { name: 'Aslı', score: 80, isActive: true },
    { name: 'Gaye', score: 75, isActive: false },
  ];

  // Kullanıcı yarışma başlatma fonksiyonu
  const startCompetition = (competitor) => {
    if (competitor.isActive) {
      alert(`Yarışmaya başladınız: ${competitor.name}`);
    } else {
      alert(`${competitor.name} şu anda aktif değil.`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Yarışmalar</Text>
      <Text style={styles.subtitle}>İlk 5 Yarışmacı:</Text>

      {competitors.map((competitor, index) => (
        <View key={index} style={styles.competitorContainer}>
          <Text style={styles.competitorName}>{index + 1}. {competitor.name}</Text>
          <Text style={styles.competitorScore}>Puan: {competitor.score}</Text>
          <Text style={[styles.competitorStatus, competitor.isActive ? styles.active : styles.inactive]}>
            {competitor.isActive ? 'Aktif' : 'Aktif Değil'}
          </Text>
          <TouchableOpacity 
            style={[styles.button, competitor.isActive ? styles.activeButton : styles.inactiveButton]} 
            onPress={() => startCompetition(competitor)} 
            disabled={!competitor.isActive}
          >
            <Text style={styles.buttonText}>
              {competitor.isActive ? 'Yarışmaya Başla' : 'Beklemede'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

// Rozetler ve Ödüller Dummy Verisi
const badges = [
  { id: 1, title: "Başlangıç Rozeti", description: "İlk dersi tamamladın!" },
  { id: 2, title: "Quiz Ustası", description: "Tüm quizleri başarıyla tamamladın!" }
];

const awards = [
  { id: 1, title: "Haftanın Öğrencisi", description: "En çok ilerleme kaydeden öğrenci." }
];

// Profil Ekranı
const ProfileScreen = () => {
  const [note, setNote] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSaveNote = () => {
    console.log('Not kaydedildi: ', note);
  };

  const handleSaveReminder = () => {
    console.log('Hatırlatıcı kaydedildi: ', reminder);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://www.example.com/profile.jpg' }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Emine TURAN</Text>
          <Text style={styles.userBio}>Yazılım Geliştirici ve Teknoloji Meraklısı</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rozetler</Text>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badge}>
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ödüller</Text>
        {awards.map((award) => (
          <View key={award.id} style={styles.award}>
            <Text style={styles.awardTitle}>{award.title}</Text>
            <Text style={styles.awardDescription}>{award.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kendi Notlarım</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Notunuzu buraya yazın..."
          value={note}
          onChangeText={setNote}
        />
        <Button title="Notu Kaydet" onPress={handleSaveNote} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Günlük Hatırlatıcı</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Hatırlatıcıyı buraya yazın..."
          value={reminder}
          onChangeText={setReminder}
        />
        <Button title="Hatırlatıcıyı Kaydet" onPress={handleSaveReminder} />
      </View>
    </ScrollView>
  );
};

// Kod Yazma Ekranı
const CodeScreen = () => {
  const exampleProjects = [
    {
      name: "Buton ve Yazı",
      code: "<Button title='Tıkla' onPress={() => alert('Butona tıklandı!')} />",
    },
    {
      name: "Merhaba Dünya",
      code: "<Text>Merhaba Dünya!</Text>",
    },
    {
      name: "Basit View",
      code: "<View style={{backgroundColor: 'blue', padding: 20}}><Text>View İçinde Yazı</Text></View>",
    },
  ];

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleProjectSelect = (selectedCode) => {
    setCode(selectedCode);
  };

  const runCode = () => {
    setOutput(code);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kod Yaz</Text>

      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Örnek Projeler:</Text>
      {exampleProjects.map((project, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleProjectSelect(project.code)}
        >
          <Text style={styles.optionText}>{project.name}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={{
          height: 150,
          borderColor: '#ccc',
          borderWidth: 1,
          marginTop: 20,
          marginBottom: 20,
          padding: 10,
          textAlignVertical: 'top',
        }}
        multiline
        value={code}
        onChangeText={setCode}
        placeholder="Kodunuzu yazın veya örneklerden seçin..."
      />

      <TouchableOpacity style={styles.submitButton} onPress={runCode}>
        <Text style={styles.buttonText}>Çalıştır</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Çıktı:</Text>
        <Text>{output}</Text>
      </View>
    </ScrollView>
  );
};

// Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Dersler') {
              iconName = 'book';
            } else if (route.name === 'Quiz') {
              iconName = 'help-circle';
            } else if (route.name === 'Yarışmalar') {
              iconName = 'trophy';
            } else if (route.name === 'Profil') {
              iconName = 'person';
            } else if (route.name === 'Kod Yaz') {
              iconName = 'code';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Dersler" component={HomeScreen} />
        <Tab.Screen name="Quiz" component={QuizScreen} />
        <Tab.Screen name="Yarışmalar" component={CompetitionScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
        <Tab.Screen name="Kod Yaz" component={CodeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lessonCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 14,
    color: 'gray',
  },
  lessonDescription: {
    marginTop: 10,
    fontSize: 14,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  videoButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
  explanationContainer: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#ffe0e0',
    borderRadius: 5,
  },
  explanation: {
    color: 'red',
  },
  resultsContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  resultRow: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {},
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userBio: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  badgeTitle: {
    fontWeight: 'bold',
  },
  badgeDescription: {
    color: 'gray',
  },
  award: {
    backgroundColor: '#fff9c4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  awardTitle: {
    fontWeight: 'bold',
  },
  awardDescription: {
    color: 'gray',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#800000', // Burgundy Color
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  competitorContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  competitorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  competitorScore: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  competitorStatus: {
    fontSize: 14,
    marginVertical: 5,
  },
  active: {
    color: '#28a745', // Green for active
  },
  inactive: {
    color: '#dc3545', // Red for inactive
  },
  button: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007bff', // Blue for active
  },
  inactiveButton: {
    backgroundColor: '#6c757d', // Grey for inactive
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});


