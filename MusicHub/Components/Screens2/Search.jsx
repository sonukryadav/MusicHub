import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from "../Styles/Search";
import { Loading1 } from "../Views";
import { useNavigation } from "@react-navigation/native";


const Search = () => {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [itemSearch, setItemSearch] = useState(false);
  const [itemSearchText, setItemSearchText] = useState("");
  const navigation = useNavigation();


  useEffect(() => {
    fetch(`https://firebasestorage.googleapis.com/v0/b/musichub2.appspot.com/o/MusicHub%2FAllJsonFile%2FbollywoodMusic.json?alt=media&token=416bb829-797e-40c9-bcfb-e7908482ecfb`).then(data => data.json()).then(data => setSongs(data));
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const sendTo = (item) => {
    navigation.navigate("onlinesinglesongplayer", { songDetail: item })
  }


  const SongsTrend = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => sendTo(item.item)}>
        <View style={styles.v3}>
          <View style={styles.v4}>
            <Image source={{ uri: item.item.posterUrl }} resizeMode="contain" style={styles.poster1} />
          </View>
          <View style={styles.v5}>
            <Text style={styles.t2}>{item.item.songName }</Text>
            <Text style={styles.t3}>{item.item.artists}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.v0}>
      <ScrollView>
        <View style={styles.v1}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
        </View>


        {/* <View style={styles.srV1}>
          <View style={styles.srV2}>
            <Text style={styles.srT1}>{ search ? "Search for : " + search : ""}</Text>
          </View>
          <View style={styles.srV3}>
            {itemSearch && search ?
              <Loading1 text={"searching..."} /> :
              <View>
                <Text style={styles.srT2}>{itemSearchText}</Text>
              </View>
            }
          </View>
        </View> */}


        <View style={styles.v2}>
          <Text style={styles.t1}>Trending</Text>
        </View>

        {songs.length === 0 ? <Loading1 text={"Loading trending songs..."} /> :
          <FlatList
            data={songs}
            renderItem={(item) => <SongsTrend item={item} />}
            keyExtractor={(item, key)=>item.id.toString()}
          />
        }



      </ScrollView>
    </SafeAreaView>
  );
};
export default Search;