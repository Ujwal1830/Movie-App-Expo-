import { View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme';
import {useNavigation} from '@react-navigation/native'
import { fallbackMoviePoster, image185, image342 } from '../api/moviesdb';

const {width, height} = Dimensions.get('window');
export default function MovieList({title, data, hideSeeAll}) {

    let movieName = 'Ant-Man and the Wasp: Quantumania';
    const navigator = useNavigation()

  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white'>{title}</Text>
        { !hideSeeAll &&<TouchableOpacity>
            <Text style={styles.text} className='text-lg'>see all</Text>
        </TouchableOpacity>}
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
                    onPress={()=>navigator.push('Movie', item)}
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