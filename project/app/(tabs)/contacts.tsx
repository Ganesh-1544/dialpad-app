import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';

export default function ContactsList() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        setContacts(data);
      }
    })();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Contacts.Contact }) => (
    <Pressable
      style={({ pressed }) => [
        styles.contactItem,
        pressed && { opacity: 0.7 },
        isDark && styles.contactItemDark,
      ]}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>
          {item.name?.[0]?.toUpperCase() || '?'}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, isDark && styles.textLight]}>
          {item.name}
        </Text>
        {item.phoneNumbers && item.phoneNumbers[0] && (
          <Text style={styles.contactNumber}>
            {item.phoneNumbers[0].number}
          </Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textLight]}>Contacts</Text>
      </View>
      
      <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
        <Ionicons 
          name="search" 
          size={20} 
          color={isDark ? '#ffffff' : '#000000'} 
          style={styles.searchIcon} 
        />
        <TextInput
          style={[styles.searchInput, isDark && styles.searchInputDark]}
          placeholder="Search contacts"
          placeholderTextColor={isDark ? '#8e8e93' : '#8e8e93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, isDark && styles.separatorDark]} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e5ea',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 36,
  },
  searchContainerDark: {
    backgroundColor: '#1c1c1e',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#000000',
  },
  searchInputDark: {
    color: '#ffffff',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  contactItemDark: {
    backgroundColor: '#000000',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
  },
  contactInfo: {
    marginLeft: 12,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '500',
  },
  contactNumber: {
    fontSize: 15,
    color: '#8e8e93',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5ea',
    marginLeft: 68,
  },
  separatorDark: {
    backgroundColor: '#2c2c2e',
  },
});