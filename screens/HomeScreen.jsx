import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading'
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviesdb'
import 'react-native-gesture-handler';


const ios = Platform.OS == 'ios';

export default function HomeScreen() {

    const [trending, setTrending] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getTrendingMovies();
            getNowPlayingMovies();
            getUpcomingMovies();
            getTopRatedMovies();
            getPopularMovies();
        }, 1000);
    }, [])
    
    const getTrendingMovies=async()=>{
        const data = await fetchTrendingMovies(1);
        if( data && data.results )
        setTrending(data.results);
    setLoading(false);
    }
    const getNowPlayingMovies=async()=>{
        const data = await fetchNowPlayingMovies(1);
        if( data && data.results )
            setNowPlaying(data.results);
        setLoading(false);
    }
    const getUpcomingMovies=async()=>{
        const data = await fetchUpcomingMovies(1);
        if(data && data.results )
            setUpcoming(data.results);
        setLoading(false);
    }
    const getTopRatedMovies=async()=>{
        const data = await fetchTopRatedMovies(1);
        if(data && data.results )
            setTopRated(data.results);
        setLoading(false);
    }
    const getPopularMovies=async()=>{
        const data = await fetchPopularMovies(1);
        if(data && data.results )
            setPopular(data.results);
        setLoading(false);
    }

  return (
    
    <SafeAreaView className='flex-1 bg-black'>
        <SafeAreaView className={ios?'-mb-2':'mb-3'}>
            <StatusBar style='light' />
            <View className='flex-row justify-between items-center mx-4'>
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Bars3CenterLeftIcon size={'30'} strokeWidth={2} color={'white'}/>
                    
                    {/* <Drawer.Screen name="Article" component={Article} /> */}
                </TouchableOpacity>
                <Text className='text-white text-3xl font-bold'>
                    <Text style={styles.text}>M</Text>ovies
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size={'30'} strokeWidth={2} color={'white'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

        {
            loading ? (
                <Loading />
            ) : (
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >   
                { trending.length > 0 && <TrendingMovies data={trending} />}

                {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
                {nowPlaying.length > 0 && <MovieList title="Now Playing" data={nowPlaying} />}
                {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
                {popular.length > 0 && <MovieList title="Popular" data={popular} />}
            </ScrollView>
            )
        }
    </SafeAreaView>
    
  )
}