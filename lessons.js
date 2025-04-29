export const lessons = [
  {
    id: 1,
    title: "React Native'e Giriş",
    content: "React Native, Facebook tarafından geliştirilen açık kaynaklı bir mobil uygulama geliştirme framework'üdür.",
    quiz: {
      question: "React Native'de temel konteyner bileşeni hangisidir?",
      options: ["Button", "Text", "View", "Image"],
      correctAnswer: 2,
      explanation: "View bileşeni, React Native'de temel konteyner bileşenidir ve div elementine benzer şekilde çalışır."
    },
    playground: {
      task: "Bir View bileşeni oluşturun ve içine 'Merhaba Dünya!' yazan bir Text bileşeni ekleyin.",
      template: "// Kodunuzu buraya yazın\n",
      solution: "<View style={{padding: 20}}>\n  <Text>Merhaba Dünya!</Text>\n</View>"
    },
    badge: {
      id: "first_steps",
      name: "İlk Adımlar Rozeti",
      icon: "🎯"
    }
  },
  {
    id: 2,
    title: "Temel Bileşenler",
    content: "React Native'de en sık kullanılan bileşenler: View, Text, Image, ScrollView ve TouchableOpacity.",
    quiz: {
      question: "Hangisi dokunmatik olaylari dinlemek için kullanılır?",
      options: ["TouchableOpacity", "Pressable", "Button", "Hepsi"],
      correctAnswer: 3,
      explanation: "TouchableOpacity, Pressable ve Button bileşenleri dokunmatik olayları dinlemek için kullanılabilir."
    },
    playground: {
      task: "Bir TouchableOpacity bileşeni oluşturun ve tıklandığında konsola mesaj yazdırın.",
      template: "// Kodunuzu buraya yazın\n",
      solution: "<TouchableOpacity onPress={() => console.log('Tıklandı!')}>\n  <Text>Bana Tıkla!</Text>\n</TouchableOpacity>"
    },
    badge: {
      id: "component_master",
      name: "Bileşen Ustası Rozeti",
      icon: "🏆"
    }
  },
  {
    id: 3,
    title: "Stil ve Layout",
    content: "React Native'de stillendirme, JavaScript objeleri kullanılarak yapılır ve Flexbox layout sistemi kullanılır.",
    quiz: {
      question: "Flexbox'ta items'ları yatayda ortalamak için hangi özellik kullanılır?",
      options: ["alignItems", "justifyContent", "flexDirection", "flex"],
      correctAnswer: 1,
      explanation: "justifyContent özelliği, ana eksende (main axis) hizalama yapmak için kullanılır."
    },
    playground: {
      task: "Bir View içindeki Text'i hem dikeyde hem yatayda ortalayın.",
      template: "// Kodunuzu buraya yazın\n",
      solution: "<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>\n  <Text>Ortada!</Text>\n</View>"
    },
    badge: {
      id: "style_master",
      name: "Stil Ustası Rozeti",
      icon: "🎨"
    }
  }
]; 