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

const {width, height} = Dimensions.get('window');
const ios = Platform.OS ==  'ios'
const topMargin = ios? '' : 'mt-3'

export default function MovieScreen() {

    let movieName = 'Ant-Man and the Wasp: Quantumania';

    const {params: item} = useRoute();
    const [isFav, setIsFav] = useState(true);
    const navigator = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({})

    useEffect(()=>{
      setTimeout(() => {
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
      }, 1000);
    }, [item])

    const getMovieDetails=async(id)=>{
      const data = await fetchMovieDetails(id);
      if(data) setMovie(data);
      setLoading(false);
    }
    const getMovieCredits=async(id)=>{
      const data = await fetchMovieCredits(id);
      if(data && data.cast) setCast(data.cast);
      setLoading(false);
    }
    const getSimilarMovies = async id=>{
      const data = await fetchSimilarMovies(id);
      if(data && data.results) setSimilarMovies(data.results);
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
                source={{uri: image500(movie.poster_path) || fallbackMoviePoster}} />
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
            {movie.title}
        </Text>
        
        {
          movie?.id ? (
            <Text className='text-neutral-400 font-semibold text-base text-center'>
                {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime}
            </Text>
          ) : null
        }
      </View>

        {/* Genres */}
      <View className='flex-row justify-center mx-4 space-x-2'>
        {
          movie?.genres?.map((genre,index)=>{
              let showDot = index+1 != movie.genres.length;
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
            {movie?.overview}
        </Text>

        {/* cast */}
        {movie?.id && cast.length>0 && <Cast navigator={navigator} cast={cast} /> }

        {/* similar movies list */}
        {movie?.id && cast.length>0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />}
      </ScrollView>
    )
  )
}