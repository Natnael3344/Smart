import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';

const Card = ({ thumbnail, title, description,onPress, }) => {
  
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={3} style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  readMore: {
    color: 'blue',
    marginTop: 5,
  },
});

export default Card;
