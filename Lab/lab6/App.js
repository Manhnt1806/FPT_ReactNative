import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

export default function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

  const fetchListImgLove = async () => {
    const fetch = require('node-fetch');
    const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4d15a4fae2msh7083c22e1a1302cp1d9e15jsn7b06a03a466f',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    try {
      const response = fetch(url, options);
      const result = response.json();
      const imageUrlList = result?.results?.map(
        (item) => item.primaryImage?.url
      );
      setData(imageUrlList);
      console.log(imageUrlList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListImgLove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.writeInfo}
        placeholder="Nhập Info"
        onChangeText={(data) => {
          setTitle(data);
        }}
        secureTextEntry={false}
        inputMode={"url"}
/>
      <StatusBar style="auto" />
      <FlatList
        style={styles.FlatList}
        data={data}
        numColumns={2}
        // keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.viewItem}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },

  writeInfo: {
    marginTop: 20,
    width: 300,
    height: 40,
    borderColor: "blue",
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 5,
  },

  viewButton: {
    width: 100,
    height: 40,
    margin: 10,
    borderWidth: 5,
    borderColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  contentButton: {
    color: "#FFFF",
    fontWeight: "bold",
  },
  image: {
    position: "relative",
    width: 192,
    height: 400,
    borderRadius: 5,
  },
  FlatList: {
    flex: 1,
  },
  viewItem: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    margin: 2,
  },
  textItem: {
    fontWeight: "900",
    position: "absolute",
    marginTop: 5,
    fontSize: 12,
    color: "#FFFFFF",
    bottom: 0,
    left: 0,
    marginBottom: 10,
    marginLeft: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});