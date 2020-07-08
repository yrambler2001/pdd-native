/* eslint-disable react-native/no-inline-styles */

import React, {useState, createContext} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';

import {Question} from './views/Question/Question';
import {Btn} from './Btn';
import {RandQ} from './RandQ';

const a = require('./all_no_img.json');
export const QuestionsContext = createContext(a);
declare const global: {HermesInternal: null | {}};
const q = require('./imagesCompressed.json');
const App = () => {
  const [outerPage, setOuterPage] = useState<'random' | 'theme' | null>(null);
  console.log(Object.keys(q));
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <QuestionsContext.Provider value={{a, q}}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
          <View
            style={{
              flex: 1,
              marginTop: '5%',
              marginBottom: '5%',
              marginLeft: '5%',
              marginRight: '5%',
            }}>
            <Btn
              title="Main"
              onPress={() => {
                setOuterPage(null);
              }}
            />
            {outerPage === 'random' && (
              <View style={{flex: 1}}>
                <RandQ />
                <View style={{flex: 0.1, backgroundColor: 'black'}} />
              </View>
            )}
            {!outerPage && (
              <View>
                <Btn
                  onPress={() => {
                    setOuterPage('random');
                  }}
                  title={'Випадкові питання'}
                />
                <Btn
                  onPress={() => {
                    setOuterPage('theme');
                  }}
                  title={'По темах'}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </QuestionsContext.Provider>
    </>
  );
};

export default App;
