import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import { Fragment } from 'react';
const StepIndicator = ({ step, items, length }) => {
  var RandomNumber = Math.floor(Math.random() * 100) + 1;

  return (
    <View style={styles.container} key={'steps-' + RandomNumber}>
      <View style={styles.stepContainer}>
        {items?.map((item, index) => {
          return (
            <Fragment key={'test-' + index}>
              {index != 5 && (
                <View style={styles.stepWrapper}>
                  <View
                    style={{
                      padding: 6,
                      backgroundColor: '#03968c',
                      width: 45,
                      height: 45,
                      borderRadius: 45 / 2,
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={[
                        styles.step,
                        step === index && styles.activeStep,
                        step > index && styles.checkedStep,
                      ]}
                    >
                      <Text
                        style={[
                          styles.stepText,
                          step === index && styles.activeStepText,
                          step > index && styles.checkedText,
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.stepTitle,
                      step > index && styles.checkedText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              )}
              {index != 4 && index !== items.length - 1 && (
                <View
                  style={[styles.line, step >= index && styles.activeLine]}
                />
              )}
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  stepWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
  },
  stepTitle: {
    color: 'white',
    marginTop: 5,
    width: 100,
    alignSelf: 'baseline',
    fontSize:12
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  step: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#03968c',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  activeStep: {
    backgroundColor: 'black',
  },
  stepText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  activeStepText: {
    color: 'white',
  },
  checkedText: {
    color: '#03968c',
  },
  checkedStep: {
    backgroundColor: 'white',
  },
  line: {
    height: 12,
    backgroundColor: '#03968c',
    borderColor: '#03968c',
    flex: 1,
    justifyContent: 'center',
  },
  activeLine: {
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#2196f3',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default StepIndicator;
