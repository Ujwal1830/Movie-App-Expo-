import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import MovieList from '../components/MovieList'
import Loading from '../components/Loading';
import {useRoute} from '@react-navigation/native'
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviesdb';


const {width, height} = Dimensions.get('window');
const ios = Platform.OS =='ios'
const verticalMargin = ios?'':'my-3'

export default function PersonScreen() {

    const {params: item} = useRoute();
    const navigator = useNavigation();
    const [isFav, setIsFav] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [personTv, setPersonTv] = useState([]);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPersonDetails(item.id);
        getPersonMovies(item.id);
        getPersonTV(item.id);
    }, [item.id])
    
    const getPersonDetails=async(id)=>{
        const data = await fetchPersonDetails(id);
        if(data) setPerson(data);
        setLoading(false);
    }
    const getPersonMovies=async(id)=>{
        const data = await fetchPersonMovies(id);
        if(data && data.cast) setPersonMovies(data.cast);
        setLoading(false);
    }
    const getPersonTV=async(id)=>{
        const data = await fetchPersonMovies(id);
        if(data && data.cast) setPersonTv(data.cast);
        setLoading(false);
    }


  return (
    <ScrollView className='flex-1 bg-black' contentContainerStyle={{paddingBottom: 20}}>
        <SafeAreaView className={`z-20 w-full flex-row justify-between items-center px-4 ${verticalMargin}`}>
            <TouchableOpacity onPress={()=>navigator.goBack()}  className='rounded-xl w-8 h-8 justify-center items-center'>
                <ChevronLeftIcon size={'30'} color={'white'} strokeWidth={'2.5'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsFav(!isFav)} className='rounded-xl w-8 h-8 justify-center items-center'>
                <HeartIcon size={'30'} color={isFav ? 'red' : 'white'} />
            </TouchableOpacity>
        </SafeAreaView>

        {/* person details */}
        {
            loading ? (
                <Loading />
            ) : (
            <View>
                <View className='flex-row justify-center'
                    style={{ shadowColor: 'white',
                        shadowRadius: 40, shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 1,
                    }}
                >
                    <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-black'>
                        <Image source={{uri: image342(person?.profile_path) || fallbackPersonImage}} 
                            style={{height: height*0.43, width: width*0.74}}
                        />
                    </View>
                </View>
                <View className="mt-6">
                    <Text className="text-3xl text-white font-bold text-center">
                        {person?.name}
                    </Text>
                    <Text className="text-base text-neutral-500 text-center">
                        {person?.place_of_birth}
                    </Text>
                </View>
                <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                    <View className="border-r-2 border-r-neutral-200 px-2 items-center">
                        <Text className="text-white font-semibold">Gender</Text>
                        <Text className="text-neutral-300 text-sm">{person?.gender==1 ? 'Female' : 'Male'}</Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-200 px-2 items-center">
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-200 px-2 items-center">
                        <Text className="text-white font-semibold">Known for</Text>
                        <Text className="text-neutral-300 text-sm">{person.known_for_department}</Text>
                    </View>
                    <View className="px-2 items-center">
                        <Text className="text-white font-semibold">Popularity</Text>
                        <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)}</Text>
                    </View>
                </View>
                <View className="my-6 mx-4 space-y-2">
                    <Text className="text-white text-lg">Biography</Text>
                    <Text className="text-neutral-400 tracking-wide">
                        {person?.biography || 'N/A'}
                    </Text>
                </View>

                {/* movie list  for above celebrity */}
                {personMovies.length>0 && <MovieList path="Movie" title={"Movies"} hideSeeAll={true} data={personMovies} />}
                {/* {personTv.length>0 && <MovieList path="TV" title={"TV"} hideSeeAll={true} data={personTv} />} */}
            </View>
            )
        }

    </ScrollView>
  )
}