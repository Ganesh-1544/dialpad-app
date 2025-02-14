import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
          borderTopColor: isDark ? '#2c2c2e' : '#e5e5ea',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDark ? '#8e8e93' : '#8e8e93',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Keypad',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="keypad" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recents"
        options={{
          title: 'Recents',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}