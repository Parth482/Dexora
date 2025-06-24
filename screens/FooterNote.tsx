import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const FooterNote = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Data is provided as-is and may be inaccurate.{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://twitter.com/Kris1z0')}>
          DM @Kris1z0
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#111',
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  text: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  link: {
    color: '#4eaaff',
    textDecorationLine: 'underline',
  },
});

export default FooterNote;
