import React, { useState, useEffect } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import stylesT from "../Styles/Search";
import { Loading1 } from "../Views";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";


const Search = () => {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const navigation = useNavigation();
  const [filter, setFilter] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);
  const { theme } = useSelector(state => state.theme);
  const styles = stylesT(theme);


  useEffect(() => {
    fetch(`https://firebasestorage.googleapis.com/v0/b/musichub2.appspot.com/o/MusicHub%2FAllJsonFile%2FbollywoodMusic.json?alt=media&token=416bb829-797e-40c9-bcfb-e7908482ecfb`).then(data => data.json()).then(data => setSongs(data));
  }, []);


  useEffect(() => {
    if (search === "") {
      setFilter([]);
    } else {
      setLoadSearch(true);
      setTimeout(() => {
        let foundAr = [];
        songs.forEach(element => {
          if (element.songName.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            return;
          } else {
            foundAr.push(element);
          }
        });
        setLoadSearch(false);
        setFilter(foundAr);
      },2000)
    }
  }, [search]);

  const updateSearch = (search) => {
    try {
      setSearch(pre=>search);
    } catch (err) {
      console.log(err);
    }
  };

  const sendTo = (item) => {
    navigation.navigate("onlinesinglesongplayer", { songDetail: item })
  }

  const empty = () => {
    setFilter([]);
    setSearch("");
  }

  // console.log(songs[0]);


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

  const Header = () => {
    return (
      <>
        <View style={styles.v1}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            onClear={empty}
          />
        </View>


        {filter.length !== 0 &&
          <View style={styles.srv1}>
            <Text style={styles.foundFor}>Found result for : {search}</Text>
            { loadSearch && <Loading1 />}
            {filter.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={()=>sendTo(item)}>
                  <View style={styles.searchedItem}>
                    <View style={styles.sV1}>
                      <Image style={styles.searchImage} source={{ uri: item.posterUrl }} />
                    </View>
                    <View style={styles.sV2}>
                      <Text style={styles.st1}>{item.songName}</Text>
                      <Text style={styles.st2}>{item.artists}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        }

        {/* ----------------------------------------------------------- */}
        <View style={styles.v2}>
          <Text style={styles.t1}>Trending songs</Text>
        </View>
        {songs.length === 0 && <Loading1 text={"Loading trending songs..."} />}
      </>
    );
  }

  const Main = ({ item}) => {
    return (
      <>
        <SongsTrend item={item} />
      </>
    );
  }

  const Footer = () => {
    return (
      <></>
    );
  }

  return (
    <SafeAreaView style={styles.v0}>
          <FlatList
            data={songs}
            renderItem={(item) => <Main item={item} />}
            keyExtractor={(item, key) => item.id.toString()}
            ListHeaderComponent={<Header/>}
            ListFooterComponent={<></>}
          />
    </SafeAreaView>
  );
};
export default Search;