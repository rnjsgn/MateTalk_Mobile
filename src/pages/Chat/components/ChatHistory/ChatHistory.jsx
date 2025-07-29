import React, { useMemo, useRef, useEffect } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";

import { ChatHistoryStyle } from "./ChatHistoryStyle";
import { useAuthStore } from "../../../../store/authStore";

// 날짜와 시간 포맷 함수
const formatDateTime = (iso) => {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  
  // 오늘인지 어제인지 확인
  if (date.toDateString() === today.toDateString()) {
    return `오늘 ${hours}:${minutes}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `어제 ${hours}:${minutes}`;
  } else {
    return `${month}/${day} ${hours}:${minutes}`;
  }
};

// 파일 크기 포맷 함수
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const ChatHistory = ({ chats = [], roomId }) => {
  const { user } = useAuthStore();
  const scrollViewRef = useRef();

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      const t1 = new Date(a.chat_date).getTime();
      const t2 = new Date(b.chat_date).getTime();
      // 최신 메시지가 아래에 오도록 정렬 순서 변경
      return t1 - t2; // 오름차순 정렬 (과거 -> 최신)
    });
  }, [chats]);

  // 새 메시지가 추가되면 자동으로 맨 아래로 스크롤
  useEffect(() => {
    if (scrollViewRef.current && sortedChats.length > 0) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [sortedChats]);

  // 파일 메시지 렌더링
  const renderFileMessage = (data, isMine) => {
    const file = data.file;
    const fileSize = formatFileSize(file?.size || 0);
    
    return (
      <View style={isMine ? ChatHistoryStyle.MyFileBox : ChatHistoryStyle.otherFileBox}>
        <View style={ChatHistoryStyle.fileIconContainer}>
          <Text style={ChatHistoryStyle.fileIcon}>📎</Text>
        </View>
        <View style={ChatHistoryStyle.fileInfo}>
          <Text style={ChatHistoryStyle.fileName} numberOfLines={1}>
            {file?.name || '파일'}
          </Text>
          <Text style={ChatHistoryStyle.fileSize}>
            {fileSize}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={ChatHistoryStyle.scrollContainer}
      contentContainerStyle={ChatHistoryStyle.container}
      showsVerticalScrollIndicator={false}
    >
      {sortedChats.map((data, idx) => {
        const isMine = data.user_id === user?.id;
        const time = formatDateTime(data.chat_date);
        const isFileMessage = data.type === 'file';

        return isMine ? (
          <View key={data.chat_id || idx} style={ChatHistoryStyle.MyMessageWrap}>
            <View style={ChatHistoryStyle.MyMessageBox}>
              {isFileMessage ? (
                renderFileMessage(data, true)
              ) : (
                <Text style={ChatHistoryStyle.MyMessage}>{data.chat_msg}</Text>
              )}
            </View>
            <Text style={ChatHistoryStyle.MyTime}>{time}</Text>
          </View>
        ) : (
          <View key={data.chat_id || idx} style={ChatHistoryStyle.other}>
            <View style={ChatHistoryStyle.info}>
              <Image
                source={require("../../../../assets/images/User.png")}
                style={ChatHistoryStyle.profile}
              />
              <Text style={ChatHistoryStyle.userName}>{data.user_name || "익명"}</Text>
              <Text style={ChatHistoryStyle.userTime}>{time}</Text>
            </View>
            <View style={ChatHistoryStyle.otherMessageBox}>
              {isFileMessage ? (
                renderFileMessage(data, false)
              ) : (
                <Text style={ChatHistoryStyle.otherMessage}>{data.chat_msg}</Text>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};
