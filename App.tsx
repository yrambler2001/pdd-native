/* eslint-disable react-native/no-inline-styles */

import React, {useState, createContext} from 'react';
import {SafeAreaView, View, StatusBar, ScrollView} from 'react-native';

import {Btn} from './Btn';
import {RandQ} from './RandQ';
import {sortBy} from 'lodash';
import ByTheme from './ByTheme';
const questionsContext = require('./all_no_img.json');
export const QuestionsContext = createContext(questionsContext);
declare const global: {HermesInternal: null | {}};
const images = require('./imagesCompressed.json');
const App = () => {
  const [outerPage, setOuterPage] = useState<
    'random' | 'themeList' | 'theme' | null
  >(null);
  const [currentTheme, setCurrentTheme] = useState('');
  // console.log(Object.keys(q));
  const themes = Object.keys(questionsContext);
  // console.log(JSON.stringify(themes));
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <QuestionsContext.Provider value={{questionsContext, images}}>
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
              </View>
            )}
            {outerPage === 'themeList' && (
              <View style={{flex: 1}}>
                <ByTheme theme={currentTheme} />
              </View>
            )}
            {outerPage === 'theme' && (
              <ScrollView>
                <View>
                  {sortBy(themes, (theme: string) =>
                    parseFloat(theme.split(' ')[0]),
                  ).map((t: string) => (
                    <Btn
                      key={t}
                      onPress={() => {
                        setCurrentTheme(t);
                        setOuterPage('themeList');
                      }}
                      title={t}
                    />
                  ))}
                </View>
              </ScrollView>
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
