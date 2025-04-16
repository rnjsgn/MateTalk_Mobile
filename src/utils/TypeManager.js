// 기존 코드
// import { AudioOutlined, FormOutlined, FundOutlined } from '@ant-design/icons';

// 변경 후 코드
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// ENUM('BEFORE_BROADCAST', 'ON_AIR', 'READYE_TO_BROADCAST', 'END')
const stateType = [
  {
    type: 'BEFORE_BROADCAST',
    value: '방송전',
    color: '',
    backgroundColor: '',
    icon: '',
  },
  {
    type: 'ON_AIR',
    value: '방송중',
    color: '',
    backgroundColor: '',
    icon: '',
  },
  {
    type: 'READYE_TO_BROADCAST',
    value: '방송준비전',
    color: '',
    backgroundColor: '',
    icon: '',
  },
  {
    type: 'END',
    value: '방송 종료',
    color: '',
    backgroundColor: '',
    icon: '',
  },
];
// ENUM('class', 'conference', 'interview')
const conferenceType = [
  {
    type: 'class',
    value: '강의',
    color: '',
    backgroundColor: '',
    icon: <FontAwesome5 name="chalkboard-teacher" size={20} color="#000" />,
  },
  {
    type: 'conference',
    value: '회의',
    color: '',
    backgroundColor: '',
    icon: <FontAwesome5 name="users" size={20} color="#000" />,
  },
  {
    type: 'interview',
    value: '인터뷰',
    color: '',
    backgroundColor: '',
    icon: <FontAwesome5 name="microphone" size={20} color="#000" />,
  },
];


const TypeManager = {
  stateList: () => conferenceType,
  getStateType: (type) => {
    const idx = stateType.findIndex((item) => {
      return item.type === type;
    });
    return stateType[idx];
  },
  getConferenceType: (type) => {
    const idx = conferenceType.findIndex((item) => {
      return item.type === type;
    });
    return conferenceType[idx];
  },
};

export default TypeManager;
