import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './MovieCard';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function TrendingMovies({ data }) {

    const navigator = useNavigation()
    const handleClick=(item)=>{
        navigator.navigate("Movie", item);
    }

    console.log(data);

  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
      <Carousel 
        data={data}
        renderItem={({item, index})=><MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.62}
        sliderWidth={width}
        itemWidth={width*0.6}
        slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  )
}