import React from 'react';

import {QuestionsContext} from '../../App';
import {useContext} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, TouchableOpacity} from 'react-native';

export const Btn = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        backgroundColor: 'rgb(80,80,80)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
      }}>
      <Text style={{color: 'white'}}>{title}</Text>
    </View>
  </TouchableOpacity>
);
