import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Switch
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { lessons } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { darkTheme, lightTheme } from '../theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation, route }) {
  const { theme = lightTheme, toggleTheme } = route.params || {};
  const { canAccessLesson, isLessonCompleted } = useProgress();

  const renderItem = ({ item }) => {
    const isCompleted = isLessonCompleted(item.id);
    const canAccess = canAccessLesson(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.lessonCard,
          { 
            backgroundColor: theme.colors.card,
            opacity: canAccess ? 1 : 0.5 
          }
        ]}
        onPress={() => canAccess && navigation.navigate('Lesson', { lesson: item, theme })}
        disabled={!canAccess}
      >
        <Text style={[styles.lessonTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
        <View style={styles.statusContainer}>
          {isCompleted && (
            <Text style={[styles.completedText, { color: theme.colors.success }]}>
              ✓ Tamamlandı
            </Text>
          )}
          {!canAccess && (
            <Text style={[styles.lockedText, { color: theme.colors.danger }]}>
              🔒 Kilitli
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.profileButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('Profile', { theme })}
        >
          <Text style={styles.profileButtonText}>Profilim</Text>
        </TouchableOpacity>
        <View style={styles.themeSwitch}>
          <Text style={[styles.themeSwitchText, { color: theme.colors.text }]}>
            🌙 Dark Mode
          </Text>
          <Switch value={theme === darkTheme} onValueChange={toggleTheme} />
        </View>
      </View>
      <FlatList
        data={lessons}
        renderItem={renderItem}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
  },
  profileButton: {
    padding: wp('2%'),
    borderRadius: 8,
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  themeSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeSwitchText: {
    marginRight: wp('2%'),
  },
  listContainer: {
    padding: wp('4%'),
  },
  lessonCard: {
    padding: wp('4%'),
    borderRadius: 8,
    marginBottom: hp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lessonTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  completedText: {
    fontSize: wp('3.5%'),
  },
  lockedText: {
    fontSize: wp('3.5%'),
  },
}); 