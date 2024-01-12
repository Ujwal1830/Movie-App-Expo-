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
import { fetchAiringTodayTV, fetchOnTheAirTV, fetchPopularTV, fetchTopRatedTV } from '../api/tv'


const ios = Platform.OS == 'ios';

export default function HomeScreen() {

    // movie states
    const [trending, setTrending] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, SetUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

    // tv series states
    const [airingTV, setAiringTV] = useState([]);
    const [onTheAirTV, setOnTheAirTV] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [popularTV, setPopularTV] = useState([]);


    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getTrendingMovies();
            getNowPlayingMovies();
            getUpcomingMovies();
            getTopRatedMovies();
            getPopularMovies();

            getAiringTV();
            getOnTheAirTV();
            getTopRatedTV();
            getPopularTV();
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
            setNowPlayingMovies(data.results);
        setLoading(false);
    }
    const getUpcomingMovies=async()=>{
        const data = await fetchUpcomingMovies(1);
        if(data && data.results )
            SetUpcomingMovies(data.results);
        setLoading(false);
    }
    const getTopRatedMovies=async()=>{
        const data = await fetchTopRatedMovies(1);
        if(data && data.results )
            setTopRatedMovies(data.results);
        setLoading(false);
    }
    const getPopularMovies=async()=>{
        const data = await fetchPopularMovies(1);
        if(data && data.results )
            setPopularMovies(data.results);
        setLoading(false);
    }

    const getAiringTV=async()=>{
        const data = await fetchAiringTodayTV(1);
        if( data && data.results )
            setAiringTV(data.results);
        setLoading(false);
    }
    const getOnTheAirTV=async()=>{
        const data = await fetchOnTheAirTV(1);
        if( data && data.results )
            setOnTheAirTV(data.results);
        setLoading(false);
    }
    const getTopRatedTV=async()=>{
        const data = await fetchTopRatedTV();
        if( data && data.results )
            setTopRatedTV(data.results);
        setLoading(false);
    }
    const getPopularTV=async()=>{
        const data = await fetchPopularTV();
        if( data && data.results )
            setPopularTV(data.results);
        setLoading(false);
    }

  return (
    
    <SafeAreaView className='flex-1 bg-black'>
        <SafeAreaView className={ios?'-mb-2':'mb-3'}>
            <StatusBar style='light' />
            <View className='flex-row justify-between items-center mx-4'>
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Bars3CenterLeftIcon size={'30'} strokeWidth={2} color={'white'}/>
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
                {/*  movies  */}
                {upcomingMovies.length > 0 && <MovieList path="Movie" title="Upcoming Movies" data={upcomingMovies} />}
                {nowPlayingMovies.length > 0 && <MovieList path="Movie" title="Now Playing Movies" data={nowPlayingMovies} />}
                {topRatedMovies.length > 0 && <MovieList path="Movie" title="Top Rated Movies" data={topRatedMovies} />}
                {popularMovies.length > 0 && <MovieList path="Movie" title="Popular Movies" data={popularMovies} />}

                {/*  tv  */}
                {airingTV.length > 0 && <MovieList path="TV" title="Airing Today TV" data={airingTV} />}
                {onTheAirTV.length > 0 && <MovieList path="TV" title="On The Air TV" data={onTheAirTV} />}
                {topRatedTV.length > 0 && <MovieList path="TV" title="Top Rated TV" data={topRatedTV} />}
                {popularTV.length > 0 && <MovieList path="TV" title="Popular TV" data={popularTV} />}
            </ScrollView>
            )
        }
    </SafeAreaView>
    
  )
}