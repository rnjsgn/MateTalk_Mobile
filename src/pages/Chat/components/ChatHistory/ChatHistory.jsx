import React, { useMemo } from "react";
import { Image, Text, View } from "react-native";

import { ChatHistoryStyle } from "./ChatHistoryStyle";
import { useAuthStore } from "../../../../store/authStore";

// 시간 포맷 함수
const formatTime = (iso) => {
  const date = new Date(iso);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours} : ${minutes}`;
};

export const ChatHistory = ({ chats = [], roomId }) => {
  const { user } = useAuthStore();

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      const t1 = new Date(a.chat_date).getTime();
      const t2 = new Date(b.chat_date).getTime();
      return t1 - t2;
    });
  }, [chats]);

  return (
    <View style={ChatHistoryStyle.container}>
      {sortedChats.map((data, idx) => {
        const isMine = data.user_id === user?.id;
        const time = formatTime(data.chat_date);

        return isMine ? (
          <View key={data.chat_id || idx} style={ChatHistoryStyle.MyMessageWrap}>
            <View style={ChatHistoryStyle.MyMessageBox}>
              <Text style={ChatHistoryStyle.MyMessage}>{data.chat_msg}</Text>
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
              <Text style={ChatHistoryStyle.otherMessage}>{data.chat_msg}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
