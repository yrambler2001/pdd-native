/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {QuestionsContext} from '../../App';
import {useContext} from 'react';
import {Text, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {View, TouchableOpacity} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const Btn = ({
  title,
  onPress,
  borderColor = 'black',
}: {
  title: string;
  onPress: () => void;
  borderColor?: string;
}) => (
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
const trimStr = (str: string): string => str.replace(/\s\s+/g, ' ');
export const Question = ({
  theme,
  number,
  next,
  prev,
  showAnswers,
  displayingQuestionIndex,
  totalDisplayingQuestions,
  clickedAnswer,
}: {
  theme: any;
  number: number | string;
  next: () => void;
  prev: () => void;
  showAnswers: boolean;
  displayingQuestionIndex: number;
  totalDisplayingQuestions: number;
  clickedAnswer: () => void;
}) => {
  const {questionsContext, images} = useContext(QuestionsContext);
  const themeObj = questionsContext?.[theme];
  const themeIndexes = Object.keys(themeObj);
  const currentIndex = themeIndexes.indexOf(number + '');
  const question = themeObj?.[number];

  const [[width, height], setViewHeight] = useState([0, 0]);
  // const [displayMargin, setDisplayMargin] = useState(true);
  // const heightRef = useRef(0);
  // console.log(question.label.length);
  // console.log(
  //   question.answers.reduce((prev, curr) => prev + curr.label.length, 0),
  // );
  const img = images[question.id];
  const displayMargin = !(
    img &&
    (question.answers.length >= 5 || question.label.length > 180)
  );
  const reduceLabelSize =
    img && question.answers.length >= 4 && question.label.length > 180;
  // useEffect(() => {
  //   number;
  //   setDisplayMargin(true);
  //   setTimeout(
  //     () =>
  //       console.log(heightRef.current, '1') ||
  //       setDisplayMargin(heightRef.current > 170),
  //     50,
  //   );
  // }, [number]);
  // console.log(height);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          flex: 0,
          fontSize: reduceLabelSize ? 18 : 24,
          fontWeight: '600',
          color: Colors.white,
        }}>
        {trimStr(question?.label)}
      </Text>
      <View
        onLayout={(event) => {
          const {width, height} = event.nativeEvent.layout;
          // heightRef.current = height;
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
            source={{uri: `data:image/jpeg;base64,${img}`}}
          />
        </ImageZoom>
      </View>
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
        {displayMargin && <View style={{minHeight: '10%'}} />}
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
