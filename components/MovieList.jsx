import { View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../theme';
import {useNavigation} from '@react-navigation/native'
import { fallbackMoviePoster, fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, image185, image342 } from '../api/moviesdb';

const {width, height} = Dimensions.get('window');
export default function MovieList({title, data, hideSeeAll}) {

    let movieName = 'Ant-Man and the Wasp: Quantumania';
    const navigator = useNavigation();

    useEffect(() => {
      console.log(data);
    }, [data])
    
    
    const handleSeeAll=async(title)=>{
      console.log(title);
      if (title.includes('Now Playing')) {
          const dataa = await fetchNowPlayingMovies();
          console.log({title: title,result: data});
          navigator.navigate("MoviesPage", {
              title: title,
              result: dataa
          })

      }
      if (title.includes('Popular')) {
          const dataa = await fetchPopularMovies();
          console.log({title: title,result: data});
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
      })
      }
      if (title.includes('Top Rated')) {
          const dataa = await fetchTopRatedMovies();
          console.log({title: title,result: data});
          navigator.navigate("MoviesPage", {
          title: title,
          result: dataa
      })
      }
      if (title.includes('Upcoming')) {
          const dataa = await fetchUpcomingMovies();
          console.log({title: title,result: data});
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
                    onPress={()=>navigator.push('TV', item)}
                >
                    <View className='space-y-1 mr-4'>
                        <Image style={{width:width*0.33, height:height*0.22, borderRadius: 10}} 
                          source={{uri: image185(item.poster_path) || fallbackMoviePoster }}
                        />
                        <Text className='text-neutral-300 ml-1'>{item.title?.length>14 ? item.title.slice(0, 14)+'...' : item.title}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        })}
      </ScrollView>
    </View>
  )
}