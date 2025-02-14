import { View, Text, StyleSheet, FlatList, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for recent calls
const recentCalls = [
  { id: '1', name: 'John Doe', number: '+1 234 567 890', type: 'incoming', time: '3:30 PM' },
  { id: '2', name: 'Jane Smith', number: '+1 987 654 321', type: 'outgoing', time: 'Yesterday' },
  { id: '3', name: 'Unknown', number: '+1 555 123 444', type: 'missed', time: 'Yesterday' },
  {id: '4', name: 'Khushi', number: '+91 749 2629 462', type: 'outgoing', time: '4:24PM'},
  // Add more mock data as needed
];

export default function Recents() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderItem = ({ item }: { item: typeof recentCalls[0] }) => {
    const getCallIcon = () => {
      switch (item.type) {
        case 'incoming':
          return <Ionicons name="call-received" size={20} color="#34C759" />;
        case 'outgoing':
          return <Ionicons name="call-made" size={20} color="#007AFF" />;
        case 'missed':
          return <Ionicons name="call-missed" size={20} color="#FF3B30" />;
        default:
          return null;
      }
    };

    return (
      <Pressable
        style={({ pressed }) => [
          styles.callItem,
          pressed && { opacity: 0.7 },
          isDark && styles.callItemDark,
        ]}>
        <View style={styles.callInfo}>
          {getCallIcon()}
          <View style={styles.callDetails}>
            <Text style={[styles.callName, isDark && styles.textLight]}>{item.name}</Text>
            <Text style={styles.callNumber}>{item.number}</Text>
          </View>
        </View>
        <Text style={styles.callTime}>{item.time}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textLight]}>Recents</Text>
      </View>
      <FlatList
        data={recentCalls}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#ffffff',
  },
  callItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  callItemDark: {
    backgroundColor: '#000000',
  },
  callInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callDetails: {
    marginLeft: 12,
  },
  callName: {
    fontSize: 17,
    fontWeight: '500',
  },
  callNumber: {
    fontSize: 15,
    color: '#8e8e93',
    marginTop: 2,
  },
  callTime: {
    fontSize: 15,
    color: '#8e8e93',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5ea',
    marginLeft: 16,
  },
  separatorDark: {
    backgroundColor: '#2c2c2e',
  },
});