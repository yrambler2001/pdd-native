/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';

import {QuestionsContext} from '../../App';
import {useContext} from 'react';
import {Text, StyleSheet, Button, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, TouchableOpacity} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const Btn = ({title, onPress, borderColor = 'black'}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        borderColor,
        borderWidth: 3,
        flex: 0,
        backgroundColor: 'rgb(80,80,80)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 9,
        padding: 13,
        marginBottom: 15,
      }}>
      <Text style={{color: 'white'}}>{title}</Text>
    </View>
  </TouchableOpacity>
);
const trimStr = (str) => str.replace(/\s\s+/g, ' ');
export const Question = ({
  theme,
  number,
  next,
  prev,
  showAnswers,
  setClickedQuestion,
  displayingQuestionIndex,
  totalDisplayingQuestions,
  clickedAnswer,
}: {
  theme: any;
  number: number;
}) => {
  // console.log(theme, number);
  const {a: questionsContext, q} = useContext(QuestionsContext);
  const themeObj = questionsContext?.[theme];
  const themeIndexes = Object.keys(themeObj);
  const currentIndex = themeIndexes.indexOf(number + '');
  const question = themeObj?.[number];
  // console.log(showAnswers);
  // const a = `../../img/${question.id}.jpg`;
  // console.log(question);
  // const [img, setImg] = useState(defImg);
  // useEffect(() => {
  //   require(a).then(setImg);
  // }, [a, setImg]);

  const [[width, height], setViewHeight] = useState([0, 0]);
  console.log(width, height);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          flex: 0,
          fontSize: 24,
          fontWeight: '600',
          color: Colors.white,
        }}>
        {trimStr(question?.label)}
      </Text>
      {/* <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => console.log(1)}> */}
      <View
        onLayout={(event) => {
          const {width, height} = event.nativeEvent.layout;
          setViewHeight([width, height]);
        }}
        style={{
          flex: 1,
        }}>
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={width}
          imageHeight={height}>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              marginTop: 10,
              marginBottom: 10,
            }}
            source={{uri: `data:image/jpeg;base64,${q[question.id]}`}}
          />
        </ImageZoom>
      </View>
      {/* </TouchableOpacity> */}
      <View>
        {question?.answers?.map?.(
          (a: {label: string; correct: boolean | undefined}, index: number) => (
            <Btn
              borderColor={
                showAnswers ? (a.correct ? 'green' : 'red') : 'black'
              }
              key={index}
              title={trimStr(a.label)}
              onPress={() => {
                clickedAnswer();
              }}
            />
          ),
        )}
        <View style={{flexDirection: 'row'}}>
          <Btn title={'Prev'} onPress={prev} />
          <Text
            style={{
              marginBottom: 15,
              flex: 1,
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            {displayingQuestionIndex || currentIndex + 1} of{' '}
            {totalDisplayingQuestions || Object.keys(themeObj).length}
          </Text>
          <Btn title={'Next'} onPress={next} />
        </View>
      </View>
    </View>
  );
};
