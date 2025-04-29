import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const competitions = [
  {
    id: 1,
    title: 'Haftalık Kodlama Yarışması',
    description: 'Her hafta yeni bir React Native projesi geliştirin ve puanlarınızı toplayın!',
    prize: '🏆 1000 Puan',
    deadline: '3 gün kaldı'
  },
  {
    id: 2,
    title: 'Quiz Şampiyonası',
    description: 'Tüm derslerin quizlerini çözün ve en yüksek puanı alın!',
    prize: '🎯 500 Puan',
    deadline: '5 gün kaldı'
  },
  {
    id: 3,
    title: 'Proje Geliştirme Maratonu',
    description: '24 saat içinde en iyi mobil uygulamayı geliştirin!',
    prize: '🌟 2000 Puan',
    deadline: '7 gün kaldı'
  }
];

export default function CompetitionScreen({ route }) {
  const { theme } = route.params;

  const renderCompetition = ({ item }) => (
    <TouchableOpacity
      style={[styles.competitionCard, { backgroundColor: theme.colors.card }]}
    >
      <Text style={[styles.competitionTitle, { color: theme.colors.text }]}>
        {item.title}
      </Text>
      <Text style={[styles.competitionDescription, { color: theme.colors.text }]}>
        {item.description}
      </Text>
      <View style={styles.competitionFooter}>
        <Text style={[styles.prize, { color: theme.colors.primary }]}>
          {item.prize}
        </Text>
        <Text style={[styles.deadline, { color: theme.colors.danger }]}>
          {item.deadline}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={competitions}
        renderItem={renderCompetition}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: wp('4%'),
  },
  competitionCard: {
    padding: wp('4%'),
    borderRadius: 8,
    marginBottom: hp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  competitionTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  competitionDescription: {
    fontSize: wp('3.5%'),
    marginBottom: hp('2%'),
  },
  competitionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prize: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
  deadline: {
    fontSize: wp('3.5%'),
  },
}); 