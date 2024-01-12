import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { image500 } from '../api/moviesdb';

const {width, height} = Dimensions.get('window');

export default function MovieCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
      <Image 
        className='rounded-2xl'
        style={{ width: width*0.6, height: height*0.4}}
        source={{uri: image500(item.poster_path)}}
      />
    </TouchableWithoutFeedback>
  )
}