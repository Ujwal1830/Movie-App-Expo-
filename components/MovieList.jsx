import { View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../theme';
import {useNavigation} from '@react-navigation/native'
import { fallbackMoviePoster, fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, image185, image342 } from '../api/moviesdb';
import { fetchAiringTodayTV } from '../api/tv';

const {width, height} = Dimensions.get('window');
export default function MovieList({path, title, data, hideSeeAll}) {

    let movieName = 'Ant-Man and the Wasp: Quantumania';
    const navigator = useNavigation();

    useEffect(() => {
    }, [data])
    
    
    const handleSeeAll=async(title)=>{

      // movies
      if (title.includes('Now Playing Movies')) {
          const dataa = await fetchNowPlayingMovies();
          navigator.navigate("MoviesPage", {
              title: title,
              result: dataa
          })
      }
      if (title.includes('Popular Movies')) {
          const dataa = await fetchPopularMovies();
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
        })
      }
      if (title.includes('Top Rated Movies')) {
          const dataa = await fetchTopRatedMovies();
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
        })
      }
      if (title.includes('Upcoming Movies')) {
          const dataa = await fetchUpcomingMovies();
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
        })
      }

      // tv series
      if (title.includes('Airing Today TV')) {
          const dataa = await fetchAiringTodayTV();
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
        })
      }
      if (title.includes('On The Air TV')) {
          const dataa = await fetchAiringTodayTV();
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
        })
      }
      if (title.includes('Top Rated TV')) {
          const dataa = await fetchAiringTodayTV();
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
        })
      }
      if (title.includes('Popular TV')) {
          const dataa = await fetchAiringTodayTV();
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
        })
      }
  }

  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl'>{title}</Text>
        { !hideSeeAll  &&
          <TouchableOpacity onPress={()=>handleSeeAll(`${title}`)}>
            <Text style={styles.text} className='text-base'>See all</Text>
          </TouchableOpacity>
        }
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {data.map((item, index)=>{
            return (
                <TouchableNativeFeedback
                    key={index}
                    onPress={()=>navigator.push(path, item)}
                >
                    <View className='space-y-1 mr-4'>
                        <Image style={{width:width*0.33, height:height*0.22, borderRadius: 10}} 
                          source={{uri: image185(item.poster_path) || fallbackMoviePoster }}
                        />
                        <Text className='text-neutral-300 ml-1'>{item.title?.length>14 ? item.title.slice(0, 14)+'...' : item.title}</Text>
                        <Text className='text-neutral-300 ml-1'>{item.name?.length>14 ? item.name.slice(0, 14)+'...' : item.name}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </ScrollView>
    </View>
  )
}