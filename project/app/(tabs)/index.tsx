import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

const DialButton = ({ 
  number, 
  letters = '', 
  onPress,
  isDark 
}: { 
  number: string; 
  letters?: string; 
  onPress: (num: string) => void;
  isDark: boolean;
}) => (
  <Pressable
    onPress={() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress(number);
    }}
    style={({ pressed }) => [
      styles.dialButton,
      pressed && { opacity: 0.7 },
    ]}>
    <Text style={[styles.dialButtonNumber, isDark && styles.textLight]}>{number}</Text>
    {letters && <Text style={[styles.dialButtonLetters, isDark && styles.textLight]}>{letters}</Text>}
    }
  </Pressable>
);

export default function DialPad() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleNumberPress = (num: string) => {
    setPhoneNumber(prev => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleCall = () => {
    if (!phoneNumber) return;
    // In a real app, we would initiate the call here
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.numberDisplay}>
        <Text style={[styles.phoneNumber, isDark && styles.textLight]}>
          {phoneNumber || 'Enter a number'}
        </Text>
      </View>

      <View style={styles.dialPad}>
        <View style={styles.row}>
          <DialButton number="1" letters="" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="2" letters="ABC" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="3" letters="DEF" onPress={handleNumberPress} isDark={isDark} />
        </View>
        <View style={styles.row}>
          <DialButton number="4" letters="GHI" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="5" letters="JKL" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="6" letters="MNO" onPress={handleNumberPress} isDark={isDark} />
        </View>
        <View style={styles.row}>
          <DialButton number="7" letters="PQRS" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="8" letters="TUV" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="9" letters="WXYZ" onPress={handleNumberPress} isDark={isDark} />
        </View>
        <View style={styles.row}>
          <DialButton number="*" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="0" letters="+" onPress={handleNumberPress} isDark={isDark} />
          <DialButton number="#" onPress={handleNumberPress} isDark={isDark} />
        </View>
      </View>

      <View style={styles.actions}>
        {phoneNumber ? (
          <>
            <Pressable onPress={handleDelete} style={styles.deleteButton}>
              <Ionicons name="backspace" size={24} color={isDark ? '#ffffff' : '#000000'} />
            </Pressable>
            <Pressable onPress={handleCall} style={styles.callButton}>
              <Ionicons name="call" size={32} color="#ffffff" />
            </Pressable>
          </>
        ) : (
          <Pressable onPress={handleCall} style={[styles.callButton, { opacity: 0.5 }]}>
            <Ionicons name="call" size={32} color="#ffffff" />
          </Pressable>
        )}
      </View>
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
  numberDisplay: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  phoneNumber: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 2,
  },
  textLight: {
    color: '#ffffff',
  },
  dialPad: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dialButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialButtonNumber: {
    fontSize: 32,
    fontWeight: '400',
  },
  dialButtonLetters: {
    fontSize: 10,
    fontWeight: '400',
    marginTop: 3,
    color: '#8e8e93',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deleteButton: {
    position: 'absolute',
    left: 30,
    padding: 10,
  },
  callButton: {
    backgroundColor: '#34C759',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});