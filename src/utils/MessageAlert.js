/* eslint-disable */
/**
 *
 *
 */
import Toast from 'react-native-toast-message';
import { API } from '../api';
import { SUCCESS_CODE } from 'utils';

export default {
  /** Success */
  success: (m = 'success', time = 1200) => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: m,
      visibilityTime: time,
    });
  },

  /** Error */
  error: async (m = 'error', time = 1200) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: m,
      visibilityTime: time,
    });

    const userInput = await window.prompt('오류가 발생하였습니다.\n발생한 오류에 대해 알려주세요.', '');
    if (userInput !== null) {
      try {
        const body = {
          text: userInput,
          message: m,
        };
        const response = await API.sendBugReport(body);
        if (response.code === SUCCESS_CODE) {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: '오류 내용 전송에 성공하였습니다',
            visibilityTime: time,
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: error.message,
          visibilityTime: time,
        });
      }
    }
  },

  /** Warning */
  warning: (m = 'warning', time = 1200) => {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: m,
      visibilityTime: time,
    });
  },
};
