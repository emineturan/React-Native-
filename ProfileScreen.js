import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Örnek rozetler ve ödüller
const badges = [
  { id: 1, title: 'Yeni Başlayan', description: 'İlk başarıyı elde et.' },
  { id: 2, title: 'Mükemmeliyet', description: 'Mükemmel bir projeyi başarıyla tamamla.' },
];

const awards = [
  { id: 1, title: 'En İyi Çalışan', description: 'Yılın en iyi çalışanı.' },
  { id: 2, title: 'En İyi Proje', description: 'En iyi projeyi tamamla.' },
];

const ProfileScreen = ({ navigation }) => {
  const [note, setNote] = useState('');
  const [reminder, setReminder] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profil',
    });
  }, [navigation]);

  const handleSaveNote = () => {
    console.log('Not kaydedildi: ', note);
  };

  const handleSaveReminder = () => {
    console.log('Hatırlatıcı kaydedildi: ', reminder);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profil Resmi ve Kullanıcı Bilgileri */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://www.example.com/profile.jpg' }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Ahmet Yılmaz</Text>
          <Text style={styles.userBio}>Yazılım Geliştirici ve Teknoloji Meraklısı</Text>
        </View>
      </View>

      {/* Rozetler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rozetler</Text>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badge}>
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
          </View>
        ))}
      </View>

      {/* Ödüller */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ödüller</Text>
        {awards.map((award) => (
          <View key={award.id} style={styles.award}>
            <Text style={styles.awardTitle}>{award.title}</Text>
            <Text style={styles.awardDescription}>{award.description}</Text>
          </View>
        ))}
      </View>

      {/* Kendi Notlarım */}
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

      {/* Günlük Hatırlatıcı */}
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

      {/* Ayarlar Butonu */}
      <View style={styles.section}>
        <Button
          title="Ayarlar"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginRight: 16,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userBio: {
    fontSize: 16,
    color: '#555',
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
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  badgeDescription: {
    fontSize: 14,
    color: '#777',
  },
  award: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
  },
  awardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  awardDescription: {
    fontSize: 14,
    color: '#777',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
