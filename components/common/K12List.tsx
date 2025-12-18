import React, { useCallback, useState, useRef } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import { getMasterK12Lists } from "@/db/queries";
import { List } from "@/types";

export default function K12List() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const CIRCLE_SIZE = SCREEN_WIDTH / 6;
  const INNER_CIRCLE_SIZE = CIRCLE_SIZE * 0.75;

  const [masterList, setMasterList] = useState([]) as any[];

  const animatedValues = useRef<Animated.Value[]>([]).current;

  const groupBy = (list: List) => {
    const items = [];

    for (const item of list) {
      const rowIndex = item.group_id;

      if (!items[rowIndex]) items[rowIndex] = [];
      items[rowIndex].push(item);
    }

    return items;
  };

  const loadData = useCallback(async () => {
    try {
      const queryK12ListTitles = await getMasterK12Lists();

      if (queryK12ListTitles) {
        const masterListTitles: any[] = groupBy(queryK12ListTitles);
        setMasterList(masterListTitles);
      }
    } catch (error) {
      console.error("Error loading list:", error);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [loadData])
  );

  return (
    <View className="flex items-left p-2 rounded-xl bg-white w-full">
      <View className="flex-row justify-center">
        <Text className="flex mr-2 text-3xl font-semibold text-purple-700">
          K12
        </Text>
        <Text className="flex text-3xl font-semibold text-black">
          Lists
        </Text>
      </View>
      <View className="flex-row justify-center mb-3 p-3">
        <Text className="flex text-gray-500 font-semibold text-xl">
          Select a pre-populated list by grade.
        </Text>
      </View>
      {masterList.length ? (
        <View className="items-center">
          {masterList.map((list: List[], listIndex: number) => {
            return (
              <View
                key={listIndex}
                className="flex flex-row flex-wrap justify-center items-center"
              >
                {list.map((item, itemIndex) => {
                  const globalIndex =
                    masterList
                      .slice(0, listIndex)
                      .reduce((a, b) => a + b.length, 0) + itemIndex;

                  const animatedValue =
                    animatedValues[globalIndex] ||
                    new Animated.Value(1);

                  return (
                    <Animated.View
                      key={item.id}
                      style={{
                        opacity: animatedValue,
                        transform: [
                          {
                            scale: animatedValue.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.6, 1],
                            }),
                          },
                        ],
                        marginHorizontal: 8,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          router.push(`/lists/${item.id}/list`)
                        }
                      >
                        <View
                          style={{
                            borderWidth: CIRCLE_SIZE * 0.15,
                            borderColor: item.color,
                            width: CIRCLE_SIZE,
                            height: CIRCLE_SIZE,
                          }}
                          className="rounded-full justify-center items-center"
                        >
                          <View
                            style={{
                              width: INNER_CIRCLE_SIZE,
                              height: INNER_CIRCLE_SIZE,
                            }}
                            className="bg-white rounded-full justify-center items-center"
                          >
                            <Text
                              style={{
                                fontSize: INNER_CIRCLE_SIZE * 0.35,
                              }}
                              className="text-black text-xl font-semibold"
                            >
                              {item.acronym}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            );
          })}
        </View>
      ) : (
        <View className="flex-row px-2">
          <Text className="flex text-purple-600 text-lg">
            No lists available
          </Text>
        </View>
      )}
    </View>
  );
}
