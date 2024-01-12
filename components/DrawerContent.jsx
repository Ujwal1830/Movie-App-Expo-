import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchDynamicGenres, fetchGenres, fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../api/moviesdb';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';

export default function DrawerContent() {

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const navigator = useNavigation();

    useEffect(() => {
        getAllGenres()
    }, [])
    

    const getAllGenres=async()=>{
        const data = await fetchGenres();
        if(data && data.genres)
            setGenres(data.genres);
    }

    const handleGenreChange = async(item) => {
        const data = await fetchDynamicGenres(item.value);
        navigator.navigate("MoviesPage", {
            title: item.label,
            result: data
        });
        setValue(null);

        navigator.dangerouslyGetParent().closeDrawer();
    };

    const handleMoviesPage=async(title)=>{

        const data = null ;
        if (title.includes('Now Playing')) data = await fetchNowPlayingMovies();
        if (title.includes('Popular')) data = await fetchPopularMovies();
        if (title.incluse('Top Rated')) data = await fetchTopRatedMovies();
        if (title.includes('Upcoming')) data = await fetchUpcomingMovies();
        navigator.navigate("MoviesPage", {
            title: title,
            result: data
        })
        setValue(null);
        navigator.dangerouslyGetParent().closeDrawer();
    }

  return (
    <View className="px-3 mt-6 space-y-3">
        <TouchableOpacity onPress={()=>navigator.navigate("Home")}>
            <View className="w-full h-[50px] bg-neutral-700 rounded-lg justify-center pb-1 pl-3">
                <Text className="text-white text-[18px] ">Home</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleMoviesPage("Now Playing Movies")}>
            <View className="w-full h-[50px] bg-neutral-700 rounded-lg justify-center pb-1 pl-3">
                <Text className="text-white text-[18px] ">Now Playing Movies</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleMoviesPage("Popular Movies")}>
            <View className="w-full h-[50px] bg-neutral-700 rounded-lg justify-center pb-1 pl-3">
                <Text className="text-white text-[18px] ">Popular Movies</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleMoviesPage("Top Rated Movies")}>
            <View className="w-full h-[50px] bg-neutral-700 rounded-lg justify-center pb-1 pl-3">
                <Text className="text-white text-[18px] ">Top Rated Movies</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleMoviesPage("Upcoming Movies")}>
            <View className="w-full h-[50px] bg-neutral-700 rounded-lg justify-center pb-1 pl-3">
                <Text className="text-white text-[18px] ">Upcoming Movies</Text>
            </View>
        </TouchableOpacity>
        <View>
            <Text className="pb-1 px-4 text-white font-bold text-xl">Genres</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={ genres.map((genre) => ({ label: genre.name, value: genre.id })) }
                placeholder="Genre"
                onSelectItem={(item) => {
                    handleGenreChange(item);
                }}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setGenres}

                style={{ backgroundColor: '#404040', borderColor: '#404040', }}
                textStyle={{ fontSize: 18, color: '#fff', }}
                dropDownContainerStyle={styles.dropDownStyle}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    dropDownStyle: {
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: '#404040',
    },
});