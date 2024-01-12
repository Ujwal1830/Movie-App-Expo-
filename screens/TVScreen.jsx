import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviesdb';
import { fetchSimilarTV, fetchTVCredits, fetchTVDetails } from '../api/tv';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS ==  'ios'
const topMargin = ios? '' : 'mt-3'

export default function TVScreen() {

    let movieName = 'Ant-Man and the Wasp: Quantumania';

    const {params: item} = useRoute();
    const [isFav, setIsFav] = useState(true);
    const navigator = useNavigation();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tv, setTv] = useState({})
    const [similarTv, setSimilarTv] = useState([]);

    useEffect(()=>{
      setTimeout(() => {

        getTVDetails(item.id);
        getTVCredits(item.id);
        getSimilarTv(item.id);

        console.log(item);
      }, 1000);
    }, [item])


    const getTVDetails=async(id)=>{
      const data = await fetchTVDetails(id);
      if(data) setTv(data);
      setLoading(false);
    }
    const getTVCredits=async(id)=>{
      const data = await fetchTVCredits(id);
      if(data && data.cast) setCast(data.cast);
      setLoading(false);
    }
    const getSimilarTv=async(id)=>{
      const data = await fetchSimilarTV(id);
      if(data && data.results) setSimilarTv(data.results);
      setLoading(false);
    }

  return (
    loading ? (
      <View className="flex-1 bg-black">
        <Loading />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        className='flex-1 bg-black'
    >
      
      <View className='w-full'>
        <SafeAreaView className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}>
            <TouchableOpacity onPress={()=>navigator.goBack()} className='rounded-xl w-8 h-8 justify-center items-center'>
                <ChevronLeftIcon size={'30'} color={'white'} strokeWidth={'2.5'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsFav(!isFav)} className='rounded-xl w-8 h-8 justify-center items-center'>
                <HeartIcon size={'30'} color={isFav ? theme.background : 'white'} />
            </TouchableOpacity>
        </SafeAreaView>
        
            <View>
                <Image style={{width, height: height*0.7}} 
                source={{uri: image500(tv.poster_path) || fallbackMoviePoster}} />
                <LinearGradient 
                    colors={['transparent', 'rgba(8,8,8, 0.8)', 'rgba(8,8,8, 1)']}
                    style={{width, height: height*0.30}}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    className='absolute bottom-0'
                />
            </View>
      </View>

        {/* status, release year, runtime */}
      <View style={{marginTop: -(height*0.09)}} className='space-y-3'>
        <Text className='text-white text-center text-3xl font-bold tracking-wider'>
            {tv.name}
        </Text>
        
        {
          tv?.id ? (
            <Text className='text-neutral-400 font-semibold text-base text-center'>
                {tv?.status} • {tv?.first_air_date?.split('-')[0]} • {tv?.number_of_seasons}
            </Text>
          ) : null
        }
      </View>

        {/* Genres */}
      <View className='flex-row justify-center mx-4 space-x-2'>
        {
          tv?.genres?.map((genre,index)=>{
              let showDot = index+1 != tv.genres.length;
              return (
                  <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                      {genre?.name} {showDot? "•":null}
                  </Text>
              )
          })
        }
      </View>

        {/* description */}
        <Text className='text-neutral-400 mx-4 -tracking-widest'>
            {tv?.overview}
        </Text>

        {/* cast */}
        {tv?.id && cast.length > 0 && <Cast navigator={navigator} cast={cast} /> }

        {/* similar movies list */}
        {tv?.id && cast.length > 0 && <MovieList title={'Similar TV'} hideSeeAll={true} data={similarTv} />}
      </ScrollView>
    )
  )
}